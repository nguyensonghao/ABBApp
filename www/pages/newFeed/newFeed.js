app.controller('NewFeedController', ['DataService', 'UtilService', '$stateParams', function (DataService, UtilService, $stateParams) {
    var vm = this;

    var loadData = function () {
        vm.type = $stateParams.type;
    }

    vm.active = function (tabs) {
        return tabs == vm.type ? 'active' : '';
    }

    vm.changeTabs = function (type) {
        vm.type = type;
    }

    loadData();
}])