(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('HomeContentController', HomeController);

    /** @ngInject */
    function HomeController($log) {
        $log.log('HomeContentController CTRL');
    }
})();
