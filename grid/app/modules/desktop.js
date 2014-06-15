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
  var Desktop = ns.module();


  Desktop.Views.Desktop = ns.Layout.extend({
    template: "desktop",
    regions: {
      gridFrame: ".gridframe"
    },
    model: null

  });

  // Required, return the module for AMD compliance
  return Desktop;

});
