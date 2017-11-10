app.run(['$ionicPlatform', '$rootScope', '$state', 'LocalStorageService', '$location', '$ionicHistory',
function($ionicPlatform, $rootScope, $state, LocalStorageService, $location, $ionicHistory) {
    $ionicPlatform.ready(function() {
    // Remove backbutton in home screen
        $ionicPlatform.registerBackButtonAction(function(event) {
            if(window.navigator && window.navigator.splashscreen) {
                window.plugins.orientationLock.unlock();
            }
        }, 100)

        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    // Change constants message to rootScope
    for (var key in MESSAGE) {
        $rootScope[key] = MESSAGE[key];
    }

  // Config firebase key
    firebase.initializeApp(FIREBASE_CONFIG);
    $rootScope.CurrentUser = LocalStorageService.getItem('currentUser');
    if (!$rootScope.CurrentUser) {
        setTimeout(function () {
            $state.go('sign-in');
        }, 100);
    }
}])

app.controller('AppController', ['UtilService', 'AuthService', '$state', '$rootScope',
    function (UtilService, AuthService, $state, $rootScope) {
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

    $rootScope.getContent = function (content) {
        return UtilService.getContent(content);
    }
}])