'use strict';

/* Controllers */

/*
function ListController($scope) {
  $scope.technologies = [
   {"name": "nodejs",       "evaluation": "adopt",  "year": "2011"},
   {"name": "angularjs",    "evaluation": "trial",  "year": "2012"},
   {"name": "testacularjs", "evaluation": "assess", "year": "2013"},
   {"name": "bootstrap",    "evaluation": "adopt",  "year": "2012"}
  ];
  
  $scope.orderParameter = 'year';
}
*/

/*
function ListController($scope, Technologies) {
  $scope.technologies = Technologies.query();
  $scope.orderParameter = 'year';
}
*/
function ListController($scope, $http) {
  $http.get('technologies/technologies.json').success(function(data) {
    $scope.technologies = data;
  });
  $scope.orderParameter = 'year';
}

function MyCtrl2() {
}
//MyCtrl2.$inject = [];
