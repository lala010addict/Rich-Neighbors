'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])
  .controller('CampaignProfileController', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
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


    $http.get('/api/comments/' + $stateParams.id)
      .success(function(data) {
        $scope.comments = data
        console.log(data)
        console.log('comments', $scope.comments)
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.formData = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.formData.user_id = $scope.getCurrentUser()._id;
    $scope.formData.campaign_id = $stateParams.id;
    $scope.formData.text = '';
    // Current comment.
    $scope.comment = {};

    // Array where comments will be.
    $scope.comments = [];

    // Fires when form is submited.
    $scope.addComment = function() {

      $http.post('/api/comments', $scope.formData)
        .success(function(data) {
          console.log(data);


          $http.get('/api/comments/' + $stateParams.id)
            .success(function(data) {
              $scope.comments = data
              console.log(data)
              console.log('comments', $scope.comments)
            })
            .error(function(data) {
              console.log('Error: ' + data);
            })


          $scope.formData.text = '';

          // Reset clases of the form after submit.
          $scope.form.$setPristine();

        })

      .error(function(data) {
        console.log($scope.getCurrentUser())
        console.log('Error: ' + $scope.formData);
      });


    }

    // Fires when the comment change the anonymous state.
    $scope.anonymousChanged = function() {
      if ($scope.comment.anonymous)
        $scope.comment.author = "";
    }



  }])
