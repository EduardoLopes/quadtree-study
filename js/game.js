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
        width: this.width * 10,
        height: this.height * 10
      }

      this.mouse = new Point(0,0);

      this.camera = new Camera(50,50,500,500);
      this.keys = new Keys(document.body);
      this.camera.setBounds(this.world.width, this.world.height);

    }
  });

  global.Game = new Game( 500, 500 );

})(this);4