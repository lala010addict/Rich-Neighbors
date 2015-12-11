angular.module('app').controller('campaignSuccessPageCtrl', function($scope, Campaign) {
	$scope.campaign = Campaign.newCampaign;
	console.log($scope.campaign);
	console.log('hi');
	$scope.test = 'hi';
});