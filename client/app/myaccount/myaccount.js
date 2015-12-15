'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myaccount', {
        url: '/myaccount',
        templateUrl: 'app/myaccount/myaccount.html',
        controller: 'MyaccountCtrl'
      });
  });
