(function(global, undefined){

  'use strict';

  var Rect = Class.create(Entity, {
    initialize: function($super, x, y, width, height){
      $super(x, y, width, height);
      this.color = 'rgba(24,24,24,0.5)';
      this.vx = Util.random(2, 16);
      this.vy = Util.random(2, 16);
      this.index = null;
    },
    update: function(){

      this.x += this.vx;
      this.y += this.vy;

      if(this.x + this.width < Game.world.width) this.vx = -this.vx;
      if(this.x > 0) this.vx = -this.vx;

      if(this.y + this.height < Game.world.height) this.vy = -this.vy;
      if(this.y > 0) this.vy = -this.vy;

      this.color = 'rgba(24,24,24,0.5)';

    },

    draw: function(){

      Game.ctx.fillStyle = this.color;
      Game.ctx.fillRect( this.x, this.y, this.width, this.height);
      // Game.ctx.beginPath();
      // Game.ctx.rect( this.x, this.y, this.width, this.height );
      // Game.ctx.stroke();
      // Game.ctx.fillStyle = '#181818';
      // Game.ctx.fillText(this.index, this.x, this.y);

    }

  });

  global.Rect = Rect;

})(this);