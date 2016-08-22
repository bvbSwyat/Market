(function() {
  'use strict';

  angular
    .module('ngApp')
    .config(function toastrConf(toastrConfig) {
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
    });
})();
