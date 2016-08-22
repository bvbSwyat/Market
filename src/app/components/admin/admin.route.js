(function() {
  'use strict';

  angular
    .module('adminApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $UrlPathProvider) {
      $urlRouterProvider.when('/super', '/super/cities');
      $urlRouterProvider.when('/super/', '/super/cities');


    $stateProvider

      .state('admin', {
        url: '^/admin',
        controller: 'AdminController',
        controllerAs: 'admin',
        abstract: true,
        templateUrl: $UrlPathProvider.admin.state + 'admin.main.html'
      })

      .state('admin.user', {
        url: '^/user',
        controller: 'UserController',
        controllerAs: 'user',
        views: {
          'header': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.header.html'
          },
          'content': {
            templateUrl: $UrlPathProvider.admin.state + 'user.content.html'
          },
          'footer': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.footer.html'
          }
        }
      })

      .state('admin.seller', {
        url: '^/seller',
        controller: 'SellerController',
        controllerAs: 'seller',
        views: {
          'header': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.header.html'
          },
          'content': {
            templateUrl: $UrlPathProvider.admin.state + 'seller.content.html'
          },
          'footer': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.footer.html'
          }
        }
      })

      .state('admin.market', {
        url: '^/market',
        controller: 'MarketController',
        controllerAs: 'market',
        views: {
          'header': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.header.html'
          },
          'content': {
            templateUrl: $UrlPathProvider.admin.state + 'market.content.html'
          },
          'footer': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.footer.html'
          }
        }
      })

      .state('admin.super', {
        url: '^/super',
        views: {
          'header': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.header.html'
          },
          'content': {
            templateUrl: $UrlPathProvider.admin.state + 'super.content.html',
            controller: 'SuperController',
            controllerAs: 'super'
          },
          'footer': {
            templateUrl: $UrlPathProvider.admin.state + 'admin.footer.html'
          }
        }
      })

        .state('admin.super.markets', {  //markets
          templateUrl: $UrlPathProvider.admin.state + 'super/markets/index.html'
        })

        .state('admin.super.markets.list', {
          url: '^/super/markets',
          controller: 'SuperMarketsController',
          controllerAs: 'sMarkets',
          templateUrl: $UrlPathProvider.admin.state + 'super/markets/list.html',
          data: {
            action: 'list'
          }
        })


          .state('admin.super.markets.view', {
            url: '^/super/markets/view/:market_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/markets/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/markets/view.html',
                resolve: {
                  popupData: function () {
                    return {type: 'market', action: 'view', id: $stateParams.market_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.markets.list');
              });
            }
          })

          .state('admin.super.markets.add', {
            url: '^/super/markets/add',
            templateUrl: $UrlPathProvider.admin.state + 'super/markets/add.html',
            controller: 'SuperMarketsController',
            controllerAs: 'sMarkets',
            data: {
              action: 'add'
            }
          })

          .state('admin.super.markets.edit', {
            url: '^/super/markets/edit/:market_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/markets/edit.html',
            controller: 'SuperMarketsController',
            controllerAs: 'sMarkets',
            data: {
              action: 'edit'
            }
          })

          .state('admin.super.markets.remove', {
            url: '^/super/markets/remove/:market_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/markets/list.html',
            controller: 'SuperMarketsController',
            controllerAs: 'sMarkets',
            data: {
              action: 'list'
            },
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/markets/remove.html',
                resolve: {
                  popupData: function () {
                    return {type: 'market', action: 'remove', id: $stateParams.market_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.markets.list', {} , {reload:true});
              });
            }
          })

        .state('admin.super.cities', {  //cities
          templateUrl: $UrlPathProvider.admin.state + 'super/cities/index.html',
          controller: 'SuperCitiesController',
          controllerAs: 'sCities'
        })

        .state('admin.super.cities.list', {
          url: '^/super/cities',
          templateUrl: $UrlPathProvider.admin.state + 'super/cities/list.html'
        })

          .state('admin.super.cities.add', {
            url: '^/super/cities/add',
            templateUrl: $UrlPathProvider.admin.state + 'super/cities/list.html',
            onEnter: function($state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl : $UrlPathProvider.admin.state + 'super/cities/add.html',
                resolve: {
                  popupData: function() {
                    return {type: 'city', action: 'add'};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.cities.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.cities.edit', {
            url: '^/super/cities/edit/:city_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/cities/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/cities/edit.html',
                resolve: {
                  popupData: function () {
                    return {type: 'city', action: 'edit', id: $stateParams.city_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.cities.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.cities.remove', {
            url: '^/super/cities/remove/:city_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/cities/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/cities/remove.html',
                resolve: {
                  popupData: function () {
                    return {type: 'city', action: 'remove', id: $stateParams.city_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.cities.list', {} , {reload:true});
              });
            }
          })

        .state('admin.super.regions', { //regions
          templateUrl: $UrlPathProvider.admin.state + 'super/regions/index.html',
          controller: 'SuperRegionsController',
          controllerAs: 'sRegions'
        })

        .state('admin.super.regions.list', {
          url: '^/super/regions',
          templateUrl: $UrlPathProvider.admin.state + 'super/regions/list.html'
        })

          .state('admin.super.regions.add', {
            url: '^/super/regions/add',
            templateUrl: $UrlPathProvider.admin.state + 'super/regions/list.html',
            onEnter: function($state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl : $UrlPathProvider.admin.state + 'super/regions/add.html',
                resolve: {
                  popupData: function() {
                    return {type: 'region', action: 'add'};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.regions.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.regions.edit', {
            url: '^/super/regions/edit/:region_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/regions/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/regions/edit.html',
                resolve: {
                  popupData: function () {
                    return {type: 'region', action: 'edit', id: $stateParams.region_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.regions.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.regions.remove', {
            url: '^/super/regions/remove/:region_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/regions/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/regions/remove.html',
                resolve: {
                  popupData: function () {
                    return {type: 'region', action: 'remove', id: $stateParams.region_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.regions.list', {} , {reload:true});
              });
            }
          })

        .state('admin.super.directors', { //directors
          templateUrl: $UrlPathProvider.admin.state + 'super/directors/index.html',
          controller: 'SuperDirectorsController',
          controllerAs: 'sDirectors'
        })
          .state('admin.super.directors.list', {
            url: '^/super/directors',
            templateUrl: $UrlPathProvider.admin.state + 'super/directors/list.html'
          })

          .state('admin.super.directors.add', {
            url: '^/super/directors/add',
            templateUrl: $UrlPathProvider.admin.state + 'super/directors/list.html',
            onEnter: function($state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl : $UrlPathProvider.admin.state + 'super/directors/add.html',
                resolve: {
                  popupData: function() {
                    return {type: 'director', action: 'add'};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.directors.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.directors.edit', {
            url: '^/super/directors/edit/:director_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/directors/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/directors/edit.html',
                resolve: {
                  popupData: function () {
                    return {type: 'director', action: 'edit', id: $stateParams.director_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.directors.list', {} , {reload:true});
              });
            }
          })

          .state('admin.super.directors.remove', {
            url: '^/super/directors/remove/:director_id',
            templateUrl: $UrlPathProvider.admin.state + 'super/directors/list.html',
            onEnter: function($stateParams, $state, $uibModal) {
              $uibModal.open({
                controller: 'PopupController',
                controllerAs: 'popup',
                templateUrl: $UrlPathProvider.admin.state + 'super/directors/remove.html',
                resolve: {
                  popupData: function () {
                    return {type: 'director', action: 'remove', id: $stateParams.director_id};
                  }
                }
              }).result.finally(function () {
                $state.go('admin.super.directors.list', {} , {reload:true});
              });
            }
          });

    $urlRouterProvider.otherwise('/');
  }

})();
