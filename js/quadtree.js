(function(global, undefined){

  'use strict';

  var MAX_ENTITIES = 2;

  var QuadTree = Basic.extend(function(){

    this.entities = [];
    this.numEntities = 0;
    this.nodes = [];

    this.constructor = function( AABB ){
      this.setBoundary( AABB );
    };

    this.setBoundary = function( AABB ){
      this.boundary = AABB;
    };

    this.clear = function(){
      this.entities.length = 0;
      this.numEntities = 0;
      this.nodes.length = 0;
    }

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
        this.boundary.get('x'),
        this.boundary.get('y'),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        0
      );

      this.insertToChildNode(
        entity,
        this.boundary.getCenterX(),
        this.boundary.get('y'),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        1
      );

      this.insertToChildNode(
        entity,
        this.boundary.get('x'),
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

    this.query = function( range ){

      var entities = [];

      if(!this.boundary.intersectsAABB( range ) ){
        return entities;
      }

      entities.push.apply(entities, this.entities);

      if(this.nodes[0] == null){
        return entities;
      }

      entities.push.apply(entities, this.nodes[0].query( range ));
      entities.push.apply(entities, this.nodes[1].query( range ));
      entities.push.apply(entities, this.nodes[2].query( range ));
      entities.push.apply(entities, this.nodes[3].query( range ));

      return entities;

    }

  });

  global.QuadTree = QuadTree;


})(window);