'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('getValue', ['input', function(input) {
     return function(value) {
         return input[value];
     }
  }]).
  filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]);

/*
 angular.module('your_app') // attach to your app or create a new with ('filters', [])
 .filter('isodate', function(){
 return function(datetime){
 var n = datetime.split(' ');
 if(n.length == 1) return datetime;
 else return n.join('T')+'Z';
 };
 });
*/

/*
 filter('interpolate', ['version', function(version) {
 return function(text) {
 return String(text).replace(/\%VERSION\%/mg, version);
 }
 }]).

    */