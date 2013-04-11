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
function ListController($scope, Technologies) {
//  $http.get('technologies/technologies.json').success(function(data) {
//    $scope.technologies = data;

    $scope.technologies = Technologies.query();

//  $scope.orderParameter = 'year';
}

function RadarController($scope, Technologies) {
//    $http.get('technologies/technologies.json').success(function(data) {
//        $scope.technologies = data;
//    });
    $scope.technologies = Technologies.query();
}
RadarController.$inject = ['$scope', 'Technologies'];

function DetailController($scope, Technologies, $routeParams) {
    $scope.technology = Technologies.get( { id: $routeParams.id});
}
DetailController.$inject = ['$scope', 'Technologies', '$routeParams'];

function AddController(Technologies, $scope, $location) {
    $scope.onSubmit=function() {
        var tech = new Technologies($scope.technology);
        tech.$save(function(res, headers) {
            $location.path('/detail/'+res._id);
        });
    };
}
