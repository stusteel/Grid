"use strict";

require([
  "namespace",

  // Libs
  "jquery",
  "backbone",

  // Modules
  "modules/desktop",
  "modules/gridController",
  "modules/grid",
  "modules/cell"
],

function(ns, $, Backbone, Desktop, GridController, Grid, Cell) {  //loading modules in after backbone

/*
Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
      return Handlebars.compile(rawTemplate);
  };
*/





  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function(hash) {
      console.log("Start index");
      var route = this;
//Grids collection 
       app.grids = new Grid.Collection();
//cells collection
       app.cells = new Cell.Collection();
       var gridController = new GridController.Views.Controller({
         collection: app.grids
       });
       app.grids.fetch({success: function(resp){
          console.log("grids successfully fetched");
          app.footer.show(gridController);
          if (app.grids.length>0) {
            app.createGrid( app.grids.at(0) );
          }
       }});
      
    }

    
  });

  // Shorthand the application namespace
  var app = ns.app;

  app.addRegions({
      main: '#main',
      footer: '#footer'
  });

  app.addInitializer(function(options) {
    //configure options
    _.each(options,function(v,k,l){
      app[k]=v;
    });

    // we just have to override eventNameAttr:
    Backbone.CQRS.hub.init({
        eventNameAttr: 'event',
        parseEvent: function(msg) {
            //msg.payload.revision = msg.head.revision;
            return msg;
        },
        getCommandId: function(data) {
            return data.commandId;
        }
    });
  });

  app.addInitializer(function(options) {
      // will instanciate all registered routers
      // app.appRouter = new calix.routers.AppRouter();
      app.router = new Router();

      // start backbone
      Backbone.history.start(/*{ pushState: true }*/);
  });

  app.createGrid = function( this_grid ) {
      console.log("creating grid");

      app.grid = this_grid;
      app.cells.fetch({data: {gid: app.grid.id},success: function(resp){
        var gridview = new Grid.Views.Grid({model: app.grid, collection: app.cells });
        app.main.show(gridview);
      }});
      //console.log(app.grid);
      //fetch cells
      
    };
    app.loadGrid = function( this_grid ) {
      console.log("loading grid");

      app.grid = this_grid;
      app.cells.fetch({data: {gid: app.grid.id},success: function(resp){
        //var gridview = new Grid.Views.Grid({model: app.grid, collection: app.cells });
        //app.main.show(gridview);
      }});
      //console.log(app.grid);
      //fetch cells
      
    };

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.start({ gridUnit: 75, mousedown: {} });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  // $(document).on("click", "a:not([data-bypass])", function(evt) {
  //   // Get the anchor href and protcol
  //   var href = $(this).attr("href");
  //   var protocol = this.protocol + "//";

  //   // Ensure the protocol is not part of URL, meaning its relative.
  //   if (href && href.slice(0, protocol.length) !== protocol &&
  //       href.indexOf("javascript:") !== 0) {
  //     // Stop the default event to ensure the link will not cause a page
  //     // refresh.
  //     evt.preventDefault();

  //     // `Backbone.history.navigate` is sufficient for all Routers and will
  //     // trigger the correct events.  The Router's internal `navigate` method
  //     // calls this anyways.
  //     Backbone.history.navigate(href, true);
  //   }
  // });

});
