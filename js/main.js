(function(global, undefined){

  'use strict';

   var canvas = document.getElementById('quadtree'),
      ctx = canvas.getContext('2d');

  canvas.width = Game.width;
  canvas.height = Game.height;

  canvas.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();

    Game.mouse.x = (e.clientX - rect.left);
    Game.mouse.y = (e.clientY - rect.top);

  });

  Game.ctx = ctx;

  var entities = [];

  var quadTreeBoundary = new Rectangle();
  var q = new QuadTree( 0,0,Game.world.width,Game.world.height, 0 );

  for (var i = 0; i < 199; i++) {

    var width = Util.random(8, 50);
    var height = Util.random(8, 50);
    var x = Util.random(20, Game.world.width);
    var y = Util.random(20, Game.world.height);

    if(x + width > Game.world.width){
      x -= width;
    }

    if(y + height > Game.world.height){
      y -= height;
    }

     entities.push( new Rect( x, y, width, height ) );
  };

  var player = new Player(499,488,50,50);

   entities.push(player);

  function drawTree(node){

    ctx.beginPath();
    ctx.rect( node.x - Game.camera.x, node.y - Game.camera.y, node.width, node.height );
    ctx.closePath();
    ctx.stroke();

    //DEBUG
    ctx.fillStyle = '#181818';
    ctx.fillRect( node.getCenterX() - 1 - Game.camera.x, node.getCenterY() - 1 - Game.camera.y, 2, 2);
    //ctx.fillText(node.entities.length, node.getCenterX() - Game.camera.x, node.getCenterY() - Game.camera.y);

    for (var i =  0; i < node.nodes.length; i++) {

      drawTree(node.nodes[i]);

    };

  }

  (function update(){

    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,Game.width,Game.height);

    Game.camera.update();
    Game.camera.draw();

    for (var i = 0; i < entities.length; i++) {
      if(entities[i].exists){
        entities[i].update();
      }
    };

    q.clear();

    for (var i = 0; i < entities.length; i++) {
      q.insert(entities[i]);
    };


    //brute force
    // for (var i = 0; i < entities.length; i++) {
    //   for (var j = 0; j < entities.length; j++) {
    //     if(entities[i] != entities[j] && entities[i].intersectsAABB( entities[j] ) ){
    //       entities[i].color = '#0f0';
    //       entities[j].color = '#0f0';
    //     }
    //   }
    // }

    // for (var i = 0; i < entities.length; i++) {

    //   var count = 0;

    //   var query = q.query( entities[i] );

    //   for (var j = 0; j < query.length; j++) {

    //     if( entities[i] != query[j] && entities[i].intersectsAABB( query[j] ) ){
    //       entities[i].color = 'rgba(24,255,24,0.5)';
    //       query[j].color = 'rgba(24,255,24,0.5)';

    //     }
    //     count++;
    //   };

    // };

    var query = q.query( Game.camera );
    //ctx.fillText('Collision check:' + count, 10,30);

    var count = 0;
    for (var i = 0; i < query.length; i++) {
      if(query[i].intersectsAABB( Game.camera ) ){
        //query[i].color = 'rgba(24,255,24,0.5)';
        query[i].draw();
        count++;
      }
    };

    ctx.fillStyle = '#181818';
    ctx.fillText('Total entities:' + entities.length, 10,20);
    ctx.fillText('Paiting check:' + query.length, 10,32);
    ctx.fillText('Paiting:' + count, 10,44);

    drawTree(q);

    requestAnimationFrame(update);

  })()




})(this);