(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('CityController', CityController);

    /** @ngInject */
    function CityController($log) {
        $log.log("123213");
    }
})();
