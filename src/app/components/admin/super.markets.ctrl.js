/* global _ */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('SuperMarketsController', SuperMarketsController);

  /** @ngInject */
  function SuperMarketsController($log, RestService, $state, toastr, MarketModel, $rootScope, AsyncService, $uibModal, $UrlPath) {
    var vm = this;

    ctrlActivity($state.current.data.action);

    function ctrlActivity (action) {
      switch (action) {
        case "list": {
          vm.showMarkets = true;
          RestService.getMarkets('').then(function(response) {
            vm.marketsList = response;
            //vm.showMarkets = true;
          });
          break;
        }

        case "add": {
          vm.minutes = _.range(60).Xpad();
          vm.hours = _.range(24).Xpad();
          vm.action = action;
          vm.disabledExtra = false;
          vm.dayType = true;
          vm.dayOffArray = [];
          vm.dayOnArray = [];

          RestService.getRegions('?all=0').then(function(regionsList) {
            regionsList.length > 0 ? vm.regions = regionsList : toastr.error("You can\'t add market with no regions data! Please, add at least 1 region.");
            RestService.getDirectors().then(function (directorsList) {
              vm.directors = directorsList;
            });
          });
          vm.market = MarketModel();
          break;
        }
        case "edit": {
            vm.minutes = _.range(60).Xpad();
            vm.hours = _.range(24).Xpad();
            vm.action = action;
            vm.disabledExtra = false;
            vm.dayType = true;
            vm.dayOffArray = [];
            vm.dayOnArray = [];


            if (angular.isDefined($state.params.market_id)) {
              var requestsArray = [RestService.getRegions('?all=0'), RestService.getDirectors(), RestService.getMarket($state.params.market_id)];
              AsyncService.loadData(requestsArray).then(function(data) {
                vm.regions = data[0];
                vm.directors = data[1];
                vm.market = MarketModel(data[2], true);
                vm.market.region = $rootScope.getObj(vm.regions, 'id', vm.market.region_id);
                RestService.getCities('?region_id=' + vm.market.region_id).then(function(citiesList) {

                  vm.cities = citiesList;
                  vm.market.city = $rootScope.getObj(vm.cities, 'id', vm.market.city_id);
                });
                vm.market.director = $rootScope.getObj(vm.directors, 'id', vm.market.user_id);
              });
            }

          break;
        }
      }
      vm.radioDay = function(dayName, id) {
        var setedDays = $rootScope.getObjs(vm.market.time, dayName, true);
        if (angular.isDefined(setedDays) && setedDays.length > 1) {
          angular.forEach(setedDays, function(item) {
            if (item.id != id) item[dayName] = undefined;
          });
        }
      };

      vm.getCitiesByRegion = function(regionId) {
        RestService.getCities('?region_id='+ regionId).then(function(citiesList) {
          vm.cities = citiesList;
        });
      }

      vm.toggleMarketMap = function(market, action) {
        if ( market.address == '') {
          toastr.warning("You need to add address first!");
          return;
        }
        if (market.longitude == "" || market.latitude == "") {
          toastr.warning("You need to add correct address!");
          return;
        }
        $uibModal.open({
          controller: 'MapPopupController',
          controllerAs: 'mapper',
          templateUrl: $UrlPath.admin.state + 'super/markets/map.popup.html',
          resolve: {
            popupData: function () {
              return {type: 'marketMap', action: action, market: market};
            }
          }
        }).result.then(function (location) {
            if (angular.isDefined(location)) {
              market.latitude = location.latitude;
              market.longitude = location.longitude;
            }
        });
      }
    }

    vm.openExtraDate = function () {
      if(!angular.isDefined(vm.market.schedule_exception)){
        RestService.getMarketsSchedulesExceptions("?market_id=" + vm.market.id).then(function (data) {
          vm.market.schedule_exception = data;
          angular.forEach(data.schedule, function (value) {
            if(value.date_of == 1){
              vm.dayOffArray.push(value.date);
            } else {
              vm.dayOnArray.push(value.date);
            }
          });

          var time_from = data.time_from.split(":");
          var time_to = data.time_to.split(":");
          vm.extra_from_h = time_from[0];
          vm.extra_from_m = time_from[1];
          vm.extra_to_h = time_to[0];
          vm.extra_to_m = time_to[1];
        });
      }
      vm.isShowDP = true;
    };

    var dateToString = function (date) {
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    };

    vm.saveExtraDate = function () {
      var obj = {
        market_id: vm.market.schedule_exception ? vm.market.schedule_exception.id : null,
        schedule: [],
        isChange: true
      };

      angular.forEach(vm.dayOffArray, function (value) {
        var schObj = {
          date: dateToString(new Date(value)),
          day_of: 1
        };

        obj.schedule.push(schObj);
      });

      angular.forEach(vm.dayOnArray, function (value) {
        var schObj = {
          date: dateToString(new Date(value)),
          day_of: -1
        };
        obj.time_from = vm.extra_from_h + ":" + vm.extra_from_m + ":00";
        obj.time_to = vm.extra_to_h + ":" + vm.extra_to_m + ":00";
        obj.schedule.push(schObj);
      });
      vm.market.schedule_exception = obj;
      vm.isShowDP = false;
    };

    vm.setUndefined = function(toUndefined) {
      if (toUndefined == false) toUndefined = undefined;

    }




    $log.log('Super Market CTRL', $state.current.data);
  }
})();
