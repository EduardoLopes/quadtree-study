(function(global, undefined){

  'use strict';

  var canvas = document.getElementById('quadtree'),
      ctx = canvas.getContext('2d');

      canvas.width = 500;
      canvas.height = 500;

  var q = new QuadTree( new AABB(0,0,500,500) )

  q.insert( new AABB(10,10,20,20) );
  q.insert( new AABB(10,300,20,20) );
  q.insert( new AABB(400,20,20,20) );
  q.insert( new AABB(400,80,20,20) );
  q.insert( new AABB(400,100,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(300,300,20,20) );
  q.insert( new AABB(200,300,20,20) );
  q.insert( new AABB(300,310,20,20) );
  q.insert( new AABB(210,309,20,20) );
  q.insert( new AABB(220,302,20,20) );
  q.insert( new AABB(230,350,20,20) );
  q.insert( new AABB(330,320,20,20) );
  q.insert( new AABB(220,310,20,20) );

  var query = q.query( new AABB(0,0,500,500) );


  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,500,500);

  function drawTree(node){

    ctx.beginPath();
    ctx.rect( node.boundary.x, node.boundary.y, node.boundary.width, node.boundary.height );
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = '#000';
    ctx.fillRect( node.boundary.getCenterX() - 2.5, node.boundary.getCenterY() - 2.5, 5, 5);


    for (var i =  0; i < node.nodes.length; i++) {

      drawTree(node.nodes[i]);

    };

  }

  drawTree(q);

  ctx.fillStyle = 'rgba(24,24,24,0.2)';

  for (var i = 0; i < query.length; i++) {

    ctx.fillRect( query[i].x, query[i].y, query[i].width, query[i].height);

  };


})(window);