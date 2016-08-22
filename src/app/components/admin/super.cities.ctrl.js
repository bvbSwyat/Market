/**
 * Created by swyat on 6/14/16.
 */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('SuperCitiesController', SuperCitiesController);

  /** @ngInject */
  function SuperCitiesController($log, RestService) {
    var vm = this;

    vm.getCitiesList = function() {
      RestService.getCities().then(function(response) {
        vm.citiesList = response;
      });
    };

    vm.getCitiesList();
    $log.log('Super City CTRL');
  }
})();
