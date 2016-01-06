'use strict';

class CampaignService {

  constructor($http) {
    this.http = $http;
  }

  getCampaigns(longitude, latitude, limit, distance) {
    return this.http({
        method: 'GET',
        url: '/api/campaigns',
        params: {
          longitude: longitude || 0,
          latitude: latitude || 0,
          limit: limit || 9,
          distance: distance || 500
        }
      })
      .success(result => result.data);
  }
  getCampaign(campaign) {
    return this.http.get(`/api/campaigns/${campaign}`).success(result => result.data);
  }
  createCampaign(data) {
    return this.http.post('/api/campaigns', data);
  }
  updateCampaign(campaign, data) {
    return this.http.put(`/api/campaigns/${campaign}`, data);
  }
  static factory($http){
    return new CampaignService($http);
  }
}

CampaignService.$inject = ['$http'];

angular.module('bApp')
  .factory('campaignFactory', CampaignService.factory);

