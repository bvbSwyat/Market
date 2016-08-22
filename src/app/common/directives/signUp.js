(function() {
  'use strict';

  angular
    .module('ngApp')
    .directive('signUp', signUp);

  function signUp($UrlPath, $rootScope) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: $UrlPath.home.dir + 'signUp.html',
      link: function($scope) {
        $scope.user = {
          email: "",
          password: ""
        };

        $scope.toggleUserType = function(isUserType) {
          $scope.isUser = !isUserType;
          $scope.isSeller = isUserType;
          $scope.isMarket = !isUserType;
        };

        $scope.toggleUserType(false);

        $scope.toggleSingIn = function($event) {
          $rootScope.$emit('openSignInPopup', $event);
        };

        $scope.signUp = function() {
        }
      }
    };
  }
})();
