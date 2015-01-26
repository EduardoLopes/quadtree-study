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
      };
      return false;
    };

    this.getCenterX = function(){
      return ( this.getX() + this.getWidth() ) / 2;
    }

    this.getCenterY = function(){
      return ( this.getY() + this.getHeight() ) / 2;
    }

  });

  global.AABB = AABB;

})(window);