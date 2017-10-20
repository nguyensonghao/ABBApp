app.controller('SignUpController', ['$scope', 'AuthService', '$rootScope', '$state', 'UtilService', 'LocalStorageService',
function ($scope, AuthService, $rootScope, $state, UtilService, LocalStorageService) {
    var vm = this;
    vm.user = {};

    vm.register = function () {
        AuthService.register(vm.user).then(function (data) {
            LocalStorageService.setItem('currentUser', data);
            $state.go('home');
        })
    }

    vm.isPasswordEqual = function (password, passwordConfirm) {
        return password == passwordConfirm;
    }
}])