/**
 * Created by swyat on 6/14/16.
 */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('SuperRegionsController', SuperRegionsController);

  /** @ngInject */
  function SuperRegionsController($log, RestService) {
    var vm = this;

    vm.getRegionsList = function() {
      RestService.getRegions().then(function(response) {
        vm.regionsList = response;
      });
    };

    vm.getRegionsList();
    $log.log('Super Regions CTRL');
  }
})();
