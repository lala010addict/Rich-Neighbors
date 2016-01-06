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
    'ui.router',
    'braintree-angular',
    'validation.match',
    'ngFileUpload',
    'bApp.StartCampaignController'
  ])
//   .run(function($rootScope, $document) {
//     $rootScope.$on('$viewContentLoaded', function () {
//         $($document).foundation();
//     });
// })
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
