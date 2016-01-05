'use strict';

angular.module('bApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'MainController'
      })
      .state('campaignProfile', {
        url: '/campaignProfile/:id',
        templateUrl: 'app/campaignProfile/campaignProfile.html',
        controller: 'CampaignProfileController',
        //controllerAs: 'campaignProfile'
      });
  })
