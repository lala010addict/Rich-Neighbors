'use strict';

angular.module('bApp.SubmitCampaignsSuccessCtrl', [])
  .controller('SubmitCampaignsSuccessCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/campaigns/')
      .success(function(data) {
        $scope.id = _.last(data)._id
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }]);
