(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('OfferController', OfferController);

    /** @ngInject */
    function OfferController($log, $stateParams, RestService, $scope) {
        $log.log($stateParams);
        var vm = this;

        vm.regionId = $stateParams.region_id;
        vm.cityId = $stateParams.city_id;
        vm.marketId = $stateParams.market_id;

        RestService.getOffer($stateParams.offer_id).then(function (data) {
            vm.offerData = data;
            $log.log(data);
            
            RestService.getSeller(data.seller_id).then(function (data) {
                vm.sellerData = data;
            }, function () {});

        }, function () {});

        RestService.getMarket($stateParams.market_id).then(function (data) {
            vm.marketData = data;
        }, function () {});

        $scope.slides = [
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 1, text: "asdasd"},
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 2, text: "asdasd"},
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 3, text: "asdasd"},
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 4, text: "asdasd"},
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 5, text: "asdasd"},
            {image: "http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/shopping/banzaan-market/pagePropertiesImage/banzaan-market-phuket.jpg", id: 6, text: "asdasd"},
        ];

    }
})();
