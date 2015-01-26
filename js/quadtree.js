(function(global, undefined){

  'use strict';

  var QuadTree = Class.extend(function(){

    var MAX_ENTITIES = 2;
    this.entities = [];
    this.numEntities = 0;
    this.nodes = [];

    this.constructor = function( AABB ){
      this.setBoundary( AABB );
    };

    this.setBoundary = function( AABB ){
      this.boundary = AABB;
    };

    this.insert = function( entity ){
      if( entity.intersectsAABB( this.boundary ) ){
        if(this.numEntities < MAX_ENTITIES){
          this.entities[this.numEntities] = entity;
          this.numEntities++;
        } else {
          this.insertToChild( entity );
        }
      }
    };

    this.insertToChildNode = function( entity, x, y, width, height, index ){

      if(this.nodes[index] == null){
        this.nodes[index] = new QuadTree( new AABB( x, y, width, height ) );
      }

      if( entity.intersectRect( x, y, width, height ) ){
        this.nodes[index].insert(entity);
      }

    };

    this.insertToChild = function( entity ){

      this.insertToChildNode(
        entity,
        this.boundary.getX(),
        this.boundary.getY(),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        0
      );

      this.insertToChildNode(
        entity,
        this.boundary.getCenterX(),
        this.boundary.getY(),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        1
      );

      this.insertToChildNode(
        entity,
        this.boundary.getX(),
        this.boundary.getCenterY(),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        2
      );

      this.insertToChildNode(
        entity,
        this.boundary.getCenterX(),
        this.boundary.getCenterY(),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        3
      );

    };

  });

  global.QuadTree = QuadTree;


})(window);