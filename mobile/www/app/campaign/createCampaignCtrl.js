angular.module('app').controller('createCampaignCtrl', function($scope, $state, Campaign) {
  
  Campaign.newCampaign = {
    id: '',
    date:  '',
    title: '',
    total: '',
    raised: '0',
    description: '',
    images: '',
    ip_address: '',
    supplies: '',
    volunteer: '',
    latitude: '',
    longitude: ''
  };
  $scope.campaign = Campaign.newCampaign;

  $scope.test = function(){
    console.log('save campaign');
  };


  $scope.createCampaign = function(){
    console.log('click');
    // $scope.campaign = 'yes';
    // $location.path('#/success');
    // $state.go('campaignSuccessPage');
  };

  //createCampaign();
});
