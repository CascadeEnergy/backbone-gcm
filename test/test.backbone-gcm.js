
define([
  'jquery',
  'backbone',
  'chai',
  'lib/backbone-gcm'
], function($, Backbone, chai, gcm) { 
  var expect = chai.expect;

  describe('backbone-gcm', function() {
    var HeroModel 
      , miyagi
      , HeroView
      , view;

    // Model class
    HeroModel = Backbone.Model.extend({});

    // View class extending gcm
    HeroView = Backbone.View.extend({
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
      miyagi = new HeroModel({name: 'Mr. Miyagi'})
      view = new HeroView({model: miyagi});
    });

    afterEach(function() {
      view.off();
      view = undefined;
      miyagi = undefined;
    });

    describe('.destroy', function() {
      it('calls `this.model.off`', function(done) {
        view.model.off = function() {
          done();
        };

        view.destroy();
      });

      it('calls `this.undelegateEvents`', function(done) {
        view.undelegateEvents = function() {
          done();
        };

        view.destroy();
      });

      it('calls `this.remove`', function(done) {
        view.remove = function() {
          done();
        };

        view.destroy();
      });

      it('does not accept events', function() {
        expect(view.chopcalled).to.be.false;
        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.true;

        view.chopcalled = false;

        expect(view.chopcalled).to.be.false;

        view.destroy();

        view.$el.trigger('karate-chop');
        expect(view.chopcalled).to.be.false;
      });
    });

    describe('.destroyModel', function() {
      it('calls `this.destroy`', function(done) {
        view.destroy = function() {
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