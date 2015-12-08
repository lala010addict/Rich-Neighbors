angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('homeCtrl', function($scope) {
  $scope.campaigns = [{
    src: 'https://2dbdd5116ffa30a49aa8-c03f075f8191fb4e60e74b907071aee8.ssl.cf1.rackcdn.com/4778089_1433774326.3911.jpg',
    title: 'Clarence Thomas Center',
    location: 'LeanardTown, MD',
    raised: 2415,
    total: 10000,
    donationCount: 35,
    topDonations: [{amount:200, name: "Jennifer Raley"}, {amount:100, name: "Samson McNair"},{amount:400, name: "Ben Cumberbun"}],
    description: "'Renee & Clarence Thomas learned a little over a month ago he had Leukemia.  He has worked as a contractor for the last 27 years, therefore, when he doesn't work; he doesn't get paid.  She had changed jobs just a few months ago, therefore, she does not have leave.  She has worked when she could, but has needed to be with her husband during some treatments and procedures.  These take place at Holy Cross Hospital which is also an added expense.  Keep Clarence, Renee and their two boys in your prayers.  Thank you, Donna Miller If you prefer a check or cash donation, I would be happy to collect and deliver.'"
  }];

})
   
.controller('myCampaignsCtrl', function($scope) {

})
   
.controller('createCampaignCtrl', function($scope) {

})
      
.controller('campaignSuccessPageCtrl', function($scope) {

})
   
.controller('campaignProfileCtrl', function($scope) {
  $scope.camps = [{
    src: 'https://2dbdd5116ffa30a49aa8-c03f075f8191fb4e60e74b907071aee8.ssl.cf1.rackcdn.com/4778089_1433774326.3911.jpg',
    title: 'Clarence Thomas Center',
    location: 'LeanardTown, MD',
    raised: 2415,
    total: 10000,
    donationCount: 35,
    topDonations: [{amount:200, name: "Jennifer Raley"}, {amount:100, name: "Samson McNair"},{amount:400, name: "Ben Cumberbun"}],
    description: "'Renee & Clarence Thomas learned a little over a month ago he had Leukemia.  He has worked as a contractor for the last 27 years, therefore, when he doesn't work; he doesn't get paid.  She had changed jobs just a few months ago, therefore, she does not have leave.  She has worked when she could, but has needed to be with her husband during some treatments and procedures.  These take place at Holy Cross Hospital which is also an added expense.  Keep Clarence, Renee and their two boys in your prayers.  Thank you, Donna Miller If you prefer a check or cash donation, I would be happy to collect and deliver.'"
  }];
})
   
.controller('myAccountCtrl', function($scope) {

});
 