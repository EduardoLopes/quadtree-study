(function(global, undefined){

  'use strict';

  var Game = Basic.extend(function(){

    this.width = null;
    this.height = null;
    this.delta = 0;
    this.ctx = null;

    this.constructor = function( width, height ){

      this.set( 'width', width );
      this.set( 'height', height );

    };

    this.random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  });

  global.Game = new Game( 500, 500 );

})(window);