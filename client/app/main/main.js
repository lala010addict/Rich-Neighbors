'use strict';

angular.module('bApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('campaignProfile', {
        url: '/campaignProfile/:id',
        templateUrl: 'app/campaignProfile/campaignProfile.html',
        controller: 'CampaignProfileController',
        //controllerAs: 'campaignProfile'
      })

  })
  // .run(['$http', '$rootScope', function($http, $rootScope) {
  //   $rootScope.campaigns = {};
  //   $http.get('/api/campaigns')
  //     .success(function(data) {
  //       $rootScope.campaigns = data;
  //     })
  // }])

// .run(['$http', '$rootScope', function($http, $rootScope) {
//   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//     $rootScope.campaigns = {};
//     $http.get('/api/campaigns')
//       .success(function(data) {
//         $rootScope.campaigns = data;
//       })
//   })
// }])
