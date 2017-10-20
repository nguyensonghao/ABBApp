app.service('AuthService', ['$q', 'UtilService', function ($q, UtilService) {
    var service = {};
    var _ref = firebase.database().ref();

    service.login = function (account) {
        var deferred = $q.defer();
        UtilService.showLoading();
        var email = account.phone + "@gmail.com";
        var credential = firebase.auth.EmailAuthProvider.credential(email, account.password);
        firebase.auth().signInWithCredential(credential).then(function(user) {
            UtilService.hideLoading();
            deferred.resolve(user);
        }).catch(function (error) {
            console.log(error);
            UtilService.hideLoading();
            UtilService.showAlert(error.message);
            deferred.reject(error);
        })

        return deferred.promise;
    }

    service.register = function (user) {        
        var deferred = $q.defer();
        UtilService.showLoading();
        var email = user.phone + "@gmail.com";
        firebase.auth().createUserWithEmailAndPassword(email, user.password).then(function (data) {
            _ref.child('users').set(user).then(function (user) {
                UtilService.hideLoading();
                deferred.resolve(data);
            }).catch(function(error) {
                UtilService.hideLoading();
                UtilService.showAlert(error.message);
                deferred.reject(error);
            });
        }).catch(function(error) {
            UtilService.hideLoading();
            UtilService.showAlert(error.message);
            deferred.reject(error);
        });       
        
        return deferred.promise;
    }

    service.logout = function () {
        
    }

    service.loginFacebook = function () {
        var deferred = $q.defer();
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (user) {
            deferred.resolve(user);
        }).catch(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    service.getCurrentUser = function () {
        return firebase.auth().currentUser;
    }

    return service;
}])