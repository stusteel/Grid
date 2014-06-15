"use strict";

define([
  "namespace"//,

  // Libs
  //"use!backbone"

  // Modules

  // Plugins
],

function(ns) {

  // Create a new module
  var Page2 = ns.module();

  var Controller = ns.Controller.extend({
        crazy: function() {

            var view = new Page2.Views.Page();
            ns.app.main.show(view);

        },
        crazy2: function() {
          alert("!");
        }
  });

  Page2.controller = new Controller();

  var Router = ns.Router.extend({
      appRoutes: {
            "crazy": "crazy",
            "crazy/stage2": "crazy2"
        },
        
        controller: Page2.controller
  });

  var router = new Router();

  // This will fetch the tutorial template and render it.
  Page2.Views.Page = ns.ItemView.extend({
    template: "crazy",

    events: {
        'click #page1' : 'ui_page1',
        'click #stage2' : 'ui_stage2'
    },

    ui_page1: function(e) {
      e.preventDefault();

      Page2.controller.navigate('page1');
    },

    ui_stage2: function(e) {
      e.preventDefault();

      Page2.controller.navigate('crazy/stage2');
    }

  });

  // Required, return the module for AMD compliance
  return Page2;

});