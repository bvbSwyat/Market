(function() {
  'use strict';

  angular
    .module('ngApp')
    .directive('myAnimation', myAnimation);

  function myAnimation() {
    var directive = {
      restrict: 'A',
      link: function() {
      }
    };
    return directive;
  }
})();
