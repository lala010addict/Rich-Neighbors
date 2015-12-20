'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])

.controller('CampaignProfileController', ['$scope', 'Auth', '$stateParams', '$http', 'apiCall', 'geolocationFactory', function($scope, Auth, $stateParams, $http, apiCall, geolocationFactory) {
  $scope.campaign = apiCall.campaign;

  
  $scope.donated = '';
  $scope.apiCall = apiCall.call;
  $scope.linkApiCalls = apiCall.linkApiCalls;
  $scope.obj = apiCall.obj;
  $scope.addressDetails = 'jamma';
  $scope.getAddressDetails = function () {
    $scope.addressDetails = geolocationFactory.getLoc();
    $scope.cityState = geolocationFactory.getCityandState();
  };
  $scope.zip = '';
  $scope.getDonationTotal = function() {

  };
  $http.get('/api/campaigns/' + $stateParams.id)
    .success(function(data) {
      //   console.log($scope.linkApiCalls)
      $scope.campaign = data;
      $scope.getAddressDetails();
      console.log('scope.zip = ' , $scope.zip);
      var amounts = _.pluck(data.contributors, 'amount');
      $scope.donated = _.reduce(amounts, function(total, n) {
        return total + n;
      });

      var links = data._links.slice(1, 5);
      $scope.linkApiCalls(data._links);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  // $http.get('/api/comments/' + $stateParams.id)
  //   .success(function(data) {
  //     $scope.comments = data
  //     console.log(data)
  //     console.log('comments', $scope.comments)
  //   })
  //   .error(function(data) {
  //     console.log('Error: ' + data);
  //   })






  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.formData = {};
  $scope.getCurrentUser = Auth.getCurrentUser;
  $scope.name = $scope.getCurrentUser().name;
  $scope.profile_pic = $scope.getCurrentUser().profile_pic;
  $scope.formData.user_id = $scope.getCurrentUser()._id;
  $scope.formData.profile_pic = $scope.getCurrentUser().profile_pic;
  $scope.formData.username = $scope.getCurrentUser().name;
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
        // console.log(data);

        $http.get('/api/campaigns/' + $stateParams.id)
          .success(function(data) {
            $scope.linkApiCalls(data._links);
          })

        // $http.get('/api/campaigns/' + $stateParams.id + '/comments')
        //   .success(function(data) {
        //     $scope.comments = data
        //     console.log(data)
        //       //console.log('comments', $scope.comments)
        //   })
        .error(function(data) {
          console.log('Error: ' + data);
        });


        $scope.formData.text = '';

        // Reset clases of the form after submit.
        $scope.form.$setPristine();

      })

    .error(function(data) {
      console.log($scope.getCurrentUser());
      console.log('Error: ' + $scope.formData);
    });


  };

  // Fires when the comment change the anonymous state.
  $scope.anonymousChanged = function() {
    if ($scope.comment.anonymous)
      $scope.comment.author = "";
  };



}]);
