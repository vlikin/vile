'use strict';

var app = angular.module('vile/ui', [
  'ngMaterial',
  'satellizer'
])

.controller('FrameController', function ($scope) {
  $scope.greeting = 'Hello from Viktor.';
})

.run(function () {});