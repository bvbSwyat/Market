
(function() {
  'use strict';

  angular
    .module('mapApp')
    .controller('MapController', MapController);

  /** @ngInject */
  function MapController(NgMap, $log, $state, RestService, $rootScope, toastr, $scope, MarketModel, GOOGLE_KEY) {
    var vm = this;

    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    vm.zoom =4;
    vm.mapKey = GOOGLE_KEY;

    vm.markerConf = {
              url:'../../../assets/images/icon/marker-red.svg',
              scaledSize:[50,50],
              origin: [0,0],
              anchor: [25,40]
    };

    vm.openInfo = function (evt, infoId) {
      vm.map.showInfoWindow(infoId, this);
    }

     $log.log('Popup CTRL1');
  }

})();
