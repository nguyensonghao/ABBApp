app.controller('VoteController', ['DataService', 'UtilService', '$state', '$timeout', function (DataService, UtilService, $state, $timeout) {
    var vm = this;
    vm.vote = [];
    
    var loadData = function () {
        UtilService.showLoading();
        firebase.database().ref('items').on("value", function(list) {
            list = list.val();
            var result = [];
            for (var key in list) {
                list[key]['id'] = key;
                result.push(list[key]);
            }
            
            $timeout(function () {
                vm.votes = result;
                UtilService.hideLoading();
            })
        });
    }

    vm.detail = function (vote) {
    	$state.go('vote-detail', {
    		id: vote.id
    	})
    }

    vm.voteItem = function (vote, event) {
    	event.stopPropagation();
    	vote.num = vote.num ? ++ vote.num : 1;
    	var voteUpdate = {
    		id: vote.id,
    		title: vote.title,
			content: vote.content,
			img: vote.img,
			video: vote.video,
			imageName: vote.imageName,
			num: vote.num
    	}

    	DataService.update('items', voteUpdate);
    }

    loadData();
}])