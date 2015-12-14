'use strict';

angular.module('bApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('startCampaign', {
        url: '/startCampaign',
        templateUrl: 'app/startCampaign/startCampaign.html',
        controller: 'StartCampaignController',
        controllerAs: 'startCampaign'
      });
  })
//  .run(function($rootScope) {
//     $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
   
//         next.referrer = current.id;
//         console.log(current.id)
      
//     })
// })