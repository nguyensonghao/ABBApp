app.controller('EventDetailController', ['$stateParams', 'DataService', 'UtilService', function ($stateParams, DataService, UtilService) {
    var vm = this;

    var loadData = function () {
        UtilService.showLoading();
        DataService.findById('posts', $stateParams.id).then(function (value) {
            vm.post = value;
            UtilService.hideLoading();
        })
    }

    loadData();
}])