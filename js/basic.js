(function(global){

  'use strict';

  var Basic = Class.create({
    initialize: function(){
      this.visible = true;
      this.active = true;
      this.alive = true;
      this.exists = true;
    },
    kill: function(){
      this.visible = false;
      this.active = false;
      this.alive = false;
      this.exists = false;
    },
    revive: function(){
      this.visible = true;
      this.active = true;
      this.alive = true;
      this.exists = true;
    },
    setVisible: function(valeu){
      this.visible = valeu;
    },
    setAlive: function(value){
      this.alive = value;
    },
    setExists: function(value){
      this.exists = value;
    }
  });

  global.Basic = Basic;

})(this);