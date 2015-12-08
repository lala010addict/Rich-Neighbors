angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('tabsController.home', {
      url: '/home',
      views: {
        'tab8': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.myCampaigns', {
      url: '/mycampaign',
      views: {
        'tab9': {
          templateUrl: 'templates/myCampaigns.html',
          controller: 'myCampaignsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.createCampaign', {
      url: '/startcampaign',
      views: {
        'tab10': {
          templateUrl: 'templates/createCampaign.html',
          controller: 'createCampaignCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('campaignSuccessPage', {
      url: '/success',
      templateUrl: 'templates/campaignSuccessPage.html',
      controller: 'campaignSuccessPageCtrl'
    })
        
      
    
      
        
    .state('tabsController.campaignProfile', {
      url: '/campignid',
      views: {
        'tab12': {
          templateUrl: 'templates/campaignProfile.html',
          controller: 'campaignProfileCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.myAccount', {
      url: '/userAccount',
      views: {
        'tab11': {
          templateUrl: 'templates/myAccount.html',
          controller: 'myAccountCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});