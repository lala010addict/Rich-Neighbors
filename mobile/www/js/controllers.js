angular.module('app.controllers', [])
  
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   

.controller('homeCtrl', function($scope, $http, Campaign) {
  Campaign.getCampaigns().then(function(data){
    $scope.items = data;
  });
})
   
.controller('myCampaignsCtrl', function($scope) {
  $scope.myCampaigns = [];
  $scope.hearts = [];
})
   
      
   
.controller('campaignProfileCtrl_old', function($scope) {
  $scope.description = "Save Thaline's Life";
  $scope.raised = 79417;
  $scope.total = 115000;

})

.controller('myAccountCtrl', function($scope) {

})
   
.controller('supplyListCtrl', function($scope) {

})
   
.controller('volunteerCtrl', function($scope) {

})
   
.controller('donateMoneyCtrl', function($scope) {

});