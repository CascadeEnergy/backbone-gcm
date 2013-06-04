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

### [Example](id:example)

There is a small how-to in this repo in at [example/example.html](https://github.com/CascadeEnergy/backbone-gcm/example/example.html). It doesn't do much, except let you click on items and "destroy" them, but it might give you some idea how to use this mixin.

To run the example.

    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git
    $ cd backbone-gcm/
    $ bower install
    $ node ./util/web-server.js

and then navigate to <http://localhost:8000/example/example.html>

### [Why this exists](id:exists)

### [API](id:api)

**destroy()**: Destroys your view and sets it up for garbage collection by unbinding events on the view's model, undelegating its own events, and removing it from the DOM.

**destroyModel()**: This method does all the same things that the `destroy` method does, and additionally calls `this.model.destroy()` a built in Backbone.Model function which will fully destroy the model from the server.

### [Tests](id:tests)

Tests are in the `test/` directory, they are written with mocha, and run via `testrunner.html`
  
    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
    $ cd backbone-gcm/
    $ npm install
    $ bower install
    $ node ./util/web-server.js

Open your browser to <http://localhost:8000/testrunner.html>

**OR**  
Run them with PhantomJS on the CLI!!!!

    $ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
    $ cd backbone-gcm/
    $ npm install
    $ bower install

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