'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('updateCampaign', {
        url: '/updateCampaign',
        templateUrl: 'app/updateCampaign/updateCampaign.html',
        controller: 'UpdateCampaignCtrl'
      });
  });
