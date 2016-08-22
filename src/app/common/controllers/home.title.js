(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('HomeTitleController', HomeTitleController);
    // type : ['region', 'offers', 'details']
    /** @ngInject */
    function HomeTitleController(type, $state, $stateParams, RestService, toastr) {
        var vm = this;

        var getMarket = function () {
            RestService.getMarket($stateParams.market_id).then(function (response) {
                if(response.id && response.city_id == $stateParams.city_id){
                    vm.data = response;
                } else {
                    toastr.warning('Can\'t get market data, ');
                    $state.go("home.city", {region_id: $stateParams.region_id, city_id: $stateParams.city_id});
                }
            }, function () {
                toastr.warning('Can\'t get market data, ');
                $state.go("home.city", {region_id: $stateParams.region_id, city_id: $stateParams.city_id});
            });
        };

        switch(type){
            case 'city':
                RestService.getCity($stateParams.city_id).then(function (response) {
                    vm.data = response;
                }, function () {
                    toastr.warning('Can\'t get city data, ');
                    $state.go("home");
                });
                break;

            case 'details':
                vm.isDetails = true;
            case 'offers':
                vm.regionId = $stateParams.region_id;
                vm.cityId = $stateParams.city_id;
                vm.marketId = $stateParams.market_id;
                getMarket();
                break;


        }
    }
})();
