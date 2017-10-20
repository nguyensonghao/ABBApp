app.service('UtilService', ['$ionicLoading', '$ionicPopup', function ($ionicLoading, $ionicPopup) {
    var service = {};
    service.showLoading = function () {
        $ionicLoading.show();
    }

    service.hideLoading = function () {
        $ionicLoading.hide();
    }

    service.showAlert = function (title = "Thông báo", message) {
        $ionicPopup.alert({
            title: title,
            template: message
        });
    }

  return service;
}])
