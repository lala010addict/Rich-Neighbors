'use strict';

angular.module('bApp', [
    'bApp.auth',
    'bApp.admin',
    'bApp.donate',
    'bApp.geolocation',
    'bApp.MainController',
    'bApp.CampaignProfileController',
    'bApp.SubmitCampaignsSuccessCtrl',
    'bApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'braintree-angular',
    'validation.match',
    'bApp.StartCampaignController'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
