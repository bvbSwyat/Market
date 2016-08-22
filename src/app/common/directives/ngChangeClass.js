(function() {
  'use strict';

  angular
    .module('ngApp')
    .directive('ngChangeClass', ngChangeClass);

  function ngChangeClass($UrlPath, $rootScope) {
    return {
      restrict: 'A',
      scope: {
      },
      link: function($scope, element, attrs) {

        var className = attrs.ngChangeClass;
        var type = attrs.cType;

        $scope.changeEvent = $rootScope.$on('changeClass', function(e, event) {
          switch(event) {
            case type: {
              element.toggleClass(className);
              break;
            }
          }
        });

      }
    };
  }
})();
