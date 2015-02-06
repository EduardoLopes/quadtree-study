(function(global, undefined){

  'use strict';

  var Rectangle = Class.create(Point, {
    initialize: function( $super, x, y, width, height ){
      $super(x, y);
      this.width = width;
      this.height = height;
    },
    getCenterX: function(){
      return this.x + (this.width / 2);
    },
    getCenterY: function(){
      return this.y + (this.height / 2);
    },
    getHalfXDimention: function(){
      return this.width / 2;
    },
    getHalfYDimention: function(){
      return this.height / 2;
    }
  });

  global.Rectangle = Rectangle;

})(this);