app.controller('NewFeedController', ['DataService', 'UtilService', '$stateParams', '$state', function (DataService, UtilService, $stateParams, $state) {
    var vm = this;

    var loadData = function () {
        vm.type = $stateParams.type;
        vm.title = vm.type == 'feeds' ? 'SỰ KIỆN' : 'TIẾT MỤC'; 
    }

    vm.active = function (tabs) {
        return tabs == vm.type ? 'active' : '';
    }

    vm.changeTabs = function (type) {
        vm.title = type == 'feeds' ? 'SỰ KIỆN' : 'TIẾT MỤC';
        vm.type = type;
    }

    loadData();
}])