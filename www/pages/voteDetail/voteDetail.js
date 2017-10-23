app.controller('VoteDetailController', ['$stateParams', 'DataService', 'UtilService', function ($stateParams, DataService, UtilService) {
    var vm = this;

    var loadData = function () {
        UtilService.showLoading();
        DataService.findById('items', $stateParams.id).then(function (value) {
            vm.vote = value;
            UtilService.hideLoading();
        })
    }

    vm.voteItem = function () {
    	vm.vote.num = vm.vote.num ? ++ vm.vote.num : 1;
    	var voteUpdate = {
    		id: vm.vote.id,
    		title: vm.vote.title,
			content: vm.vote.content,
			img: vm.vote.img,
			video: vm.vote.video,
			imageName: vm.vote.imageName,
			num: vm.vote.num
    	}

    	DataService.update('items', voteUpdate);
    }

    loadData();
}])