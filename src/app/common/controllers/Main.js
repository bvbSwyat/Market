/* global $ */
(function() {
  'use strict';

  angular
    .module('ngApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, $log, $rootScope, API_URL, $state) {

    $log.log('Main CTRL');

    /**
       * @function $rootScope.getObj - finding and returning object by property and value
       *
       * @param myObjects - array for searching in
       * @param prop - object property for searching
       * @param value - object value for searching
       * @param toLowerCase - if is defined - matching by lower case
       * @returns {number} count - count of matches
       */
      $rootScope.getObj = function (myObjects, prop, value, toLowerCase) {
          var obj = $.grep(myObjects, function (val) {
              if (toLowerCase) {
                  return val[prop].toLowerCase() == value.toLowerCase();
              }
              return val[prop] == value;
          });
          return obj[0];
      }

    /**
       * @function $rootScope.getObjs - finding and returning object by property and value
       *
       * @param myObjects - array for searching in
       * @param prop - object property for searching
       * @param value - object value for searching
       * @param toLowerCase - if is defined - matching by lower case
       * @returns {number} count - count of matches
       */
      $rootScope.getObjs = function (myObjects, prop, value, toLowerCase) {
          var obj = $.grep(myObjects, function (val) {
              if (toLowerCase) {
                  return val[prop].toLowerCase() == value.toLowerCase();
              }
              return val[prop] == value;
          });
          return obj;
      }

      Array.prototype.Xpad = function() {
          var array = this;
          var output = $.map(array, function (val) {
              if (val < 10) {
                return "0" + val;
              }
              return val.toString();
          });
        return output
      }

    $.post('http://ikganaardemarkt.glooni.com/api_v1/signin',  {email: "admin@gmail.com", password: "admin"}, function( data ) {
        localStorage.setItem('token', data.result.token);
    });

    ////////////////////////////////////////////////////////////////////////
    ///////////////////////delete in the future/////////////////////////////
      $rootScope.signIn = function(email, pass) {
        if (email != 'Rlamphen@ziggo.nl' || pass != 'admin321') {
          toastr.error('Login is not successful!');
          return;
        }
        $.post(API_URL + 'signin',  {email: "Rlamphen@ziggo.nl", password: "admin321"}, function( data ) {
          localStorage.setItem('token', data.result.token);
          toastr.success('Login successful!');
          $state.go('admin.super');
        });
      }


    ////////////////////////////////////////////////////////////////////////

  }
})();
