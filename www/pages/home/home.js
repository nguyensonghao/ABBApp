"use strict";

angular.module('AbbApp').controller('HomeController', ['$interval', 'UtilService', 'AuthService', function ($interval, UtilService, AuthService) {
  var vm = this;
  vm.title = APP_NAME;

  var loadData = function () {
    countDownTime();
    $interval(function () {
      countDownTime();
    }, 1000);
  }

  var countDownTime = function () {
    var date = new Date(COUNT_DOWN_TIME).getTime();
    var currentDate = new Date().getTime();
    var time = new Date(date - currentDate);
    vm.countDownTime = [
      {title: 'Ngày', time: time.getDate()},
      {title: 'Giờ', time: time.getHours()},
      {title: 'Phút', time: time.getMinutes()},
      {title: 'Giây', time: time.getSeconds()}
    ]
  }

  loadData();
}])
