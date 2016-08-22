(function() {
    'use strict';

    angular
        .module('ngApp')
        .controller('CityContentController', CityContentController);

    /** @ngInject */
    function CityContentController($log, RestService, $stateParams, toastr) {
        $log.log('CityContentController CTRL');

        var vm = this;

        vm.regionId = $stateParams.region_id;
        vm.cityId = $stateParams.city_id;
        var getMarkets = function () {
            RestService.getMarkets('?city_id=' + vm.cityId).then(function (response) {
                $log.log(response);
                vm.allMarkets = response;
            }, function () {
                toastr.warning('Can\'t get market data, ');
            });
        };

        getMarkets();
    }
})();
