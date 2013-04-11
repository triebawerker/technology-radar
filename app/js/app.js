'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters',
                         'myApp.services',
                         'myApp.directives',
                         'myApp.technologyService'
                        ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: ListController});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: RadarController});
    $routeProvider.when('/detail/:id', {templateUrl: 'partials/partial3.html', controller: DetailController});
    $routeProvider.when('/add', {templateUrl: 'partials/partial4.html'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
