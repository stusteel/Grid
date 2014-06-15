"use strict";

define([
  "namespace",//,

  // Libs
  //"use!backbone"

  // Modules
  "modules/cell"
  // Plugins
],

function(ns,Cell) {

  // Create a new module
  var TXT = {};
  TXT.events={
    "keyup textarea" : "updateTextContent",
    "click .textSubmit" : "saveTextContent",
    "click .cellcontents" : "editTextContent"
  };

  TXT.handlers={
    updateTextContent: function() {
      var text=this.$el.find("textarea").val();
      this.model.set({content: text});
      var div=this.$el.find(".freetext>div").html("<span>"+text+"</span>");
      var span=this.$el.find(".freetext>div span");
      var proportion=span.width()/div.width();
      console.log(proportion);
      var size=13;
      if (proportion < 0.25) {
          size=20;
      } else if (proportion < 0.5) {
          size=16;
      } else {
          size=13;
      }
      if (span.height()/div.height() >0.85) {
          
          size=10;
      }
      div.css("fontSize",size+"px");
      //this.model.set({fontsize: size});
    },
    saveTextContent: function(e) {
      e.stopPropagation();
      console.log("save text");
      this.$el.find(".controltab").hide();
      this.model.save();
      
    },
    editTextContent: function() {
      this.$el.find(".controltab").show();
      this.$el.find("textarea").focus();
    }
  };
  

  return TXT;

});
