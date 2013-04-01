'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.test', []).
        config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

angular.module('myApp.TechnologieServices', ['ngResource']).
    factory('Technologies', function($resource){

  return $resource('http://localhost\\:3000/technologies', {}, {
    query: {method:'GET', params:{}, isArray:true}
  });
});
