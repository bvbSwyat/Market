/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ngApp')
    .constant('animationTime', 500)
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
