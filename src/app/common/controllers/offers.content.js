(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('OffersContentController', OffersContentController);

    /** @ngInject */
    function OffersContentController($log, RestService, $stateParams) {
        $log.log('OffersContentController CTRL');

        var vm = this;

        vm.offerItemLimit = vm.sellersItemLimit = 8;
        vm.isTabs = false;
        vm.offerArray = vm.sellersArray = [];
        
        var getOffers = function () {
            RestService.getOffers('?page_size=' + vm.offerItemLimit + "&market_id=" + $stateParams.market_id).then(function (dataQ) {
                vm.offerArray = dataQ;
            }, function () {});
        };
        getOffers();

        var getSellers = function () {
            RestService.getSellers('?page_size=' + vm.sellersItemLimit + "&market_id=" + $stateParams.market_id).then(function (dataQ) {
                vm.sellersArray = dataQ;
            }, function () {});
        };
        getSellers();

        vm.getResultsLength = function () {
            return vm.isTabs ? vm.sellersArray.length : vm.offerArray.length;
        };

        vm.setOfferLimit = function () {
            vm.offerItemLimit += 4;
            getOffers();
        };

        vm.isMaxOfferLimit = function () {
            return true;
            // return vm.offerArray.length > vm.offerItemLimit;
        };

        vm.setSellersLimit = function () {
            vm.sellersItemLimit += 4;
            getSellers();
        };

        vm.isMaxSellersLimit = function () {
            return true;
            // return vm.sellersArray.length > vm.sellersItemLimit;
        };
    }
})();
