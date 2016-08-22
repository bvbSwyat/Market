(function() {
  'use strict';

  angular
    .module('ngApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($log) {
    $log.log('Home CTRL')
  }
})();
