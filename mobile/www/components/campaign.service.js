angular.module('app.services', [])

.factory('Campaign', ['$http', function($http) {



  var campaigns = [];

  var createCampaign = function(newCampaign) {
    campaigns.push(newCampaign);
  };

  var getCampaigns = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:9000/api/campaigns/',
      dataType: 'jsonp',
    }).then(function successCallback(response) {
      return response.data;
    }, function errorCallback(response) {
      //handle error
    });
  };

  // initial load of campaigns
  getCampaigns().then(function(data) {
    campaigns = data;
  });


  return {
    campaigns: campaigns,
    createCampaign: createCampaign, 
    getCampaigns: getCampaigns
  };

}]);
