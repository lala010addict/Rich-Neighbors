'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])

.controller('CampaignProfileController', ['$scope', 'Auth', '$stateParams', '$http', 'apiCall', 'geolocationFactory', 'generalFactory', 'donationFactory', function ($scope, Auth, $stateParams, $http, apiCall, geolocationFactory, generalFactory, donationFactory) {
  $scope.campaign = apiCall.campaign;

  // $scope.updateDonatedAmount = donationFactory.updateDonatedAmount();
  $scope.donated = 'blah';
  $scope.apiCall = apiCall.call;
  $scope.linkApiCalls = apiCall.linkApiCalls;
  $scope.obj = apiCall.obj;
  $scope.addressDetails = 'jamma';
  $scope.getAddressDetails = function () {
    $scope.addressDetails = geolocationFactory.getLoc();
    $scope.cityState = geolocationFactory.getCityandState();
  };

  $scope.updateDonatedAmount = function() {
    // donationFactory.updateDonatedAmount()
    return $http.get('/api/campaigns/' + $stateParams.id + '/contributors')
      .success(function (contributions) {
        var total = 0;
        _.each(contributions, function(contribution) {
          total += Number(contribution.amount);
        });
        $scope.donated = total;
      });
  }; 
  $scope.saveDonation = function (amount) {
    donationFactory.saveDonation(amount, $stateParams.id, $stateParams._userId)
      .success(function(data) {
        console.log(data);
      });
  };
  $http.get('/api/campaigns/' + $stateParams.id)
    .success(function(data) {

      $scope.campaign = data;
      console.log(data.contributors);

      $scope.getAddressDetails();
      generalFactory.setCampaignId(data._id);

      console.log('userID here ', $stateParams._userId);


      var amounts = _.pluck(data.contributors, 'amount');
      console.log(amounts);
      $scope.donated = _.reduce(amounts, function(total, n) {
        return total + n;
      });
      console.log('donated:', _.reduce(amounts, function(total, n) {
        return total + n;
      }) );
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
  $scope.formData.user_id = $stateParams._userId = $scope.getCurrentUser()._id;
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

  //********************follow campagins************************

  $scope.followers = {};
  $scope.followers.user_id = $scope.formData.user_id;
  $scope.followers.campaign_id = $scope.formData.campaign_id;
  $scope.follow = 'Follow';
  $scope.check = 'plus'
  $scope.followid = '';

  $scope.checkiffollowed = function() {
    $http.get('/api/campaigns/' + $scope.followers.campaign_id + '/followers')
      .success(function(data) {
        console.log('checkiffollowed', data)
        _.forEach(data, function(item) {
          if (item.user_id === $scope.followers.user_id) {
            console.log('yes!!!!')
            $scope.followid = item._id;
            $scope.follow = 'Followed'
            $scope.check = 'check';

          }
        })

      })
      .error(function(data) {

        console.log('Error: ' + data);
      });


  }

  $scope.checkiffollowed();

  $scope.clicktofollow = function() {

    if ($scope.follow == 'Follow') {
      $http.post('/api/followers', $scope.followers)
        .success(function(data) {
          $scope.follow = 'Followed'
          $scope.check = 'check'

          $scope.followid = data._id
          console.log(data)
          console.log($scope.followid)
        })
        .error(function(data) {

          console.log('Error: ' + data);
        });
    } else {
      console.log('delete')

      $http.delete('/api/followers/' + $scope.followid)
        .success(function(data) {
          $scope.follow = 'Follow'
          $scope.check = 'plus'
          console.log('deleted')
          console.log(data)
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }
  }
}])
.factory('campaignFactory', function ($stateParams) {
  var campaignId = $stateParams.id;
  return {
    campaignId: campaignId
  }

//**************************sign up for supplies and volunteers**********************

$scope.range = function(count){

  var quantity = []; 

  for (var i = 1; i < count +1; i++) { 
    quantity.push(i) 
  } 

  return quantity;
}

}]);
