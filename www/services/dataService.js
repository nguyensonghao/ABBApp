app.service('DataService', ['$q', function ($q) {
    var service = {};
    var _ref = firebase.database().ref();

    service.insert = function (collection, value) {
        var deferred = $q.defer();
        _ref.child(collection).push(value, function (err) {
            if (err) {
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        })

        return deferred.promise;
    }

    service.all = function (collection) {
        var deferred = $q.defer();
        _ref.child(collection).on("value", function(list) {
            deferred.resolve(list);
        });

        return deferred.promise;
    }

    return service;
}])