(function(global, undefined){

  'use strict';

  var MAX_ENTITIES = 2;

  var QuadTree = Class.create(Basic, {
    initialize: function($super, AABB){
      this.entities = [];
      this.numEntities = 0;
      this.nodes = [];

      this.bounds = AABB;

    },
    clear: function(){
      this.entities.length = 0;
      this.numEntities = 0;
      this.nodes.length = 0;
    },

    insert: function( entity ){
      if( entity.intersectsAABB( this.bounds ) ){
        if(this.numEntities < MAX_ENTITIES){
          this.entities[this.numEntities] = entity;
          this.numEntities++;
        } else {
          this.insertToChild( entity );
        }
      }

    },

    getIndex: function(entity){
      var index = 0;



      if(entity.x < this.bounds.getCenterX() && entity.width < this.bounds.getCenterX()){
        if(entity.y < this.bounds.getCenterY() && entity.height < this.bounds.getCenterY()){
          index = 0;
        } else if(entity.y > this.bounds.getCenterY()){
          index = 3
        }
      } else if(entity.x > this.bounds.getCenterX()){
        if(entity.y > this.bounds.getCenterY() && entity.height < this.bounds.getCenterY()){
          index = 2;
        } else if(entity.y < this.bounds.getCenterY()){
          index = 1
        }
      }

      // if(typeof index == 'undefined'){
      //   console.log(index);
      // }

      return index;

    },

    insertToChildNode: function( entity, x, y, width, height, index ){

      if(typeof this.nodes[index] == 'undefined'){
        this.divide();
      }

      if(typeof index != 'undefined'){
        this.nodes[index].insert(entity);
      }

    },

    divide: function(){

      this.nodes[0] = new QuadTree(
        new AABB(
          this.bounds.x,
          this.bounds.y,
          this.bounds.getHalfXDimention(),
          this.bounds.getHalfYDimention()
        )
      );

      this.nodes[1] = new QuadTree(
        new AABB(
          this.bounds.getCenterX(),
          this.bounds.y,
          this.bounds.getHalfXDimention(),
          this.bounds.getHalfYDimention()
        )
      );

      this.nodes[2] = new QuadTree(
        new AABB(
          this.bounds.getCenterX(),
          this.bounds.getCenterY(),
          this.bounds.getHalfXDimention(),
          this.bounds.getHalfYDimention()
        )
      );

      this.nodes[3] = new QuadTree(
        new AABB(
          this.bounds.x,
          this.bounds.getCenterY(),
          this.bounds.getHalfXDimention(),
          this.bounds.getHalfYDimention()
        )
      );

    },

    insertToChild: function( entity ){

      this.insertToChildNode(
        entity,
        this.bounds.x,
        this.bounds.y,
        this.bounds.getHalfXDimention(),
        this.bounds.getHalfYDimention(),
        this.getIndex(entity)
      );

    },

    query: function( range ){

      var entities = [];

      if(!this.bounds.intersectsAABB( range ) ){
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


})(this);