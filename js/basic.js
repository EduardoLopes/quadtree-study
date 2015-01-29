(function(global, undefined){

  'use strict';

  var Basic = Class.extend(function(){

    this.visible = true;
    this.exists = true;

    this.set = function(property, value){
      this[property] = value;
    }

    this.get = function(property, value){
      if(typeof this[property] == 'undefined') throw new Error('Property "'+property+'" doesn\'t exists.');
      return this[property];
    }

  });

  global.Basic = Basic;

})(window);