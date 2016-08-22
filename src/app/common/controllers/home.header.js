(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('HomeHeaderController', HomeHeaderController);

    /** @ngInject */
    function HomeHeaderController(RestService, $rootScope, $log, $location, $state) {
        var vm = this;

        // пофіксити пізніше
        var ids = $location.url().split("/");
        vm.regionId = ids[2] || 'default';
        vm.cityId = ids[4] || 'default';
        vm.marketId = ids[6] || 'default';

        vm.stateChange = $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams){
                vm.regionId = toParams.region_id;
                vm.cityId = toParams.city_id;
                vm.marketId = toParams.market_id;
                getAllCities();
                getAllMarkets();
            });
        RestService.getRegions().then(function (response) {
            vm.allRegions = response;
        });

        var getAllCities = function () {
            if(vm.regionId == 'default') return;
            RestService.getCities('?region_id=' + vm.regionId).then(function (response) {
                vm.allCities = response;
            });
        };
        getAllCities();

        var getAllMarkets = function () {
            if(vm.cityId == 'default') return;
            RestService.getMarkets('?city_id=' + vm.cityId).then(function (response) {
                vm.allMarkets = response;
            });
        };
        getAllMarkets();

        vm.goListener = function () {
            if(vm.regionId == 'default' || vm.cityId == 'default') return;
            if(vm.marketId == 'default'){
                $state.go('home.city', {region_id: vm.regionId, city_id: vm.cityId});
            } else {
                $state.go('home.market-offers', {region_id: vm.regionId, city_id: vm.cityId, market_id: vm.marketId});
            }
        };

        vm.changeRegion = function () {
            vm.allCities = [];
            vm.cityId = 'default';
            vm.allMarkets = [];
            vm.marketId = 'default';
            getAllCities();
        };

        vm.changeCity = function () {
            vm.allMarkets = [];
            vm.marketId = 'default';
            getAllMarkets();
        }
    }
})();
