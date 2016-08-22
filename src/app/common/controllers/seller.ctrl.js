(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('SellerController', SellerController);

    /** @ngInject */
    function SellerController($log, $stateParams, RestService) {
        $log.log($stateParams);
        var vm = this;

        RestService.getSeller($stateParams.seller_id).then(function (data) {
            vm.sellerData = data;
        }, function () {});

        RestService.getOffers("?seller_id=" + $stateParams.seller_id).then(function (data) {
            vm.allOffers = data;
            $log.log(data);
        }, function () {});
    }
})();
