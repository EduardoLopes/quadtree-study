(function(global, undefined){

  'use strict';

  var canvas = document.getElementById('quadtree'),
      ctx = canvas.getContext('2d');

      canvas.width = 500;
      canvas.height = 500;

  var q = new QuadTree( new AABB(0,0,500,500) )

  q.insert( new AABB(10,10,20,20) );
  q.insert( new AABB(10,300,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );


  console.log(q);

  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,500,500);

  function drawTree(node){

    ctx.beginPath();
    ctx.rect( node.boundary.x, node.boundary.y, node.boundary.width, node.boundary.height );
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.fillRect( node.boundary.getCenterX() - 2.5, node.boundary.getCenterY() - 2.5, 5, 5);


    for (var i =  0; i < node.nodes.length; i++) {

      drawTree(node.nodes[i]);

    };

  }

  drawTree(q);

})(window);