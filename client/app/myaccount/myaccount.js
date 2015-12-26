'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myaccount', {
        url: '/myaccount',
        templateUrl: 'app/myaccount/myaccount.html',
        controller: 'MyaccountCtrl'
      })
      .state('following', {
        url: '/following',
        templateUrl: 'app/myaccount/following.html',
        controller: 'MyaccountCtrl'
      })
       .state('contributed', {
        url: '/contributed',
        templateUrl: 'app/myaccount/contributed.html',
        controller: 'MyaccountCtrl'
      });
  });
