(function(global, undefined){

  'use strict';

  var Player = Class.create(Entity, {
    initialize: function($super, x, y, width, height){
      $super(x, y, width, height);
      this.color = 'rgba(24,50,50,0.5)';
      this.vx = 10;
      this.vy = 10;
      this.index = null;
    },
    update: function(){

      if(Game.keys.pressed('UP')) this.y -= this.vy;
      if(Game.keys.pressed('DOWN')) this.y += this.vy;
      if(Game.keys.pressed('LEFT')) this.x -= this.vx;
      if(Game.keys.pressed('RIGHT')) this.x += this.vx;

    },
    draw: function(){
      Game.ctx.fillStyle = this.color;
      Game.ctx.fillRect(this.x - Game.camera.x, this.y - Game.camera.y, this.width, this.height);
      Game.ctx.fillText('('+this.x+','+this.y+') - ', this.x - Game.camera.x, this.y - Game.camera.y);
    }
  });

  global.Player = Player;

})(this);