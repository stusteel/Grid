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
  var Grid = ns.module();

  // Grid extendings
  Grid.model = Backbone.Model.extend({
      defaults: {
        title: "New grid"
      },
      idAttribute: "_id"
   });


  Grid.Collection = Backbone.Collection.extend({
    model: Grid.model,
    url: "/grids"
  });


  Grid.Views.Icon = ns.ItemView.extend({
    template: "#gridIcon",
    tagName: "li"
  });

  Grid.Views.Grid = ns.CompositeView.extend({
    template: "#grid",
    id: "GridList",
    itemView: Cell.Views.Cell,
    itemViewContainer: "#cells",
    events: {
        'mousedown .grid': 'CreateNewCell',
        'mouseup .gridframe': 'ScaleNewCell'
    },
    CreateNewCell: function (ev) {
          console.debug("create new cell");
          var gridUnit,
              gridOffset,
              X,
              Y,
              cells,
              cell;
          //console.log(ns.app.grid);
            gridUnit=ns.app.gridUnit;
            gridOffset=$(this.el).find(".gridframe").offset();
            X=Math.floor( (ev.pageX-gridOffset.left)/gridUnit );
            Y=Math.floor( (ev.pageY-gridOffset.top)/gridUnit );
            ns.app.mousedown.x=X*gridUnit;
            ns.app.mousedown.y=Y*gridUnit;
          //console.debug(this.mousedown.x);
            //console.debug(X+" :"+Y);
            //var that=this;
            cells = ns.app.cells;
            cell = new Cell.model({x: X, y: Y, gid: ns.app.grid.id });
            ns.app.lastCell=cell; //store reference to last cell created
            cells.create(cell);
            
             //console.debug(cells);

             this.render();
             ns.app.mousedown.cell=document.getElementById(cell.cid);
             //console.log("ns.app.mousedown.cell");
             //console.log(cell);
             //console.log(ns.app.mousedown.cell);
              //ev.pageX - el
              this.$el.on("mousemove",this.DragNewCell(cell,gridOffset));
        },
        DragNewCell: function (cell,offset) {
          return function(ev){
            //var view=ns.app.mainRegion.currentView.children.c0;
            var gridUnit,
              diffX,
              diffY,
              dimX,
              dimY,
              unitX,
              unitY,
              shadow;
            gridUnit=ns.app.gridUnit;
            if ( $(ev.target).hasClass("cell") ) {
              ns.app.mousedown.cell=ev.target;
            }
            shadow = $(ns.app.mousedown.cell).find(".cellShadow");
            console.log(shadow);
            diffX=(ev.pageX-offset.left)-ns.app.mousedown.x;
            diffY=(ev.pageY-offset.top)-ns.app.mousedown.y;
            dimX=diffX+2;
            dimY=diffY+2;
            unitX=diffX/gridUnit;
            unitY=diffY/gridUnit;
            if (dimX >= (ns.app.gridUnit*0.5) && dimY >= (gridUnit*0.5) ) {
              ns.app.mousedown.cell.style.width=dimX+"px";
              ns.app.mousedown.cell.style.height=dimY+"px";
              shadow.css({width: (Math.ceil(unitX))*gridUnit, height: Math.ceil(unitY)*gridUnit});
            }
            $(ns.app.mousedown.cell).toggleClass("w2h2", (unitX>1 && unitY>1) );
            $(ns.app.mousedown.cell).toggleClass("w3h2", (unitX>2 && unitY>1) );
            $(ns.app.mousedown.cell).toggleClass("w3h3", (unitX>2 && unitY>2) );
            $(ns.app.mousedown.cell).toggleClass("w1h2", (unitY>1) );
          };
          
        },
        ScaleNewCell: function (ev) {
          var gridOffset,
              gridUnit,
              W,
              H,
              Wpx,
              Hpx;
          //console.log(this);
          
          this.$el.off('mousemove');
          if (ns.app.mousedown.cell) {
            //console.warn("ScaleNewCell");
            gridOffset=$(this.el).find(".gridframe").offset();
            this.$el.off('mousemove');
            gridUnit=ns.app.gridUnit;
            W=Math.ceil( (ev.pageX-gridOffset.left)/gridUnit )-ns.app.lastCell.get("x");
            H=Math.ceil( (ev.pageY-gridOffset.top)/gridUnit )-ns.app.lastCell.get("y");
            console.log("Scaled units = "+W+","+H);
            Wpx=W*gridUnit-1;
            Hpx=H*gridUnit-1;
            console.log("dimension units = "+Wpx+","+Hpx);
            //console.log(ns.app.lastCell);
            //console.log( ns.app.mousedown.cell);
            ns.app.lastCell.save({width: W, height: H, pixWidth: Wpx, pixHeight: Hpx});
            ns.app.mousedown.cell.style.width=Wpx+"px";
            ns.app.mousedown.cell.style.height=Hpx+"px";
            ns.app.lastCell=false;
            ns.app.mousedown.cell=false;
          }

        }
  });

  ns.app.vent.on("add:grid", function(){
    console.log("add:grid runs");
  });

  // Required, return the module for AMD compliance
  return Grid;

});
