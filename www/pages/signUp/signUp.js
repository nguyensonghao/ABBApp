app.controller('SignUpController', ['$scope', 'AuthService', '$rootScope', '$state', 'UtilService', 'LocalStorageService',
function ($scope, AuthService, $rootScope, $state, UtilService, LocalStorageService) {
    var vm = this;
    vm.user = {};

    vm.register = function () {
        UtilService.showLoading();
        AuthService.register(vm.user).then(function (data) {
            var currentUser = AuthService.getCurrentUser(firebase.auth().currentUser);
            LocalStorageService.setItem('currentUser', currentUser);
            $rootScope.CurrentUser = currentUser;
            $state.go('home');
            UtilService.hideLoading();
        })
    }

    vm.isPasswordEqual = function (password, passwordConfirm) {
        return password == passwordConfirm;
    }
}])