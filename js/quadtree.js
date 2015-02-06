(function(global, undefined){

  'use strict';

  var MAX_ENTITIES = 2;
  var MAX_LEVELS = 5;

  var QuadTree = Class.create(Rectangle, {
    initialize: function($super, x, y, width, height, level){
      $super(x, y, width, height);
      this.entities = [];
      this.numEntities = 0;
      this.nodes = [];
      this.level = level;
    },
    clear: function(){
      this.entities.length = 0;
      this.numEntities = 0;
      this.nodes.length = 0;
    },

    insert: function( entity ){

      var index, i = 0;

      if(typeof this.nodes[index] != 'undefined'){
        index = this.getIndex(entity);

        if(index !== -1){

          this.nodes[index].insert(entity);
          return;
        }

      }

      this.entities.push(entity);

      if(this.entities.length > MAX_ENTITIES){
        if(typeof this.nodes[0] == 'undefined'){
          this.divide();
        }
        i = 0;
        while (i < this.entities.length && this.level < MAX_LEVELS){

          index = this.getIndex(this.entities[i]);

          if(index !== -1){
            this.nodes[index].insert(this.entities.splice(i, 1)[0]);

          } else {
            i++;
          }

        };

      }

    },

    getIndex: function(entity){
      var index = -1;

      var topQuadrant = (entity.y < this.getCenterY() && entity.y + entity.height < this.getCenterY());
      var bottomQuadrant = (entity.y > this.getCenterY());

      if(entity.x < this.getCenterX() && entity.x + entity.width < this.getCenterX()){
        if(topQuadrant){
          index = 0;
        } else if(bottomQuadrant){
          index = 3;
        }
      } else if(entity.x > this.getCenterX()){
        if(topQuadrant){
          index = 1;
        } else if(bottomQuadrant){
          index = 2;
        }
      }

      return index;

    },

    divide: function(){

      this.nodes[0] = new QuadTree(
        this.x,
        this.y,
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[1] = new QuadTree(
        this.getCenterX(),
        this.y,
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[2] = new QuadTree(
        this.getCenterX(),
        this.getCenterY(),
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[3] = new QuadTree(
        this.x,
        this.getCenterY(),
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

    },

    query: function( range ){

      var entities = [];
      var index = this.getIndex(range);

      entities.push.apply(entities, this.entities);

      if(typeof this.nodes[0] != 'undefined'){
        if (index != -1) entities.push.apply(entities, this.nodes[index].query( range ));
        else
          {
            entities.push.apply(entities, this.nodes[0].query( range ));
            entities.push.apply(entities, this.nodes[1].query( range ));
            entities.push.apply(entities, this.nodes[2].query( range ));
            entities.push.apply(entities, this.nodes[3].query( range ));
          }
      }

      return entities;

    }

  });

  global.QuadTree = QuadTree;


})(this);