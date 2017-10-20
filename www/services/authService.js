angular.module('AbbApp').service('AuthService', ['$q', function ($q) {
    var service = {};
    service.login = function (user) {

    }

    service.register = function (user) {
        var deferred = $q.defer();
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function (data) {
            deferred.resolve(data);
        }).catch(function(error) {
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