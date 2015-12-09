'use strict';

angular.module('bApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('campaignProfile', {
        url: '/campaignProfile',
        templateUrl: 'app/campaignProfile/campaignProfile.html',
        controller: 'CampaignProfileController',
        controllerAs: 'campaignProfile'
      });
  });
