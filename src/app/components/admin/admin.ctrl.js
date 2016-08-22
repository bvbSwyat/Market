/**
 * Created by swyat on 6/14/16.
 */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController($log, $state) {
    var vm = this;
    vm.$state = $state;
    
    $log.log('Admin CTRL');
  }
})();
