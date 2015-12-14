'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])
  .controller('CampaignProfileController', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
    $scope.campaign = {};
    $scope.donated = '';
    $http.get('/api/campaigns/' + $stateParams.id)
      .success(function(data) {
        $scope.campaign = data;
        // console.log(data.contributors);

        var amounts = _.pluck(data.contributors, 'amount')
          // console.log(amounts)

        $scope.donated = _.reduce(amounts, function(total, n) {
          return total + n;
        });
        //  console.log($scope.donated)
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  }]);
