/* global google*/

(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('DetailsContentController', DetailsContentController);

    /** @ngInject */
    function DetailsContentController($log, RestService, $stateParams, toastr, Months, Days, $document) {
        $log.log('DetailsContentController CTRL');

        var vm = this;
        vm.dateLimit = 3;
        
        var getMarket = function () {
            RestService.getMarket($stateParams.market_id).then(function (response) {
                vm.marketData = response;
            }, function () {
                toastr.warning('Can\'t get market data, ');
            });
        };

        getMarket();


        var mapCanvas = $document[0].getElementById('map');

        var mapOptions = {
            center: new google.maps.LatLng(52.3702157, 4.8951679),
            zoom: 12,
            mapTypeIds: google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Map(mapCanvas, mapOptions);


        var getCity = function () {
            RestService.getCity($stateParams.city_id).then(function (response) {
                vm.cityData = response;
            }, function () {
                toastr.warning('Can\'t get city data, ');
            });
        };

        getCity();

        var getRegion = function () {
            RestService.getRegion($stateParams.region_id).then(function (response) {
                vm.regionData = response;
            }, function () {
                toastr.warning('Can\'t get market data, ');
            });
        };

        getRegion();

        vm.getMonthName = function () {
            if(!vm.marketData) return '';

            var monthIndex = new Date(Object.keys(vm.marketData.schedule)[0]).getMonth();

            return Months[parseInt(monthIndex)];
        };

        vm.getMonthTitle = function (index) {
            if(!vm.marketData) return '';
            var date = new Date(Object.keys(vm.marketData.schedule)[index]);

            return date.getDate() + " " + Months[parseInt(date.getMonth())];
        };

        vm.getDayName = function (index) {
            if(!vm.marketData) return '';
            var date = new Date(Object.keys(vm.marketData.schedule)[index]);

            return Days[date.getDay()];
        };

        vm.isNextPage = function () {
            return Object.keys(vm.marketData ? vm.marketData.schedule : {}).length >  vm.dateLimit;
        }
    }
})();
