angular.controller('createCampaignCtrl', function($scope, $state, Campaign) {
  
  $scope.campaign = {
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

  $scope.test = function(){
    console.log('hi');
  };


  $scope.createCampaign = function(){
    console.log('click');
    // $scope.campaign = 'yes';
    // $location.path('#/success');
    // $state.go('campaignSuccessPage');
  };

  //createCampaign();
})
