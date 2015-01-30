(function(global, undefined){

  'use strict';

  var Rectangle = Point.extend(function(){

    this.width = null;
    this.height = null;

    this.constructor = function( x, y, width, height ){
      this.super( x, y );
      this.set('width', width);
      this.set('height', height);
    };

  });

  global.Rectangle = Rectangle;

})(this);