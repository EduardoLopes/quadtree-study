(function(global, undefined){

  'use strict';

  var Game = Class.create(Basic, {
    initialize: function($super, width, height){
      $super();
      this.width = width;
      this.height = height;
      this.delta = 0;
      this.ctx = null;
      this.world = {
        width: this.width,
        height: this.height
      }
    }
  });

  global.Game = new Game( 500, 500 );

})(this);