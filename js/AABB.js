(function(global, undefined){

  'use strict';

  var AABB = Rectangle.extend(function(){



    this.constructor = function( x, y, width, height ){
      this.super( x, y, width, height );
    };

    this.intersectRect = function( x, y, width, height ){

      if(this.x < x + width && this.y < y + height
        && this.x + this.width > x && this.y + this.height > y){
        return true;
      };
      return false;
    };

    this.intersectsAABB = function( other ){
      return this.intersectRect(other.x, other.y, other.width, other.height);
    };

    this.getCenterX = function(){
      return this.get('x') + (this.get('width') / 2);
    };

    this.getCenterY = function(){
      return this.get('y')  + (this.get('height') / 2);
    };

    this.getHalfXDimention = function(){
      return this.get('width') / 2;
    };

    this.getHalfYDimention = function(){
      return this.get('height') / 2;
    };

  });

  global.AABB = AABB;

})(window);