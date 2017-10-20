"use strict";

angular.module('AbbApp').controller('HomeController', ['$scope', 'UtilService', 'AuthService', function ($scope, UtilService, AuthService) {
  var vm = this;
  vm.title = APP_NAME;

  vm.register = function () {
    var user = {
      email: vm.email,
      password: '123456'
    }
    
    AuthService.register(user).then(function (data) {
      console.log(data);
    })
  }
}])
