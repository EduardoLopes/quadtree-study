(function(global, undefined){

  'use strict';

  var Point = Class.create(Basic, {
    initialize: function( $super, x, y ){
      $super();
      this.x = x;
      this.y = y;
    }
  });

  global.Point = Point;

})(this);