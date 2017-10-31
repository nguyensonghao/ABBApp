"use strict";

angular.module('AbbApp').controller('HomeController', ["$rootScope", '$interval', 'UtilService', 'AuthService', '$state', function ($rootScope, $interval, UtilService, AuthService, $state) {
  var vm = this;
  vm.title = APP_NAME;

  var loadData = function () {
    countDownTime();
    $interval(function () {
      countDownTime();
    }, 1000);
  }
  $rootScope.signOut = function () {
    var confirm = UtilService.showConfirm('', 'Bạn có chắc chắn muốn thoát ứng dụng?');
    confirm.then(function (response) {
      if (response) {
        AuthService.logout().then(function () {
          localStorage.clear('currentUser');
          $state.go('sign-in');
        });
      }
    });

  }

  var countDownTime = function () {
    var date = new Date(COUNT_DOWN_TIME).getTime();
    var currentDate = new Date().getTime();
    var time = new Date(date - currentDate);
    vm.countDownTime = [
      { title: 'Ngày', time: time.getDate() },
      { title: 'Giờ', time: time.getHours() },
      { title: 'Phút', time: time.getMinutes() },
      { title: 'Giây', time: time.getSeconds() }
    ]
  }
  loadData();


}])
