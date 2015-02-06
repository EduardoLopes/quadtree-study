(function(global, undefined){

  'use strict';

  var MAX_ENTITIES = 2;
  var MAX_LEVELS = 5;

  var QUADTREE_POOL = [];

  function getQuadtree(x, y, width, height, level){
    if(QUADTREE_POOL.length > 0){

      return QUADTREE_POOL.pop().reset(x, y, width, height, level);
    }

    return new QuadTree(x, y, width, height, level);
  }


  var QuadTree = Class.create(Rectangle, {
    initialize: function($super, x, y, width, height, level){
      $super(x, y, width, height);
      this.entities = [];
      this.numEntities = 0;
      this.nodes = [];
      this.level = level;
    },
    clear: function(){
      var i = 0;

      for (i = 0; i < this.nodes.length; i++) {
        this.nodes[i].clear();
        QUADTREE_POOL.push(this.nodes[i]);
      };

      this.entities.length = 0;
      this.numEntities = 0;
      this.nodes.length = 0;

    },

    reset: function(x, y, width, height, level){

      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.level = level;

      return this;

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
      var index = -1,
          topQuadrant = (entity.y < this.getCenterY() && entity.y + entity.height < this.getCenterY()),
          bottomQuadrant = (entity.y > this.getCenterY());

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

      this.nodes[0] = getQuadtree(
        this.x,
        this.y,
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[1] = getQuadtree(
        this.getCenterX(),
        this.y,
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[2] = getQuadtree(
        this.getCenterX(),
        this.getCenterY(),
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

      this.nodes[3] = getQuadtree(
        this.x,
        this.getCenterY(),
        this.getHalfXDimention(),
        this.getHalfYDimention(),
        this.level + 1
      );

    },

    query: function( range ){

      var index = this.getIndex(range);

      if(typeof this.nodes[0] != 'undefined'){
        if (index != -1) this.entities.push.apply(this.entities, this.nodes[index].query( range ));
        else
          {
            this.entities.push.apply(this.entities, this.nodes[0].query( range ));
            this.entities.push.apply(this.entities, this.nodes[1].query( range ));
            this.entities.push.apply(this.entities, this.nodes[2].query( range ));
            this.entities.push.apply(this.entities, this.nodes[3].query( range ));
          }
      }

      return this.entities;

    }

  });

  global.QuadTree = QuadTree;


})(this);