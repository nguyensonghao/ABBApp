app.controller('SignUpController', ['$scope', function ($scope) {
    var vm = this;
    vm.user = {};

    vm.register = function () {
        console.log(vm.user);
    }
}])