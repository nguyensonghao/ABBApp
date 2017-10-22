app.service('AuthService', ['$q', 'UtilService', function ($q, UtilService) {
    var service = {};
    var _ref = firebase.database().ref();

    service.login = function (account) {
        var deferred = $q.defer();
        var credential = firebase.auth.EmailAuthProvider.credential(account.email, account.password);
        firebase.auth().signInWithCredential(credential).then(function(user) {
            deferred.resolve(user);
        }).catch(function (error) {
            UtilService.hideLoading();
            UtilService.showAlert(error.message);
            deferred.reject(error);
        })

        return deferred.promise;
    }

    service.register = function (user) {        
        var deferred = $q.defer();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function (data) {
            var currentUser = firebase.auth().currentUser;
            currentUser.updateProfile({
                // Save value phoneNumber in photoURL properties
                photoURL: user.phone,
                displayName: user.username
            }).then(function(result) {
                deferred.resolve(result);
            }).catch(function (error) {
                UtilService.hideLoading();
                UtilService.showAlert(error.message);
                deferred.reject(error);
            })
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

    service.getCurrentUser = function (user) {
        return {
            email: user.email,
            phone: user.photoURL,
            username: user.displayName
        }
    }

    service.forgotPassword = function (email) {
        var deferred = $q.defer();
        firebase.auth().sendPasswordResetEmail(email).then(function (result) {
            deferred.resolve(true);
        }).catch(function (err) {
            UtilService.hideLoading();
            deferred.reject(err);
        })

        return deferred.promise;
    }

    return service;
}])