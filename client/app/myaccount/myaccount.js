'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myaccount', {
        url: '/myaccount',
        templateUrl: 'app/myaccount/myaccount.html', // change to
        controller: 'MyaccountCtrl'
      })
      .state('following', {
        url: '/following',
        templateUrl: 'app/following/following.html',
        controller: 'MyaccountCtrl'
      })
       .state('contributed', {
        url: '/contributed',
        templateUrl: 'app/contributed/contributed.html',
        controller: 'MyaccountCtrl'
      });
  });
