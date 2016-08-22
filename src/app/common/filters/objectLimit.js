/**
 * Created by glooni on 25.06.16.
 */

(function() {
    'use strict';

    angular
        .module('ngApp')
        .filter('objectLimit', [function () {
        return function (obj, limit) {
            var keys = Object.keys(obj ? obj : {});
            if (keys.length < 1) {
                return [];
            }

            var ret = new Object,
                count = 0;
            angular.forEach(keys, function (key) {
                if (count >= limit) {
                    return false;
                }
                ret[key] = obj[key];
                count++;
            });
            return ret;
        };
    }]);
})();