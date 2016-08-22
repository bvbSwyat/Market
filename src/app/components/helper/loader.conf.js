(function() {
  'use strict';

  angular
    .module('helpApp')
    .config(function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
  });
})();
