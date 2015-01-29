(function(global, undefined){

  'use strict';

  var Point = Basic.extend(function(){

    this.x = null;
    this.y = null;

    this.constructor = function( x, y ){
      this.set('x', x);
      this.set('y', y);
    };

  });

  global.Point = Point;

})(window);