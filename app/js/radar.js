const EVALUATION  = ['adopt', 'trial', 'assess', 'hold'];

var writeTable = function (propertyBag) {
    var technologiesElement = document.getElementById('technologies');

    for (var j=0; j<propertyBag.technologies.length; j++) {;
        var row = document.createElement('tr');
        var field1 = document.createElement('td');
        var content1 = document.createTextNode(propertyBag.technologies[j].name);
        field1.appendChild(content1);
        row.appendChild(field1);

        var field2 = document.createElement('td');
        var content2 = document.createTextNode(propertyBag.evaluationValues[propertyBag.technologies[j].evaluation]);
        field2.appendChild(content2);
        row.appendChild(field2);

        technologiesElement.appendChild(row);
    }
};

var createTechnologySpotCoordinates = function (propertyBag) {
    var radar = [];
    for (var i=0; i<propertyBag.technologies.length; i++) {
        radar.push(
            {'x': (-(propertyBag.evaluationDistance[propertyBag.technologies[i].evaluation]) * Math.sin(propertyBag.angularSegment*(i+1))),
                'y': ((propertyBag.evaluationDistance[propertyBag.technologies[i].evaluation]) * Math.cos(propertyBag.angularSegment*(i+1)))}
        );
    }
    return radar;
};

var createRadarCanvas = function createRadarCanvas(propertyBag) {
    var currentRadius = propertyBag.radius;

    for (var i=0; i<propertyBag.colorsCircle.length; i++) {
        currentRadius -= propertyBag.radiusIncrement;
        propertyBag.context.fillStyle = propertyBag.colorsCircle[i]; //red
        propertyBag.context.beginPath();
        propertyBag.context.arc(propertyBag.center,propertyBag.middle,currentRadius,0,2*Math.PI,false)
        propertyBag.context.lineWidth = 8;
        propertyBag.context.strokeStyle = propertyBag.colorsLine[i];
        propertyBag.context.stroke()
        propertyBag.context.closePath();
        propertyBag.context.fill();
    }
};

var createEvaluationLabels = function (propertyBag) {
    for (var i=0; i<propertyBag.evaluationValues.length; i++) {
        propertyBag.context.font = 'bold 12pt sans-serif';
        propertyBag.context.fillStyle = '#004080';
        propertyBag.context.fillText(propertyBag.evaluationValues[i], propertyBag.center + propertyBag.evaluationDistance[i],propertyBag.middle);
    }
};

var createTechnologyLabeledSpots = function (propertyBag) {
    var xPosition=0;
    var yPosition=0;
    for (var i=0; i<propertyBag.radar.length; i++) {
        propertyBag.context.fillStyle = '#EB8207';
        propertyBag.context.beginPath();
        xPosition = propertyBag.center + propertyBag.radar[i].x;
        yPosition = propertyBag.middle + propertyBag.radar[i].y;
        propertyBag.context.arc(xPosition,yPosition,10,0,2*Math.PI,false)
        propertyBag.context.closePath();
        propertyBag.context.fill();

        propertyBag.context.font = '10pt sans-serif';
        propertyBag.context.fillStyle = 'black';
        propertyBag.context.fillText(propertyBag.technologies[i].name, xPosition, yPosition);
    }
};