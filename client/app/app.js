'use strict';

angular.module('bApp', [
<<<<<<< HEAD
    'bApp.auth',
    'bApp.admin',
    'bApp.geolocation',
    // 'bApp.campaignProfile',
    'bApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'validation.match'
  ])
=======
  'bApp.auth',
  'bApp.admin',
  // 'bApp.campaignProfile',
  'bApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'validation.match'
])
>>>>>>> 96853e0054fbd533474303c8a802260a6aab9549
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
