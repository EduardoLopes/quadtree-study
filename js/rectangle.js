(function(global, undefined){

  'use strict';

  var Rectangle = Point.extend(function(){

    this.constructor = function( x, y, width, height ){
      this.super( x, y );
      this.setWidth( width );
      this.setHeight( height );
    };

    this.getWidth = function() {
      return this.width;
    };

    this.getHeight = function() {
      return this.height;
    };

    this.setWidth = function( width ) {
      this.width = width;
    };

    this.setHeight = function( height ){
      this.height = height;
    };

  });

  global.Rectangle = Rectangle;

})(window);