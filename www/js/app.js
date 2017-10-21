app.run(['$ionicPlatform', '$rootScope', '$state', 'LocalStorageService', function($ionicPlatform, $rootScope, $state, LocalStorageService) {
  $ionicPlatform.ready(function() {
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
}])