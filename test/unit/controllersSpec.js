'use strict';

/* jasmine specs for controllers go here */

describe('ListController', function(){
  var scope = {},
      controller = new ListController(scope);
    it('should have two technologies', function() {

 
      expect(scope.technologies.length).toBe(4);
      expect(scope.technologies[0].name).toBe('nodejs');
      expect(scope.technologies[1].evaluation).toBe('trial');
    
    });

    it('should set the default value of orderProp model', function() {
      expect(scope.orderParameter).toBe('year');
    });

  it('should ....', function() {
    //spec body
  });
});


describe('MyCtrl2', function(){
  var myCtrl2;


  beforeEach(function(){
    myCtrl2 = new MyCtrl2();
  });


  it('should ....', function() {
    //spec body
  });
});
