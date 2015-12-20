'use strict';

angular.module('bApp')
  .factory('geolocationFactory', function ($http) {
    // Service logic
    // ...

    var getIpInfo = function() {
    var url = 'http://ipinfo.io/json';
      return $http.get(url)
      .success(function(data) {
        var addressDetails = data;
        console.log(data);
        return addressDetails;
      });
    };

    var getCityandState = function() {
      getIpInfo()
      .success(function(data) {
        var result = data.city + ' ' + data.region + ', ' + data.postal;
        console.log(result);
        return result;
      });
    };
    // Public API here
    return {
      getLoc: function () {
        return getIpInfo();
      },
      getCityandState: function() {
        return getCityandState();
      }
    };
  });
