define([
  "namespace",

  // Libs
  //"use!backbone"

  // Modules
  "modules/cell-text"

  // Plugins
],

function(ns,TXT) {

  // Create a new module
  var Cell = ns.module();

  // Grid extendings
  Cell.model = Backbone.Model.extend({
      defaults: {
        title: "New cell",
        height: 1,
        width: 1,
        x: 0,
        y: 0,
        content: null
      },
      idAttribute: "_id",
    initialize: function() {
      var pixHeight=this.get("height")*(ns.app.gridUnit-1);
      var pixWidth=this.get("width")*(ns.app.gridUnit-1);
      var pixX=this.get("x")*ns.app.gridUnit;
      var pixY=this.get("y")*ns.app.gridUnit;
      this.set({
                "pixHeight": pixHeight,
                "pixWidth": pixWidth,
                "pixX": pixX,
                "pixY": pixY,
                "cid": this.cid
              });
    }
   });


  Cell.Collection = Backbone.Collection.extend({
    model: Cell.model,
    url: "/cells"
  });

  // Grid.Router = Backbone.Router.extend({ /* ... */ });

  Cell.Views.Cell = ns.ItemView.extend({
    template: "#cell",
    events: {
        'click .close': 'DeleteCell',
        'click .contentType': 'ConfigureCellType'
    },
    initialize: function(){
      if (this.model.attributes.type) {
          this.template="#cell_"+this.model.attributes.type;
          //updating events
          if (this.model.attributes.type == "TXT") {
            _.extend(this.events, TXT.events);
            _.extend(this, TXT.handlers);
          }
      }
    },
    DeleteCell: function(emptycell) {

      this.model.destroy();
    },
    ConfigureCellType: function(e) {
      this.model.save({type: $(e.target).attr("attr-type" ) });
      this.initialize();
      this.render();
    }
  });


  // Required, return the module for AMD compliance
  return Cell;

});
