angular.module('app').controller('createCampaignCtrl', function($scope, $state, Campaign) {
  
  $scope.newCampaign = {
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

  $scope.createCampaign = function(){
    Campaign.createCampaign(newCampaign);
    console.log('campaign saved');
  };

  //createCampaign();
});
