// ## backbone-gcm.js
// 
// // author: nackjicholson - Will Vaughn 
//
// > backbone-gcm doesm garbage collection for model views (views with at a `this.model`).
// 
// The below Use Anywhere setup was so graciously provided to me by:
// <https://github.com/umdjs/umd/blob/master/returnExports.js>

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.gcm = factory();
  }
}(this, function () {
  'use strict';

  // This is the gcm mixin.
  return {
    // destroy model and view
    destroyModel: function() {
      this.free();
      this.model.destroy();
    },
    // keep model, destroy view
    free: function() {
      this.remove();
      this.model.off();
    }
  };
}));