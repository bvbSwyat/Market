(function() {
  'use strict';

  angular
    .module('ngApp')
    .directive('ngNavTmp', ngNavTmp);

  function ngNavTmp($UrlPath, $rootScope) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: $UrlPath.home.dir+ "ngNavTmp.html",
      link: function($scope, element) {
         $scope.toggleNav = function() {
             element.find('.nav-bar').toggleClass('open-nav-bar');
           $rootScope.$emit('changeClass', 'nav');
         }
      }
    };
  }
})();
