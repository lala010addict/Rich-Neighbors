angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider
        
    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login.html',
      controller: 'loginCtrl'
    })
          
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/account/signup.html',
      controller: 'signupCtrl'
    })
         
    // tab controller states
    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'components/tabsController.html'
    })

    .state('tabsController.home', {
      url: '/home',
      views: {
        'tab8': {
          templateUrl: 'app/main/home.html',
          controller: 'homeCtrl'
        }
      }
    })
         
    .state('tabsController.myCampaigns', {
      url: '/mycampaign',
      views: {
        'tab9': {
          templateUrl: 'app/campaign/myCampaigns.html',
          controller: 'myCampaignsCtrl'
        }
      }
    })
          
    .state('tabsController.createCampaign', {
      url: '/startcampaign',
      views: {
        'tab10': {
          templateUrl: 'app/campaign/createCampaign.html',
          controller: 'createCampaignCtrl'
        }
      }
    })

    .state('tabsController.campaignProfile', {
      url: '/campignid',
      views: {
        'tab12': {
          templateUrl: 'app/campaign/campaignProfile.html',
          controller: 'campaignProfileCtrl'
        }
      }
    })
         
    .state('tabsController.myAccount', {
      url: '/userAccount',
      views: {
        'tab11': {
          templateUrl: 'app/account/myAccount.html',
          controller: 'myAccountCtrl'
        }
      }
    })
         
    .state('campaignSuccessPage', {
      url: '/success',
      templateUrl: 'app/campaign/campaignSuccessPage.html',
      controller: 'campaignSuccessPageCtrl'
    })
              
    .state('supplyList', {
      url: '/supplylist',
      templateUrl: 'components/supplyList.html',
      controller: 'supplyListCtrl'
    })
        
    .state('volunteer', {
      url: '/volunteer',
      templateUrl: 'components/volunteer.html',
      controller: 'volunteerCtrl'
    })
        
    .state('donateMoney', {
      url: '/donatemoney',
      templateUrl: 'components/donateMoney.html',
      controller: 'donateMoneyCtrl'
    })
          
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});