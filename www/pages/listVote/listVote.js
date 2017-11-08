app.controller('ListVoteController', ['$stateParams', 'DataService', 'UtilService', '$rootScope',
function ($stateParams, DataService, UtilService, $rootScope) {
    var vm = this;
    vm.listVote = [];
    vm.loadDone = false;
    var loadData  = function () {
    	UtilService.showLoading();
    	DataService.findByField('items', 'userId', $rootScope.CurrentUser.id).then(function (data) {
    		vm.listVote = data;
    		vm.loadDone = true;
    		UtilService.hideLoading();
    	})
    }

    vm.delete = function (vote, index) {
    	var confirm = UtilService.showConfirm('', $rootScope.CONFIRM_DELETE_VOTE);
        confirm.then(function (response) {
            if (response) {
            	UtilService.showLoading();
                DataService.remove('items', vote.id).then(function (data) {
                	UtilService.hideLoading();
                	if (data) {
                		vm.listVote.splice(index, 1);
                	} else {
                		console.log("Have an error in server");
                	}
                })
            }
        });
    }

    loadData();
}])