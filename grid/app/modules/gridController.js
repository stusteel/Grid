"use strict";

define([
  "namespace",//,

  // Libs
  "backbone",
  "jquery",

  // Modules
  "modules/grid",
  // Plugins
],

function(ns,Backbone,$,Grid) {

  // Create a new module
  var GridController = ns.module();

  // GridController extendings
  // Grids Collection
   


  // GridController.Router = Backbone.Router.extend({ /* ... */ });


  // Controller view
  GridController.Views.Controller = ns.ItemView.extend({
    template: "#gridController",
    className: "gridController",
    initialize: function () {
        _.bindAll(this);
        this.collection.on('change', this.render);
        this.collection.on('new', this.render);
    },
    events: {
        'click #newGrid' : 'add_grid',
        'click .delete' : 'delete_grid',
        'click li' : 'load_grid'
    },
    add_grid: function(e) {
      e.preventDefault();
      var title=$("#gridTitle").val();
      var newgrid = new  Grid.model({"title" : title});
      ns.app.grids.create(newgrid);
      this.render();
    },
    delete_grid: function(e) {
      e.preventDefault();
      var _id=$(e.currentTarget).parent().attr("id");
      var grid=ns.app.grids.get(_id);
      //ns.app.grids.remove(grid);
      grid.destroy();
      this.render();
    },
    load_grid: function(e) {
      if (e.target.nodeName!="SPAN") {
          var newGrid = ns.app.grids.get(e.target.id);
          if (newGrid) {
            ns.app.loadGrid(newGrid);
          }
      }
      
    }
  });




  

  // Required, return the module for AMD compliance
  return GridController;

});
