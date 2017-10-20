app.controller('SignInController', ['AuthService', 'LocalStorageService', '$rootScope', '$state',
function (AuthService, LocalStorageService, $rootScope, $state) {
    var vm = this;
    vm.user = {};

    vm.login = function () {
        AuthService.login(vm.user).then(function (user) {
            LocalStorageService.setItem('currentUser', user);
            $rootScope.CurrentUser = user;
            $state.go('home');
        })
    }

    vm.loginFacebook = function () {
        AuthService.loginFacebook().then(function (data) {
            LocalStorageService.setItem('currentUser', data.user);
            $rootScope.CurrentUser = data.user;
            $state.go('home');
        })
    }
}])