(function() {
  'use strict';

  angular
    .module('helpApp')
    .factory('AsyncService', AsyncService);

  /** @ngInject */
  function AsyncService($q) {
    return {
      loadData: function (requestsList) {
        var deferred = $q.defer();
        $q.all(requestsList)
          .then(
            function (results) {
              deferred.resolve(results)
            },
            function (errors) {
              deferred.reject(errors);
            },
            function (updates) {
              deferred.update(updates);
            });
        return deferred.promise;
      }
    };
  }
})();
