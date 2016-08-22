(function() {
  'use strict';

  angular
    .module('helpApp')
    .provider('$UrlPath', function () {

      var urlHomeData = {
        state: "app/common/tmpls/states/",
        dir:   "app/common/tmpls/directives/"
      };
      var urlAdminData = {
        state: "app/components/admin/tmpls/states/",
        dir:   "app/components/admin/tmpls/directives/"

      };

      var config = {home :urlHomeData, admin: urlAdminData};

      return {
        home: urlHomeData,
        admin: urlAdminData,

        set: function (settings) {
            config = settings;
        },
        merge: function (settings) {
            angular.extend(config, settings);
        },
        $get: function () {
            return config;
        }
      };
    });
})();
