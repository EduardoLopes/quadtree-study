(function(global){

  'use strict';

  var KeysInput = Class.create({
    initialize: function(element){
      this.map = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      };
      this.keys = {};

      element.addEventListener('keydown', function(e){
        e.preventDefault();

        this.keys[e.keyCode] = true;

      }.bind(this));

      element.addEventListener('keyup', function(e){
        e.preventDefault();

        this.keys[e.keyCode] = false;

      }.bind(this));

    },

    pressed: function(name){
      if(typeof this.keys[ this.map[ name ] ] == 'undefined' ) return false;

      return this.keys[ this.map[ name ] ];
    }
  });

  global.Keys = KeysInput;

})(this);