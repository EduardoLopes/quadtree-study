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

    this.getIndex = function(entity){
      var index;

      if(entity.x < this.boundary.getCenterX() && entity.width < this.boundary.getCenterX()){
        if(entity.y < this.boundary.getCenterY() && entity.height < this.boundary.getCenterY()){
          index = 0;
        } else if(entity.y > this.boundary.getCenterY()){
          index = 3
        }
      } else if(entity.x > this.boundary.getCenterX()){
        if(entity.y > this.boundary.getCenterY() && entity.height < this.boundary.getCenterY()){
          index = 2;
        } else if(entity.y < this.boundary.getCenterY()){
          index = 1
        }
      }

      return index;

    }

    this.insertToChildNode = function( entity, x, y, width, height, index ){

      if(typeof this.nodes[index] == 'undefined'){
        this.divide();
      }

      if(typeof index != 'undefined'){
        this.nodes[index].insert(entity);
      }

    };

    this.divide = function(){

      this.nodes[0] = new QuadTree(
        new AABB(
          this.boundary.get('x'),
          this.boundary.get('y'),
          this.boundary.getHalfXDimention(),
          this.boundary.getHalfYDimention()
        )
      );

      this.nodes[1] = new QuadTree(
        new AABB(
          this.boundary.getCenterX(),
          this.boundary.get('y'),
          this.boundary.getHalfXDimention(),
          this.boundary.getHalfYDimention()
        )
      );

      this.nodes[2] = new QuadTree(
        new AABB(
          this.boundary.getCenterX(),
          this.boundary.getCenterY(),
          this.boundary.getHalfXDimention(),
          this.boundary.getHalfYDimention()
        )
      );

      this.nodes[3] = new QuadTree(
        new AABB(
          this.boundary.get('x'),
          this.boundary.getCenterY(),
          this.boundary.getHalfXDimention(),
          this.boundary.getHalfYDimention()
        )
      );

    };

    this.insertToChild = function( entity ){

      this.insertToChildNode(
        entity,
        this.boundary.get('x'),
        this.boundary.get('y'),
        this.boundary.getHalfXDimention(),
        this.boundary.getHalfYDimention(),
        this.getIndex(entity)
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