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
        width: this.width * 8,
        height: this.height * 8
      }

      this.mouse = new Point(0,0);

      this.camera = new Camera(0,0,500,500);
      this.camera.setBounds(this.world.width, this.world.height);
      //this.camera.follow(this.mouse);

    }
  });

  global.Game = new Game( 500, 500 );

})(this);