'use strict';

angular.module('bApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('startCampaign', {
        url: '/startCampaign',
        templateUrl: 'app/startCampaign/startCampaign.html',
        controller: 'StartCampaignController',
        controllerAs: 'startCampaign'
      });
  });
