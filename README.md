backbone-gcm
=================

Garbage clean-up for Backbone Views.   
Backbone.View mixin for proper garbage collection of model views (view with a `this.model`).

gcm = garbage-collect-model

We have a similar mixin to release for list views (views that utilize a collection instead of a model), and it will probably be released as backbone-gcc (garbage-collect-collection), or backbone-gcl (garbage-collect-list).

Contributers:

- [Michael Schoenfelder](https://github.com/noTxt) authored mixins.
- [Will Vaughn](https://github.com/nackjicholson) unit tested, published.

---
### [Contents](id:contents)
- [Usage](#usage)
- [Install](#install)
- [Example](#example)
- [Why](#why)
- [API](#api)
- [Tests](#tests)
- [Support](#support)

---
### [Usage](id:usage)

**AMD**  - MyView.js

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

---
[top](#contents)
### [Why](id:why)

Because garbage collection is hard to understand, and when developing in Backbone, you will need to do it. This mixin can be added to any of your views that have a model. Being a mixin, it favors composability, and will not interfere with any of your inheritance trees. Another approach is to create yourself a BaseViewClass with these methods, and then derive all your classes from that base class. I favor mixins because I can configure and compose views on an individual need basis, and don't have to deal with classical inheritance.

For good information on javascript and Backbone garbage collection:

- [Zombie Views](http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/): Derick Bailey
- [Preventing Memory Leaks](https://paydirtapp.com/blog/backbone-in-practice-memory-management-and-event-bindings/): Nicholas Firth-McCoy

---
[top](#contents)
### [Install](id:Install)

Bower is a package manager for the web built by twitter, you should check it out, and you should download this package from bower.

`$ npm install bower -g`  
`$ bower install backbone-gcm --save `

The `--save` flag will save backbone-gcm as a dependency in your project's `bower.json` file.

OR  

Download this project, take `backbone-gmc.js` or `backbone-gmc.min.js` files out and put them wherever you would like.

---
[top](#contents)
### [Example](id:example)

There is a small how-to in this repository at [example/example.html](https://github.com/CascadeEnergy/backbone-gcm/blob/master/example/example.html). It allows you to click on items and destroy them. It's not much but it might give you some idea how to use this mixin.

To run the example.

```
$ git clone git@github.com:CascadeEnergy/backbone-gcm.git
$ cd backbone-gcm/
$ bower install
$ node ./util/web-server.js
```

and then navigate to <http://localhost:8000/example/example.html>

---
[top](#contents)
### [API](id:api)

- **destroy()**: Destroys your view and sets it up for garbage collection by unbinding events on the view's model, undelegating its own events, and removing it from the DOM.

- **destroyModel()**: This method destroys your view, as well as destroying `this.model` by calling `this.model.destroy`. This will trigger a sync request to remove your model from the server. For details read the [Model-destroy documentation](http://backbonejs.org/#Model-destroy).

---
[top](#contents)
### [Tests](id:tests)

Tests are in the `test/` directory, they are written with mocha, and run via `testrunner.html`. To get the dependencies for testing, you must have npm and bower installed: `npm install -g bower`.
  
```
$ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
$ cd backbone-gcm/
$ npm install
$ bower install
$ node ./util/web-server.js
```
Open your browser to <http://localhost:8000/testrunner.html>

**OR**  
Run them with PhantomJS on the CLI!!!!

```
$ git clone git@github.com:CascadeEnergy/backbone-gcm.git  
$ cd backbone-gcm/
$ npm install
$ bower install
```

Start a server in one terminal window.  
`$ node ./util/web-server.js` OR `$ grunt nodemon`

And then in another terminal window.

```   
$ cd backbone-gcm/ 
$ grunt shell:mocha-phantomjs
```

If you're developing on this project use: `$ grunt watch`

and then just start developing. Grunt will run automated tests, and JSHint whenever you save files.

---
[top](#contents)
### [Support](id:support)

Make an issue.

Come talk to me on IRC freenode: `#sensei`