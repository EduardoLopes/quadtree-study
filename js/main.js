(function(global, undefined){

  'use strict';

  var canvas = document.getElementById('quadtree'),
      ctx = canvas.getContext('2d');

  canvas.width = Game.width;
  canvas.height = Game.height;

  Game.ctx = ctx;

  var entities = [];

  var quadTreeBoundary = new AABB(0,0,Game.width,Game.height);
  var q = new QuadTree( quadTreeBoundary );

  for (var i = 0; i < 50; i++) {

    var width = Game.random(8, 50);
    var height = Game.random(8, 50);
    var x = Game.random(20, Game.width);
    var y = Game.random(20, Game.height);

    if(x + width > Game.width){
      x -= width;
    }

    if(y + height > Game.height){
      y -= height;
    }

     entities.push( new Rect( x, y, width, height ) );
  };

  function drawTree(node){

    ctx.beginPath();
    ctx.rect( node.boundary.x, node.boundary.y, node.boundary.width, node.boundary.height );
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#181818';
    ctx.fillRect( node.boundary.getCenterX() - 1, node.boundary.getCenterY() - 1, 2, 2);

    for (var i =  0; i < node.nodes.length; i++) {

      drawTree(node.nodes[i]);

    };

  }

  (function update(){

    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,Game.width,Game.height);

    for (var i = 0; i < entities.length; i++) {
      entities[i].update();
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