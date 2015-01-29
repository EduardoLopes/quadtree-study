(function(global, undefined){

  'use strict';

  var Rect = Entity.extend(function(){

    this.color = 'rgba(24,24,24,0.5)';
    this.vx = Game.random(2, 16);
    this.vy = Game.random(2, 16);

    this.update = function(){

      this.x += this.vx;
      this.y += this.vy;

      if(this.get('x') + this.get('width') < Game.width) this.vx = -this.vx;
      if(this.get('x') > 0) this.vx = -this.vx;

      if(this.get('y') + this.get('height') < Game.height) this.vy = -this.vy;
      if(this.get('y') > 0) this.vy = -this.vy;

      this.color = 'rgba(24,24,24,0.5)';

    };

    this.draw = function(){

      Game.ctx.fillStyle = this.color;
      Game.ctx.fillRect( this.get('x'), this.get('y'), this.get('width'), this.get('height') );
      Game.ctx.beginPath();
      Game.ctx.rect( this.get('x'), this.get('y'), this.get('width'), this.get('height') );
      Game.ctx.stroke();
      // Game.ctx.fillStyle = '#181818';
      // Game.ctx.fillText(this.colliding, this.get('x'), this.get('y'));

    };

  });

  global.Rect = Rect;

})(window);