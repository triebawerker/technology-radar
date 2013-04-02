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