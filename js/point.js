(function(global, undefined){

  'use strict';

  var Point = Class.extend(function(){

    this.constructor = function( x, y ){
      this.setX(x);
      this.setY(y);
    };

    this.getX = function() {
      return this.x;
    };

    this.getY = function() {
      return this.y;
    };

    this.setX = function( x ) {
      this.x = x;
    };

    this.setY = function( y ){
      this.y = y;
    };

  });

  global.Point = Point;

})(window);