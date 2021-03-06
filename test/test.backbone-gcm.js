
define([
  'jquery',
  'backbone',
  'chai',
  'lib/backbone-gcm'
], function($, Backbone, chai, gcm) { 
  var expect = chai.expect;

  describe('backbone-gcm', function() {
    var HeroModel 
      , HeroView
      , view;

    // Model class
    HeroModel = Backbone.Model.extend({});

    // View class extending gcm
    HeroView = Backbone.View.extend({
      className: 'hero-view',

      chopcalled: false,

      events: {
        "karate-chop": "chop"
      },

      chop: function() {
        this.chopcalled = true;
      }
    });
    _.extend(HeroView.prototype, gcm);

    beforeEach(function() {
      var miyagi = new HeroModel({name: 'Mr. Miyagi'});
      this.view = view = new HeroView({model: miyagi});
    });

    afterEach(function() {
      this.view.off();
      delete this.view;
    });

    describe('.free', function() {
      it('calls `this.model.off`', function(done) {
        view.model.off = function() {
          done();
        };

        view.free();
      });

      it('calls `this.remove`', function(done) {
        view.remove = function() {
          done();
        };

        view.free();
      });

      it('`this.model` does not accept events', function() {
        var modelchop = false;

        view.model.on('karate-chop', function() {
          modelchop = true;
        });

        view.model.trigger('karate-chop');
        expect(modelchop).to.be.true;

        modelchop = false;

        // Call free.
        view.free();

        // check again.
        expect(modelchop).to.be.false;
        view.model.trigger('karate-chop');
        expect(modelchop).to.be.false;
      });

      it('does not accept events', function() {
        expect(view.chopcalled).to.be.false;
        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.true;

        view.chopcalled = false;

        expect(view.chopcalled).to.be.false;

        // Call free.
        view.free();

        // check again. Event shouldn't go though.
        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.false;
      });

      it('removes view from the DOM', function() {
        var $fixture = $('<div></div>');

        $fixture.html(view.el);

        expect($fixture.find('.hero-view')).to.have.length(1);

        view.free();

        expect($fixture.find('.hero-view')).to.have.length(0);
      });
    });

    describe('.destroyModel', function() {
      it('calls `this.free`', function(done) {
        view.free = function() {
          done();
        };

        view.destroyModel();
      });

      it('calls `this.model.destroy`', function(done) {
        view.model.destroy = function() {
          done();
        };

        view.destroyModel();
      });
    });
  });
});