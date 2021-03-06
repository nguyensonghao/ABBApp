"use strict";

angular.module('AbbApp').controller('HomeController', ["$rootScope", '$interval', 'UtilService', 'AuthService', '$state', 'DataService', function ($rootScope, $interval, UtilService, AuthService, $state, DataService) {
  var vm = this;
  var date = new Date(COUNT_DOWN_TIME).getTime();

  var loadData = function () {
    countDownTime();
    $interval(function () {
      countDownTime();
    }, 1000);
  }

  var countDownTime = function () {
    var currentDate = new Date().getTime();
    var distance = date - currentDate;
    if (distance <= 0) {
      vm.countDownTime = [
        { title: 'Ngày', time: '0' },
        { title: 'Giờ', time: '0' },
        { title: 'Phút', time: '0' },
        { title: 'Giây', time: '0' }
      ]
      vm.countDownStatus = 'screen-last';
    } else {
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      vm.countDownStatus = 'screen-first';
      vm.countDownTime = [
        { title: 'Ngày', time: days },
        { title: 'Giờ', time: hours },
        { title: 'Phút', time: minutes },
        { title: 'Giây', time: seconds }
      ]
    }
  }
  
  loadData();
}])
