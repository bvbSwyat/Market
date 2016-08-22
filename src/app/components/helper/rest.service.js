(function() {
  'use strict';


  angular
    .module('helpApp')
    .factory('RestService', RestService);

  /** @ngInject */
  function RestService(Restangular, API_URL, GOOGLE_KEY) {
    var LoginedRest  = Restangular.withConfig(function (RestangularConfigurer) {
       // RestangularConfigurer.setJsonp(true);
        //RestangularProvider.setDefaultHttpFields({cache: true});
       RestangularConfigurer.setDefaultHeaders({ 'Token': localStorage.getItem('token') });
    });


    var service = {
      getOffers: function (params) {
            return Restangular.oneUrl("offers", API_URL + 'offers' + params).get();
      },

      postMarketsSchedulesExceptions: function (data) {
          return LoginedRest.oneUrl("exceptions", API_URL + 'market-schedules-exceptions')
              .customPOST(data);
      },

      getMarketsSchedulesExceptions: function (params) {
          return Restangular.oneUrl("exceptions", API_URL + 'market-schedules-exceptions' + params).get();
      },

      getOffer: function (offerId) {
          return Restangular.oneUrl("offers", API_URL + 'offers/' + offerId).get();
      },

      getSellers: function (params) {
          return Restangular.oneUrl("offers", API_URL + 'sellers' + params).get();
      },

      getSeller: function (sellerId) {
          return Restangular.oneUrl("offers", API_URL + 'sellers/' + sellerId).get();
      },

      getMarkets : function (params) {
            return Restangular.oneUrl("markets", API_URL + 'markets' + params).get();
      },
      getMarket : function (marketId) {
            return Restangular.oneUrl("markets", API_URL + 'markets/' + marketId).get();
      },

      putMarket : function (marketId, marketObj) {
         return LoginedRest.oneUrl("markets", API_URL + 'markets/' + marketId)
               .customPUT(marketObj);
      },

      postMarket: function (e, marketObj) {
         return LoginedRest.oneUrl("markets", API_URL + 'markets')
               .customPOST(marketObj);
      },

      removeMarket : function (marketId) {
            return LoginedRest.oneUrl("markets", API_URL + 'markets/' + marketId).remove();
      },

      getCities : function (params) {
            return Restangular.oneUrl("cities", API_URL + 'cities' + (params ? params : '')).get();
      },
      getCity : function (cityId) {
            return Restangular.oneUrl("cities", API_URL + 'cities/' + cityId).get();
      },

      putCity : function (cityId, title, regionId, photo) {
         return LoginedRest.oneUrl("cities", API_URL + 'cities/' + cityId)
               .customPUT({title: title, region_id: regionId, photo: photo});
      },

      postCity : function (title, regionId, photo) {
         return LoginedRest.oneUrl("cities", API_URL + 'cities')
               .customPOST({title: title, region_id: regionId, photo: photo});
      },

      removeCity : function (cityId) {
            return LoginedRest.oneUrl("cities", API_URL + 'cities/' + cityId).remove();
      },


      getRegions : function (params) {
            return Restangular.oneUrl("regions", API_URL + 'regions'+ (params ? params : '')).get();
      },
      getRegion : function (regionId) {
            return Restangular.oneUrl("regions", API_URL + 'regions/' + regionId).get();
      },

      putRegion : function (regionId, title) {
         return LoginedRest.oneUrl("regions", API_URL + 'regions/' + regionId)
               .customPUT({title: title});
      },

      postRegion : function (title) {
         return LoginedRest.oneUrl("regions", API_URL + 'regions')
               .customPOST({title: title});
      },

      removeRegion : function (regionId) {
            return LoginedRest.oneUrl("regions", API_URL + 'regions/' + regionId).remove();
      },

      getDirectors : function () {
          return LoginedRest.oneUrl("directors", API_URL + 'users?role_id=3').get();
      },

      getDirector : function (directorId) {
        return LoginedRest.oneUrl("directors", API_URL + 'users/' + directorId).get();
      },

      putDirector : function (directorId, username, email, phone) {
        return LoginedRest.oneUrl("directors", API_URL + 'users/' + directorId)
            .customPUT({id: directorId, username: username, email: email, phone: phone});
      },

      postDirector : function (username, email, password, phone) {
        return LoginedRest.oneUrl("directors", API_URL + 'users')
            .customPOST({username: username, email: email, password: password, phone: phone, role_id: 3});
      },

      removeDirector : function (directorId) {
        return LoginedRest.oneUrl("cities", API_URL + 'users/' + directorId).remove();
      },

      getLocationByAddress: function (address) {
        var keyQuery = '&key=' + GOOGLE_KEY;
        return Restangular.oneUrl("markets", 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + keyQuery).get();
      }
    };

    return service;
  }
})();
