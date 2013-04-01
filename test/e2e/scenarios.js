'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should start with root', function() {
    expect(browser().location().url()).toBe("");
  });


  describe('Technologies', function() {
    it('should display 3 technologies', function() {
      expect(repeater('#technologies li').count()).toBe(4);
 
      input('query').enter('nodejs');
      expect(repeater('#technologies li').count()).toBe(1);
 
      input('query').enter('adopt');
      expect(repeater('#technologies li').count()).toBe(2);
    });
  });

});
