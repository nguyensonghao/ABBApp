app.service('UtilService', ['$ionicLoading', '$ionicPopup', '$q', function ($ionicLoading, $ionicPopup, $q) {
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

    service.showConfirm = function (title, message) {
        var alertPopup = $ionicPopup.show({
            title: title,
            template: message,
            cssClass: 'ffPopup',
            buttons: [
                {
                    text: 'Hủy',
                    type: 'popclose',
                    onTap: function (e) {

                    }
                },
              {
                  text: 'OK',
                  type: 'button-full button-assertive',
                  onTap: function (e) {
                      return 'ok';
                  }
              }
            ]
        });
        return alertPopup;
    }
    
    service.showErrorLogin = function (err) {
        switch (err.message) {
            
        }
    }

    service.getThumBnailYoutube = function (id) {
        return "http://img.youtube.com/vi/"+ id +"/0.jpg";
    }

    service.takeImage = function () {
        var deferred = $q.defer();
        if (typeof cordova != 'undefined') {
            navigator.camera.getPicture(function (imageURI) {
                deferred.resolve(imageURI);
            }, function (err) {
                deferred.reject(imageURI)
                console.log(err);
            }, { 
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            });
        } else {
            deferred.resolve("");
        }

        return deferred.promise;
    }

  return service;
}])
