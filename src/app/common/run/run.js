(function() {
  'use strict';

  angular
    .module('ngApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('run end');
  }

})();
