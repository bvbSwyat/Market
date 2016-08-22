(function() {
  'use strict';

  angular
    .module('ngApp')
    .config(function logEnabled($logProvider) {
        $logProvider.debugEnabled(true);
    });
})();
