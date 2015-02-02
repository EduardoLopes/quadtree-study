(function(global, undefined){

  'use strict';

  var AABB = Class.create(Rectangle, {
    initialize: function($super, x, y, width, height){
      $super( x, y, width, height);
    },
    intersectRect: function(x, y, width, height){
      if(this.x < x + width && this.y < y + height
        && this.x + this.width > x && this.y + this.height > y){
        return true;
      };
      return false;
    },
    intersectsAABB: function( other ){
      return this.intersectRect(other.x, other.y, other.width, other.height);
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

  global.AABB = AABB;

})(this);