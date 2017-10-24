app.controller('SignInController', ['AuthService', 'LocalStorageService', '$rootScope', '$state', 'UtilService', '$ionicHistory',
function (AuthService, LocalStorageService, $rootScope, $state, UtilService , $ionicHistory) {
    var vm = this;
    vm.user = {};

    vm.login = function () {
        UtilService.showLoading();
        AuthService.login(vm.user).then(function (user) {
            // Save login status when user save session login checked
            var currentUser = AuthService.getCurrentUser(user);
            if (vm.user.saveSession) {
                LocalStorageService.setItem('currentUser', currentUser);
            }
            
            $rootScope.CurrentUser = currentUser;
            UtilService.hideLoading();
            $ionicHistory.nextViewOptions({
                historyRoot: true,
                disableBack: true
            });
            $state.go('home');
        }
    )
    }

    vm.loginFacebook = function () {
        AuthService.loginFacebook().then(function (data) {
            LocalStorageService.setItem('currentUser', data.user);
            $rootScope.CurrentUser = data.user;
            $state.go('home');
        })
    }

    vm.classSaveSession = function () {
        return vm.user.saveSession ? 'circle-checked' : '';
    }

    vm.saveSession = function () {
        vm.user.saveSession = !vm.user.saveSession;
    }
}])