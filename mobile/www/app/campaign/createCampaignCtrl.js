angular.controller('createCampaignCtrl', function($scope, Campaign) {
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

})
