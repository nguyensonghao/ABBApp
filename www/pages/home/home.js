"use strict";

angular.module('AbbApp').controller('HomeController', ['$scope', 'UtilService', function ($scope, UtilService) {
  var vm = this;
  vm.title = APP_NAME;
}])
