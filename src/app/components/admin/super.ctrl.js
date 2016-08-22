/**
 * Created by swyat on 6/14/16.
 */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('SuperController', SuperController);

  /** @ngInject */
  function SuperController($log) {
    
    $log.log('Super CTRL');
  }
})();
