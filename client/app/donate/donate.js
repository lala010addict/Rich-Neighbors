'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('donate', {
        url: '/donate',
        templateUrl: 'app/donate/donate.html',
        controller: 'DonateCtrl'
      });
  });
