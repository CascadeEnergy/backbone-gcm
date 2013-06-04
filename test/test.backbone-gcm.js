
define([
  'jquery',
  'backbone',
  'chai'
], function($, Backbone, chai) { 
  var expect = chai.expect;

  describe('test', function() {
    it('expect 1+1=2', function() {
      var sum = 1 + 1;
      expect(sum).to.equal(2);
    });
  });
});