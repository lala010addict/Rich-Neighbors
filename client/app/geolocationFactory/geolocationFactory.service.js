'use strict';

angular.module('bApp') 
  .factory('geolocationFactory', function ($http) {
    var getIpInfo = function() {
    var url = 'http://ipinfo.io/json';
      return $http.get(url)
      .success(function(data) {
        var addressDetails = data;
        return addressDetails;
      });
    };
    var getLatandLong = function() {
      getIpInfo()
      .success(function(data) {
        var result = data.loc.split(',');
        console.log(result);
        return result;
      });
    };
    return {
      getLoc: function () {
        return getIpInfo();
      },
      getLatandLong: function() {
        return getLatandLong();
      }
    };
  })
  .factory('generalFactory', function () {
    var campaignId = '';
    var setCampaignId = function(id) {
      console.log('currentCampId = ', campaignId);
      campaignId = id;
      console.log('it has now been changed to = ', campaignId);
    };
    var getCampaignId = function() {
      console.log('from the get: ', campaignId);
      return campaignId;
    };
    return {
      getCampaignId: getCampaignId,
      setCampaignId: setCampaignId
    };
  });
