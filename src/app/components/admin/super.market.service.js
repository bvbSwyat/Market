(function() {
  'use strict';


  angular
    .module('adminApp')
    .factory('MarketModel', MarketModel);

  /** @ngInject */
  function MarketModel($log, RestService, $state, toastr) {
    return function(initMarketData, isEditAction) {
      var marketObj = angular.isDefined(initMarketData) ? initMarketData : {};

      function _constructTime(isInit) {
        function getTime() {
          return {
            from_h: undefined,
            to_h: undefined,
            from_m: undefined,
            to_m: undefined,
            monday: undefined,
            tuesday: undefined,
            wednesday: undefined,
            thursday: undefined,
            friday: undefined,
            saturday: undefined,
            sunday: undefined,
            id: Math.random().toString(16).slice(2)
          };
        }
        if (isInit && !initMarketData) {
          return [getTime()];
        } else {
          if (initMarketData) {
            var timeArray = [];
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            angular.forEach(days, function(day) {
              var fromDayTime = initMarketData[day + '_from'];
              var toDayTime = initMarketData[day + '_to'];
              var defaultPairTime = "00:00:00:00:00:00";
              if (angular.isDefined(toDayTime) && angular.isDefined(fromDayTime)) {
                var pairTime = fromDayTime +':'+ toDayTime;
                if (pairTime != defaultPairTime) {
                  var timeIndex = _alreadySetedTimeIndex(timeArray, pairTime);

                  if (angular.isDefined(timeIndex)) {
                    timeArray[timeIndex][day] = true;
                  } else {
                    timeArray.push(getTime());
                    var splited = _splitTime(pairTime);
                    timeArray[timeArray.length - 1].from_h = splited[0];
                    timeArray[timeArray.length - 1].from_m = splited[1];
                    timeArray[timeArray.length - 1].to_h = splited[3];
                    timeArray[timeArray.length - 1].to_m = splited[4];
                    timeArray[timeArray.length - 1][day] = true;
                  }
                }
              }
            });
            return timeArray.length == 0 && isEditAction ? [getTime()] : timeArray;
          }
        }
      }

      function _splitTime(strToSplit) {
        var splitedArray = strToSplit.split(':');
        if (splitedArray.length != 6) {
          throw new Error ('Spliting data crashed!');
        }
        return splitedArray;
      }

      function _alreadySetedTimeIndex(timeArray, pairTime) {
        var timeSeparator = ":";
        var foundIndex = undefined;
        angular.forEach(timeArray, function(time, timeIndex) {
          var fromTime = time.from_h + timeSeparator + time.from_m + timeSeparator + "00";
          var toTime = time.to_h + timeSeparator + time.to_m + timeSeparator + "00";
          if (fromTime + timeSeparator + toTime == pairTime) {
            return foundIndex = timeIndex;
          }
        });
        return foundIndex;
      }

      var _construct = function(tomarketObj) {

        angular.forEach(tomarketObj.time, function(value) {
          var fromHField = value.from_h;
          var fromMField = value.from_m;
          var toHField = value.to_h;
          var toMField = value.to_m;

          if (angular.isDefined(fromHField) && angular.isDefined(fromMField)) {
            var fromTime = fromHField+':'+ fromMField + ":00";
            _setTime(value, 'monday', fromTime, tomarketObj, true);
            _setTime(value, 'tuesday', fromTime, tomarketObj, true);
            _setTime(value, 'wednesday', fromTime, tomarketObj, true);
            _setTime(value, 'thursday', fromTime, tomarketObj, true);
            _setTime(value, 'friday', fromTime, tomarketObj, true);
            _setTime(value, 'saturday', fromTime, tomarketObj, true);
            _setTime(value, 'sunday', fromTime, tomarketObj, true);
          }
          if (angular.isDefined(toHField) && angular.isDefined(toMField)) {
            var toTime = toHField+':'+ toMField + ":00";
            _setTime(value, 'monday', toTime, tomarketObj);
            _setTime(value, 'tuesday', toTime, tomarketObj);
            _setTime(value, 'wednesday', toTime, tomarketObj);
            _setTime(value, 'thursday', toTime, tomarketObj);
            _setTime(value, 'friday', toTime, tomarketObj);
            _setTime(value, 'saturday', toTime, tomarketObj);
            _setTime(value, 'sunday', toTime, tomarketObj);
          }
        });
        tomarketObj.city_id = angular.isDefined(tomarketObj.city)
          ? tomarketObj.city.id
          : toastr.error("You can\'t add market with no city data! Please, add at least 1 city.");
        tomarketObj.region_id = angular.isDefined(tomarketObj.city)
          ? tomarketObj.city.region_id
          : toastr.error("You can\'t add market with no city data! Please, add at least 1 city.");
        tomarketObj.user_id = angular.isDefined(tomarketObj.director) ? tomarketObj.director.id : undefined;
        tomarketObj.photo = angular.isDefined(tomarketObj.newPhoto) ? tomarketObj.newPhoto.base64 : undefined;
        var constructed = angular.copy(tomarketObj);
        return constructed;
      }

      var _setTime = function(dayObj, dayName, newTime, timeField,  isFrom) {
        var prevTime = dayName + (isFrom ? '_from' : '_to');
          if (dayObj[dayName] == true) {
            timeField[prevTime] = newTime;
          }
      }
      return {
        title: marketObj.title || "",
        description: marketObj.description || "",
        photo: marketObj.photo || "",
        phone: marketObj.phone || "",
        email: marketObj.email || "",
        address: marketObj.address || "",
        latitude: marketObj.latitude || "",
        longitude: marketObj.longitude || "",

        group_facebook: marketObj.group_facebook || "",
        group_instagram: marketObj.group_instagram || "",
        group_linkedin: marketObj.group_linkedin || "",

        id: marketObj.id || undefined,
        user_id: marketObj.user_id || undefined,
        city_id: marketObj.city_id || undefined,
        region_id: marketObj.region_id || undefined,

        schedule_exception: marketObj.schedule_exception || undefined,

        monday_from: marketObj.monday_from || undefined,
        monday_to: marketObj.monday_to || undefined,
        tuesday_from: marketObj.tuesday_from || undefined,
        tuesday_to: marketObj.tuesday_to || undefined,
        wednesday_from: marketObj.wednesday_from || undefined,
        wednesday_to: marketObj.wednesday_to || undefined,
        thursday_from: marketObj.thursday_from || undefined,
        thursday_to: marketObj.thursday_to || undefined,
        friday_from: marketObj.friday_from || undefined,
        friday_to: marketObj.friday_to || undefined,
        saturday_from: marketObj.saturday_from || undefined,
        saturday_to: marketObj.saturday_to || undefined,
        sunday_from: marketObj.sunday_from || undefined,
        sunday_to: marketObj.sunday_to || undefined,

        time: angular.isUndefined(marketObj) ? [_constructTime(true)] : _constructTime(true),

        save: function(marketId) {
          var vm = this;
          var iseEditAction = angular.isDefined(marketId);
          var addNewFunc = iseEditAction ? 'putMarket' : 'postMarket';
          if (vm.address == "") {
            toastr.error("You can\'t add market with no address data! Please, fill it!");
          }
          if (vm.latitude == "" || vm.longitude == "") {
            toastr.error("You can\'t add market with not correct address! Please, change it!");
          }
          RestService[addNewFunc](marketId, _construct(this)).then(function(data) {
            if(angular.isDefined(vm.schedule_exception) && vm.schedule_exception.isChange){

              var scheduleRequest = angular.isDefined(vm.schedule_exception.market_id)
                  ? 'postMarketsSchedulesExceptions' : 'putMarketsSchedulesExceptions';
              vm.schedule_exception.market_id = data.id;
              RestService[scheduleRequest](vm.schedule_exception).then(function () {
                toastr.success('Save successful!');
                $state.go('admin.super.markets.list', {} , {reload:true});
              });

            } else {
              toastr.success('Save successful!');
              $state.go('admin.super.markets.list', {} , {reload:true});
            }

          }, function(response) {
            if (Object.keys(response.data.errors).length > 0) {
              var errors = "";
              angular.forEach(response.data.errors, function(error) {
                errors += error[0];
              })
             toastr.error(errors, 'Error!');
            }
          });
        },

        addDayLine: function() {
          //time.id = Math.random().toString(16).slice(2);
          this.time.push(angular.copy(_constructTime(true)));
        },

        removeLine: function(lineIndex) {
          this.time.splice(lineIndex, 1);
        },

        updateLocation: function(address) {
          var vm = this;
          RestService.getLocationByAddress(address).then(function(data) {
            if (angular.isUndefined(data.results[0])) {
              toastr.warning('Address is not correct!. Please choose another one.');
              vm.latitude = "";
              vm.longitude = "";
              return;
            }

            vm.latitude = data.results[0].geometry.location.lat;
            vm.longitude = data.results[0].geometry.location.lng;

          }, function() {
            toastr.warning('Address is bad!. Please choose another one.');
          });
        }
      }
    };
  }
})();
