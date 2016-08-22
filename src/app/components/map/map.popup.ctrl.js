/* global _ */
(function() {
  'use strict';

  angular
    .module('mapApp')
    .controller('MapPopupController', MapPopupController);

  /** @ngInject */
  function MapPopupController($uibModalInstance, NgMap, popupData, $log, $state, RestService, $rootScope, toastr) {

    var vm = this;

    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    vm.content = popupData;
    vm.confirm = $uibModalInstance.close;
    vm.cancel = $uibModalInstance.dismiss;

    vm.openInfo = function (evt, infoId) {
      vm.map.showInfoWindow(infoId, this);
    };

    vm.setNewAddress = function() {
      var latitude = this.getPosition().lat();
      var longitude = this.getPosition().lng();
      vm.location = {latitude: latitude, longitude: longitude};
    };

    vm.dismiss = function () {
        vm.$dismiss();
    };

    vm.parseData = function() {
      switch(popupData.type) {
        case 'marketMap': {
          switch(popupData.action) {
            case 'add': {
              getLocationByAddress(vm.content.market.address, function(searchedList) {
                if (angular.isUndefined(searchedList[0])) {
                  toastr.warning('Address is undefined. Please choose another one.');
                  vm.cancel();
                } else {
                  vm.location = {latitude: searchedList[0].geometry.location.lat,
                                  longitude: searchedList[0].geometry.location.lng};
                  vm.markerPosition = vm.location.latitude + "," + vm.location.longitude;
                }
              });
              break;
            }
            case 'edit': {
              vm.markerPosition = vm.content.market.latitude + "," + vm.content.market.longitude;
              break;
            }
          }
          break;
        }
      }
    }();

    vm.save = function() {
      switch(popupData.type) {
        case 'marketMap':
        {
          switch (popupData.action) {
            case 'add':
            {
              if (angular.isDefined(vm.markerPosition) && angular.isDefined(vm.location)) {
                vm.confirm(vm.location);
              }
              break;
            }
            case 'edit':
            {
              if (angular.isDefined(vm.markerPosition)) {
                vm.confirm(vm.location);
              }
              break;
            }
          }
          break;
        }
      }
    };

    function getLocationByAddress (address, callback) {
      RestService.getLocationByAddress(address).then(function(data) {
        callback(data.results);
      }, function() {
        toastr.warning('Address is bad!. Please choose another one.');
      });
    }

    // function getAddressByLocation (address, callback) {
    //   RestService.getAddressByLocation(address).then(function(data) {
    //     callback(data.results);
    //   }, function(error) {
    //     toastr.warning('Address is bad!. Please choose another one.');
    //   });
    // }


     $log.log('Popup CTRL', popupData);
  }

})();
