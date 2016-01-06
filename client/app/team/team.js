'use strict';

angular.module('bApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('team', {
        url: '/team',
        templateUrl: 'app/team/team.html',
        controller: 'TeamCtrl'
      });
  });
