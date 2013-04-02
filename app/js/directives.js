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
            var context = canvas.getContext('2d');

            var center = canvas.width / 2;
            var middle = canvas.height / 2;

            var radius = 600;
            var radiusIncrement = 120;
            var colorsCircle = ['#AB988B', '#7195A3', '#74A6BD', '#D4E7ED'];
            var colorsLine = ['#7195A3', '#74A6BD', '#D4E7ED', '#D4E7ED'];

            var evaluationValues = ['adopt', 'trial', 'assess', 'hold'];

//            var technologies = [
//                {'name': 'nodejs', 'evaluation': '0'},
//                {'name': 'angularjs', 'evaluation': '1'},
//                {'name': 'testecularjs', 'evaluation': '2'},
//                {'name': 'jadejs', 'evaluation': '3'},
//                {'name': 'php', 'evaluation': '0'},
//                {'name': 'mysql', 'evaluation': '0'},
//                {'name': 'mongodb', 'evaluation': '2'},
//                {'name': 'ZendFramework 1', 'evaluation': '3'}
//            ];

            // create technologie spots parameters
            var numberOfTechnologies = technologies.length;
            var angularSegment = 360 / numberOfTechnologies;
            var evaluationDistance = [60,180,300,420];

            var radar = createTechnologieSpotCoordinates(technologies, evaluationDistance, angularSegment);

            writeTable(technologies, evaluationValues);
            createRadarCanvas(context, radiusIncrement, colorsLine, radius, colorsCircle, center, middle);
            createEvaluationLabels(evaluationValues, evaluationDistance, center, middle, context);
            createTechnologieLabeledSpots(technologies, radar, center, middle, context)
        };

        var writeTable = function (technologies, evaluationValues) {
            var technologiesElement = document.getElementById('technologies');

            for (var j=0; j<technologies.length; j++) {;
                var line = document.createElement('tr');
                var field = document.createElement('td');
                var content = document.createTextNode(technologies[j].name);
                field.appendChild(content);
                line.appendChild(field);

                var field = document.createElement('td');
                var content = document.createTextNode(evaluationValues[technologies[j].evaluation]);
                field.appendChild(content);
                line.appendChild(field);

                technologiesElement.appendChild(line);
            }
        };

        var createTechnologieSpotCoordinates = function (technologies, evaluationDistance, angularSegment) {
            var radar = [];
            for (var i=0; i<technologies.length; i++) {
                radar.push(
                    {'x': (-(evaluationDistance[technologies[i].evaluation]) * Math.sin(angularSegment*(i+1))),
                        'y': ((evaluationDistance[technologies[i].evaluation]) * Math.cos(angularSegment*(i+1)))}
                );
            }
            return radar;
        };

        var createRadarCanvas = function createRadarCanvas(context, radiusIncrement, colorsLine, radius, colorsCircle, center, middle) {

            for (var i=0; i<4; i++) {
                radius -= radiusIncrement;
                context.fillStyle = colorsCircle[i]; //red
                context.beginPath();
                context.arc(center,middle,radius,0,2*Math.PI,false)
                context.lineWidth = 8;
                context.strokeStyle = colorsLine[i];
                context.stroke()
                context.closePath();
                context.fill();
            }
        };

        var createEvaluationLabels = function (evaluationValues, evaluationDistance, center, middle, context) {
            for (var i=0; i<evaluationValues.length; i++) {
                context.font = 'bold 12pt sans-serif';
                context.fillStyle = '#004080';
                context.fillText(evaluationValues[i], center + evaluationDistance[i], middle);
            }
        };

        var createTechnologieLabeledSpots = function (technologies, radar, center, middle, context) {
            var xPosition=0;
            var yPosition=0;
            for (var i=0; i<radar.length; i++) {
                context.fillStyle = '#EB8207';
                context.beginPath();
                xPosition = center+radar[i].x;
                yPosition = middle+radar[i].y;
                context.arc(xPosition,yPosition,10,0,2*Math.PI,false)
                context.closePath();
                context.fill();

                context.font = '10pt sans-serif';
                context.fillStyle = 'black';
                context.fillText(technologies[i].name, xPosition, yPosition);
            }
        };
    return {
      restrict: 'A',
      replace: true,
      template: '<canvas id="myCanvas" width="1040" height="1040"></canvas>',
      scope: {technologies: '='},

      link: function(scope, element, attrs) {

          scope.$watch('technologies', function(newVal) {
              if (undefined === newVal) return;
              radarFactory(element[0], newVal);
          });

      }
    }
  });

