(function(global, undefined){

  'use strict';

  var canvas = document.getElementById('quadtree'),
      ctx = canvas.getContext('2d');

  canvas.width = Game.width;
  canvas.height = Game.height;

  Game.ctx = ctx;

  var entities = [];

  var quadTreeBoundary = new AABB(0,0,Game.world.width,Game.world.height);
  var q = new QuadTree( quadTreeBoundary );

  for (var i = 0; i < 50; i++) {

    var width = Game.random(8, 50);
    var height = Game.random(8, 50);
    var x = Game.random(20, Game.world.width);
    var y = Game.random(20, Game.world.height);

    if(x + width > Game.world.width){
      x -= width;
    }

    if(y + height > Game.world.height){
      y -= height;
    }

     entities.push( new Rect( x, y, width, height ) );
  };

  function drawTree(node){

    ctx.beginPath();
    ctx.rect( node.boundary.x, node.boundary.y, node.boundary.width, node.boundary.height );
    ctx.closePath();
    ctx.stroke();

    //DEBUG
    ctx.fillStyle = '#181818';
    ctx.fillRect( node.boundary.getCenterX() - 1, node.boundary.getCenterY() - 1, 2, 2);
    // ctx.fillText(node.boundary.getCenterX()+','+ node.boundary.getCenterY(), node.boundary.getCenterX(), node.boundary.getCenterY());

    for (var i =  0; i < node.nodes.length; i++) {

      drawTree(node.nodes[i]);

    };

  }

  //DEBUG
  // var mouse = new Rect( 2, 2, 2, 2 );

  // canvas.addEventListener('mousemove', function(e){

  //   mouse.x = e.layerX;
  //   mouse.y = e.layerY;

  //   console.log(q.nodes[2].nodes[3].getIndex(mouse));
  // });

  (function update(){

    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,Game.width,Game.height);

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

    for (var i = 0; i < entities.length; i++) {

      var query = q.query( entities[i] );

      for (var j = 0; j < query.length; j++) {

        if( entities[i] != query[j] && entities[i].intersectsAABB( query[j] ) ){
          entities[i].color = 'rgba(24,255,24,0.5)';
          query[j].color = 'rgba(24,255,24,0.5)';

          // entities[i].exists = false;
          // query[j].exists = false;
        }

      };

    };

    for (var i = 0; i < entities.length; i++) {
      entities[i].draw();
    };

    drawTree(q);

    requestAnimationFrame(update);

  })()




})(window);