(function() {
  'use strict';

  angular
    .module('ngApp')
    .directive('signIn', signIn);

  function signIn($UrlPath, $rootScope) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: $UrlPath.home.dir + 'signIn.html',
      link: function($scope) {

        $scope.status = {
          isopen: false
        };

        $scope.toggleDropdown = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.openSignIn = $rootScope.$on('openSignInPopup', function(e, closeEvent) {
          $scope.toggleDropdown(closeEvent);
        });

         $scope.signIn = function() {
           $rootScope.signIn($scope.email, $scope.pass);
         }
      }
    };
  }
})();
