app.service('UtilService', ['$ionicLoading', '$ionicPopup', function ($ionicLoading, $ionicPopup) {
    var service = {};
    service.showLoading = function () {
        $ionicLoading.show();
    }

    service.hideLoading = function () {
        $ionicLoading.hide();
    }

    service.showAlert = function (title, message) {
        $ionicPopup.alert({
            title: title,
            template: message
        });
    }

    service.showErrorLogin = function (err) {
        switch (err.message) {
            
        }
    }

    service.getThumBnailYoutube = function (id) {
        return "http://img.youtube.com/vi/"+ id +"/0.jpg";
    }

  return service;
}])
