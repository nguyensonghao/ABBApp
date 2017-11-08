app.controller('UpdateVoteController', ['$stateParams', 'DataService', 'UtilService', '$rootScope', '$ionicActionSheet', '$stateParams',
function ($stateParams, DataService, UtilService, $rootScope, $ionicActionSheet, $stateParams) {
    var vm = this;
    vm.imageUrl = "";
    var imageUrl;

    var loadData = function () {
        UtilService.showLoading();
        DataService.findById('items', $stateParams.id).then(function (data) {
            UtilService.hideLoading();
            vm.vote = data;
            vm.imageUrl = vm.vote.img;
        })
    }

    vm.send = function () {
        if (validate()) {
            if (imageUrl) {
                var storageRef = firebase.storage().ref();
                var fileName = "item/" + new Date().getTime() + ".png";
                UtilService.showLoading();
                storageRef.child(fileName).putString(imageUrl, 'data_url').then(function (snapshot) {
                    DataService.update('items', {
                        id: vm.vote.id,
                        title: vm.vote.title,
                        content: vm.vote.content,
                        img: snapshot.downloadURL,
                        imageName: fileName
                    }).then(function (result) {
                        UtilService.showAlert($rootScope.UPDATE_VOTE_SUCCESS);
                        UtilService.hideLoading();
                    }).catch(function (e) {
                        UtilService.hideLoading();
                        console.log(e);
                    });
                })
            } else {
                DataService.update('items', {
                    id: vm.vote.id,
                    title: vm.vote.title,
                    content: vm.vote.content,
                }).then(function (result) {
                    UtilService.showAlert($rootScope.UPDATE_VOTE_SUCCESS);
                    UtilService.hideLoading();
                }).catch(function (e) {
                    UtilService.hideLoading();
                    console.log(e);
                });
            }
        } else {
            
        }
    }


    vm.getImage = function () {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Chụp ảnh' },
                { text: 'Chọn ảnh từ thư viện' }
            ],
            titleText: 'Thêm ảnh cho tiết mục',
            cancelText: 'Hủy',
            cancel: function() {
                console.log('Cancel action sheet');
            },
            buttonClicked: function(index) {
                var sourceType = index ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
                UtilService.takePicture(sourceType).then(function (image) {
                    vm.imageUrl = image;
                    imageUrl = image;
                })
                return true;
            }
       });
    }

    var validate = function () {
        if (!vm.vote.title) {
            UtilService.showAlert('Thông báo', $rootScope.TITLE_REQUIRED);
            return false;
        } else if (!vm.vote.content) {
            UtilService.showAlert('Thông báo', $rootScope.CONTENT_REQUIRED);
            return false;
        } else {
            return true;
        }
    }

    loadData();
}])