'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('updateCampaignsSuccess', {
        url: '/updateCampaignsSuccess/:id',
        templateUrl: 'app/updateCampaignsSuccess/updateCampaignsSuccess.html',
        controller: 'UpdateCampaignsSuccessCtrl'
      });
  });
