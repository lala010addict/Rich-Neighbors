angular.module('app').controller('homeCtrl', function($scope, $http, Campaign) {
  Campaign.getCampaigns().then(function(data){
    $scope.items = data;
  });
}); 