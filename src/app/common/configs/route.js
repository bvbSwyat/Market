(function() {
  'use strict';

  angular
    .module('ngApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $UrlPathProvider) {

      $urlRouterProvider.when('/region/:region_id/city/:city_id/market/:market_id', '/region/:region_id/city/:city_id/market/:market_id/offers');
      $urlRouterProvider.when('/region/:region_id/city/:city_id/market/:market_id/', '/region/:region_id/city/:city_id/market/:market_id/offers');
      $urlRouterProvider.when('/region/:region_id/city/:city_id/market', '/region/:region_id/city/:city_id');
      $urlRouterProvider.when('/region/:region_id/city/:city_id/market/', '/region/:region_id/city/:city_id');
      $urlRouterProvider.when('/region/:region_id/city/:city_id/', '/region/:region_id/city/:city_id');
      $urlRouterProvider.when('/', '/start');

      $stateProvider
      .state('home', {
        url: '/',
        views: {
          'header': {
              controller: 'HomeHeaderController',
              controllerAs: 'headerCtrl',
              templateUrl: $UrlPathProvider.home.state + 'home.header.html'
          },
          'content': {
              // controller: 'HomeContentController as homec',
              templateUrl: $UrlPathProvider.home.state + 'home.content.html'
          },
          'footer': {
              templateUrl: $UrlPathProvider.home.state + 'home.footer.html'
          }
        }
      })
        .state('home.start', {
          url: '^/start',
          views: {
              'mainContent': {
                  controller: 'HomeHeaderController',
                  controllerAs: 'headerCtrl',
                  templateUrl: $UrlPathProvider.home.state + 'start.content.html'
              }
          }
        })
        .state('home.city', {
            url: '^/region/:region_id/city/:city_id',
            views: {
                'title': {
                    controller: 'HomeTitleController as title',
                    resolve: {
                        type: function () {
                            return 'city';
                        }
                    },
                    templateUrl: $UrlPathProvider.home.state + 'home.title.html'
                },
                'mainContent': {
                    controller: 'CityContentController',
                    controllerAs: 'cityCtrl',
                    templateUrl: $UrlPathProvider.home.state + 'city.content.html'
                }
            }
        })
        .state('home.market-details', {
            url: '^/region/:region_id/city/:city_id/market/:market_id/details',
            controller: 'cityController',
            controllerAs: 'rCtrl',
            views: {
                'title': {
                    controller: 'HomeTitleController as title',
                    resolve: {
                        type: function () {
                            return 'details';
                        }
                    },
                    templateUrl: $UrlPathProvider.home.state + 'home.title.html'
                },
                'mainContent': {
                    controller: 'DetailsContentController as detailsCtrl',
                    templateUrl: $UrlPathProvider.home.state + 'market.details.content.html'
                }
            }
        })
        .state('home.market-offers', {
            url: '^/region/:region_id/city/:city_id/market/:market_id/offers',
            views: {
                'title': {
                    controller: 'HomeTitleController as title',
                    resolve: {
                        type: function () {
                            return 'offers';
                        }
                    },
                    templateUrl: $UrlPathProvider.home.state + 'home.title.html'
                },
                'mainContent': {
                    controller: 'OffersContentController as homec',
                    templateUrl: $UrlPathProvider.home.state + 'market.offers.content.html'
                }
            }
        })
        .state('home.offer', {
          url: '^/region/:region_id/city/:city_id/market/:market_id/offer/:offer_id',
          views: {
              'mainContent': {
                  controller: 'OfferController as offerCtrl',
                  templateUrl: $UrlPathProvider.home.state + 'offer.html'
              }
          }
        })

        .state('home.seller', {
            url: '^/seller/:seller_id',
            views: {
                'mainContent': {
                    controller: 'SellerController as sellerCtrl',
                    templateUrl: $UrlPathProvider.home.state + 'seller.html'
                }
            }
        })

        .state('sign_up', {
          url: '^/sign_up',
          views: {
            'header': {
                templateUrl: $UrlPathProvider.home.state + 'home.header.html'
            },
            'content': {
                templateUrl: $UrlPathProvider.home.state + 'reg.content.html'
            },
            'footer': {
                templateUrl: $UrlPathProvider.home.state + 'home.footer.html'
            }
          }
        })

    $urlRouterProvider.otherwise('/');
  }

})();
