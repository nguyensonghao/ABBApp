angular.module('AbbApp').service('UtilService', ['$ionicLoading', function ($ionicLoading) {
  var service = {};
  service.showLoading = function () {
    $ionicLoading.show();
  }

  service.hideLoading = function () {
    $ionicLoading.hide();
  }

  return service;
}])
