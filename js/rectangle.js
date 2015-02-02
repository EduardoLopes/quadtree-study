(function(global, undefined){

  'use strict';

  var Rectangle = Class.create(Point, {
    initialize: function( $super, x, y, width, height ){
      $super(x, y);
      this.width = width;
      this.height = height;
    }
  });

  global.Rectangle = Rectangle;

})(this);