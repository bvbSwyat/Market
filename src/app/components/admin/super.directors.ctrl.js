/**
 * Created by swyat on 6/14/16.
 */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('SuperDirectorsController', SuperDirectorsController);

  /** @ngInject */
  function SuperDirectorsController($log, RestService) {
    var vm = this;

    vm.getDirectorsList = function() {
      RestService.getDirectors().then(function(response) {
        vm.directorsList = response;
      });
    };

    vm.getDirectorsList();
    $log.log('Super Directors CTRL');
  }
})();
