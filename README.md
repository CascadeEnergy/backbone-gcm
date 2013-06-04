backbone-gcm
=================

Garbage clean-up for Backbone Views.   
Backbone.View mixin for proper garbage collection of model views (view with a `this.model`).

gcm = garbage-collect-model

**Contents**
- [Usage](#usage)
- [Install](#install)
- [Example](#example)
- [Why this exists](#exists)
- [API](#api)
- [Tests](#tests)

### [Usage](id:usage)

**AMD**  

MyView.js

    define([
      'jquery',
      'backbone',
      'path/to/backbone-gcm'
    ], function($, Backbone, gcm) {
      var MyView = Backbone.View.extend({
        initialize: function() {

          // Set up an event or something appropriate to control when
          // you want to release view for garbage collection.
          // destroy is a method added by gcm
          this.on('someEvent', this.destroy, this);
        }
      });

      // Extend MyView with the gcm methods.
      _.extend(MyView.prototype, gcm);

      return MyView;
    });


**Browser Global** 

    <script type="text/javascript" src="path/to/backbone-gmc.js"></script>

then the mixin is available as global variable `gcm`

    _.extend(MyView.prototype, gcm);

### [Install](id:Install)

1. Traditional: clone the repo, and take `backbone-gmc.js` or `backbone-gmc.min.js` files out and put them wherever you keep your bakbone mixins.
2. Or I've made this package available via the bower package manager.

    $ bower install backbone-gcm --save

The `--save` flag will save backbone-gcm as a dependency in your `bower.json`

### [Example](id:example)

There is a small how-to in this repo in at [example/example.html](https://github.com/CascadeEnergy/backbone-gcm/example/example.html). It doesn't do much, except let you click on items and "destroy" them, but it might give you some idea how to use this mixin.

To run the example.

    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git
    $ cd backbone-gcm/
    $ bower install
    $ node ./util/web-server.js

and then navigate to <http://localhost:8000/example/example.html>

### [Why this exists](id:exists)

Because garbage collection is hard to understand, and when developing in Backbone, you will need to do it. This mixin can be added to any of your views that have a model. Being a mixin, it favors composability, and will not interfere with any of your inheritance trees. Another approach is to create yourself a BaseViewClass with these methods, and then derive all your classes from that base class. I favor mixins because I can configure and compose views on an individual need basis, and don't have to deal with classical inheritance.

For good information on javascript and Backbone garbage collection:

- [Zombie Views](http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/): Derick Bailey
- [Preventing Memory Leaks](https://paydirtapp.com/blog/backbone-in-practice-memory-management-and-event-bindings/): Nicholas Firth-McCoy

### [API](id:api)

**destroy()**: Destroys your view and sets it up for garbage collection by unbinding events on the view's model, undelegating its own events, and removing it from the DOM.

**destroyModel()**: This method does all the same things that the `destroy` method does, and additionally calls `this.model.destroy()` a built in Backbone.Model function which will fully destroy the model from the server.

### [Tests](id:tests)

Tests are in the `test/` directory, they are written with mocha, and run via `testrunner.html`. To get the dependencies for testing, you must have bower installed: `npm install -g bower`.

`grunt shell:bower-dev` is my very hacky way of installing the bower dev dependencies.
  
    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
    $ cd backbone-gcm/
    $ npm install
    $ grunt shell:bower-dev
    $ node ./util/web-server.js

Open your browser to <http://localhost:8000/testrunner.html>

**OR**  
Run them with PhantomJS on the CLI!!!!

    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
    $ cd backbone-gcm/
    $ npm install
    $ grunt shell:bower-dev

Start a server in one terminal window.

    $ node ./util/web-server.js

OR

    $ grunt nodemon

And then in another terminal window.
   
    $ cd backbone-gcm/ 
    $ grunt shell:mocha-phantomjs

If you're developing on this project use:
    
    $ grunt watch

and then just start developing. Grunt will run automated tests, and JSHint whenever you save files.