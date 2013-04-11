'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('radarCanvas', function() {
    var radarFactory =  function (canvas, technologies) {


    var propertyBag = {};
        propertyBag.technologies = technologies;
        propertyBag.context = canvas.getContext('2d');
        propertyBag.center = canvas.width / 2;
        propertyBag.middle = canvas.height / 2;
        propertyBag.radius = 600;
        propertyBag.radiusIncrement = 120;
        propertyBag.colorsCircle = ['#AB988B', '#7195A3', '#74A6BD', '#D4E7ED'];
        propertyBag.colorsLine = ['#7195A3', '#74A6BD', '#D4E7ED', '#D4E7ED'];
        propertyBag.evaluationValues = ['adopt', 'trial', 'assess', 'hold'];
        propertyBag.numberOfTechnologies = technologies.length;
        propertyBag.angularSegment = 360 / propertyBag.numberOfTechnologies;
        propertyBag.evaluationDistance = [60,180,300,420];
        propertyBag.radar = createTechnologySpotCoordinates(propertyBag);

        createRadarCanvas(propertyBag);
        createEvaluationLabels(propertyBag);
        createTechnologyLabeledSpots(propertyBag)
    };

    return {
        template: '<canvas id="myCanvas" width="1040" height="1040"></canvas>',
        restrict: 'A',
        replace: true,
        scope: {technologies:'='},
        link: function (scope, Element) {
            scope.$watch('technologies', function() {
                    radarFactory(Element[0], scope.technologies);
            }, true);
        }
    }
  });

