(function(global, undefined){

  'use strict';

  var AABB = Rectangle.extend(function(){

    this.constructor = function( x, y, width, height ){
      this.super( x, y, width, height );
    };

    this.intersectsAABB = function( other ){
      if(this.x < other.x + other.width && this.y < other.y + other.height
        && this.x + this.width > other.x && this.y + this.height > other.y){
        return true;
      }
      return false;
    }

  });

  global.AABB = AABB;

})(window);