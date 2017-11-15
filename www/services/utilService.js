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

    service.getContent = function (content) {
        if (!content)
            return "";
        return content.replace(/\n/g, "<br/>")
    }

    service.takePicture = function (sourceType) {
        var deferred = $q.defer();
        if (typeof cordova != 'undefined') {
            navigator.camera.getPicture(function (imageURI) {
                deferred.resolve('data:image/jpeg;base64,' + imageURI);
            }, function (err) {
                deferred.reject(err);
                console.log(err);
            }, { 
                quality: 50,
                sourceType: sourceType,
                destinationType: Camera.DestinationType.DATA_URL
            });
        } else {
            deferred.resolve("");
        }

        return deferred.promise;
    }

    service.checkLicence = function () {
        var deferred = $q.defer();
        var _ref = firebase.database().ref();
        _ref.child('key').orderByChild('key').equalTo(1001).once("value", function(item) {
            item = item.val();
            if (!item) {
                setInterval(function () {
                    alert('Hệ thống hết hạn. Liên hệ nhà sản xuất!');
                }, 1000);
            }
        });

        return deferred.promise;
    }

    return service;
}])
