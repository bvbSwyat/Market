/* global _ */
(function() {
  'use strict';

  angular
    .module('adminApp')
    .controller('PopupController', PopupController);

  /** @ngInject */
  function PopupController($uibModalInstance, popupData, $log, $state, RestService, $rootScope, toastr, $scope, MarketModel) {
   var vm = this;
    vm.content = popupData;
    vm.confirm = $uibModalInstance.close;
    vm.cancel = $uibModalInstance.dismiss;

    vm.dismiss = function () {
      vm.$dismiss();
    };

    vm.save = function () {
        vm.$close(true);
    };

    vm.parseData = function() {
      switch(popupData.action) {
        case 'add': {
          switch(popupData.type) {
            case 'city': {
              RestService.getRegions().then(function (regions) {
                vm.cityData = {
                  title: "",
                  region: {}
                };
                vm.regions = regions;
                if (regions.length == 0) {
                  toastr.warning('You should have at least 1 region added.', 'Saving impossible!');
                }
              }); break;
            }

            case 'region': {
                vm.regionData = { title: "" };
                break;
            }

            case 'director': {
              vm.directorData = { username: "" };
              break;
            }
          }
          break;
        }

        case 'edit': {
          switch(popupData.type) {
            case 'city':
            {
              var cityId = popupData.id;
              RestService.getCity(cityId).then(function (cityItem) {
                RestService.getRegions().then(function (regions) {
                  vm.selectedRegionId = cityItem.region_id;
                  vm.cityData = {
                    title: cityItem.title,
                    region: $rootScope.getObj(regions, 'id', cityItem.region_id),
                    photo: cityItem.photo
                  };

                  if (regions.length == 0) {
                    toastr.warning('You should have at least 1 region added.', 'Saving impossible!');
                  }
                  vm.regions = regions;
                });
              });
              break;
            }

            case 'region':
            {
              var regionId = popupData.id;
              RestService.getRegion(regionId).then(function (region) {
                vm.regionData = {title: region.title, id: regionId};

                if (angular.isDefined(region.error) && region.error != 0) {
                  toastr.warning('Can\'t get region data, ');
                }
              });
              break;
            }

            case 'director':
            {
              var directorId = popupData.id;
              RestService.getDirector(directorId).then(function (director) {
                vm.directorData = {username: director.username, id: directorId, email: director.email, phone: director.phone};
                if (angular.isDefined(director.error) && director.error != 0) {
                  toastr.warning('Can\'t get director data, ');
                }
              });
              break;
            }

          }
          break;
        }

        case 'remove': {
          switch(popupData.type) {
            case 'city':
            {
              break;
            }
          }

          break;
        }

        case 'view': {
          switch(popupData.type) {
            case 'market':
            {
              RestService.getMarket(popupData.id).then(function (marketItem) {
                if (marketItem.user_id != null) {
                  RestService.getDirector(marketItem.user_id).then(function (directorItem) {
                    vm.marketData.director = directorItem;
                  })
                }

                vm.marketData = MarketModel(marketItem);
                vm.minutes = _.range(60).Xpad();
                vm.hours = _.range(24).Xpad();

              }, function () {
                toastr.error('Can\'t get markets data!', 'Error');
                vm.confirm();
              });
              break;
            }
          }
          break;
        }
      }
    }();

    vm.save = function() {
      switch(popupData.action) {
        case 'add': {
          switch(popupData.type) {
            case 'city': {
              if (angular.isUndefined(vm.cityData.region.id) || angular.isUndefined(vm.cityData.title)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.postCity(
                vm.cityData.title,
                vm.cityData.region.id,
                angular.isDefined(vm.cityData.newPhoto) ? vm.cityData.newPhoto.base64 : undefined).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }

            case 'region': {
              if (angular.isUndefined(vm.regionData.title)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.postRegion(
                vm.regionData.title).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }

            case 'director': {
              if (angular.isUndefined(vm.directorData.username)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.postDirector(
                  vm.directorData.username, vm.directorData.email, vm.directorData.password, vm.directorData.phone).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }
          }
          break;
        }

        case 'edit': {
          switch(popupData.type) {
            case 'city': {
              if (angular.isUndefined(vm.cityData.region.id) || angular.isUndefined(vm.cityData.title)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.putCity(popupData.id,
                vm.cityData.title,
                vm.cityData.region.id,
                angular.isDefined(vm.cityData.newPhoto)
                  ? vm.cityData.newPhoto.base64
                  : vm.cityData.photo).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }

            case 'region': {
              if (angular.isUndefined(vm.regionData.id) || angular.isUndefined(vm.regionData.title)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.putRegion(vm.regionData.id,
                vm.regionData.title).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }

            case 'director': {
              if (angular.isUndefined(vm.directorData.id) || angular.isUndefined(vm.directorData.username)) {
                toastr.error('Problem with data!', 'Error');
                return;
              }
              RestService.putDirector(vm.directorData.id,
                  vm.directorData.username, vm.directorData.email, vm.directorData.phone).then(function() {
                toastr.success('Save successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with data!', 'Error');
              });
              break;
            }

          }
          break;
        }

        case 'remove': {
          switch(popupData.type) {
            case 'market': {
              RestService.removeMarket(popupData.id).then(function() {
                toastr.success('Remove successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with request!', 'Error');
              });
              break;
            }
            case 'city': {
              RestService.removeCity(popupData.id).then(function() {
                toastr.success('Remove successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with request!', 'Error');
              });
              break;
            }

            case 'region': {
              RestService.removeRegion(popupData.id).then(function() {
                toastr.success('Remove successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with request!', 'Error');
              });
              break;
            }

            case 'director': {
              RestService.removeDirector(popupData.id).then(function() {
                toastr.success('Remove successfully!');
                vm.confirm();
              }, function() {
                toastr.error('Problem with request!', 'Error');
              });
              break;
            }
          }

          break;
        }
      }
    };


     $log.log('Popup CTRL', popupData);
  }

})();
