angular.controller('campaignSuccessPageCtrl', function($scope, newCampaign) {
	$scope.campaign = newCampaign;
	console.log($scope.campaign);
})