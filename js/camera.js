(function(global, undefined){

  'use strict';

  var Camera = Class.create(AABB, {
    initialize: function( $super, x, y, width, height ){
      $super(x, y, width, height);
      this.toFollow = new Point(0,0);
      this.bounds = {width: 0, height: 0};
    },
    setBounds: function(width, height){
      this.bounds.width = width - this.width;
      this.bounds.height = height - this.height;
    },
    follow: function (object) {
      this.toFollow = object;
    },
    update: function(){

      if(Game.mouse.x > Game.width - 125 && this.x < this.bounds.width){
        this.toFollow.x += 20;
      }

      if(Game.mouse.x < 125 && this.x > 0){
        this.toFollow.x -= 20;
      }

       if(Game.mouse.y > Game.height - 125 && this.y < this.bounds.height){
        this.toFollow.y += 20;
      }

      if(Game.mouse.y < 125 && this.y > 0){
        this.toFollow.y -= 20;
      }

      this.x += (this.toFollow.x - (this.x)) * 0.2 >> 0;
      this.y += (this.toFollow.y - (this.y)) * 0.2 >> 0;

      this.x = Math.max(0, Math.min(this.x, this.bounds.width));
      this.y = Math.max(0, Math.min(this.y, this.bounds.height));


    },
    draw: function(){

      Game.ctx.beginPath();
      Game.ctx.rect( 0, 0 , this.width, this.height);
      Game.ctx.closePath();
      Game.ctx.stroke();

    }
  });

  global.Camera = Camera;

})(this);