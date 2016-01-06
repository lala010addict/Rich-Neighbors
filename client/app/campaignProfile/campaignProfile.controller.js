'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', ['td.easySocialShare'])

.controller('CampaignProfileController', ['$scope', 'Auth', '$stateParams', '$http', 'apiCall', 'geolocationFactory', 'generalFactory', 'donationFactory', function($scope, Auth, $stateParams, $http, apiCall, geolocationFactory, generalFactory, donationFactory) {
    $scope.campaign = apiCall.campaign;

    // $scope.updateDonatedAmount = donationFactory.updateDonatedAmount();
    $scope.donated = 'blah';
    $scope.apiCall = apiCall.call;
    $scope.linkApiCalls = apiCall.linkApiCalls;
    $scope.obj = apiCall.obj;
    $scope.addressDetails = 'jamma';

    $scope.updateDonatedAmount = function() {
      // donationFactory.updateDonatedAmount()
      return $http.get('/api/campaigns/' + $stateParams.id + '/contributors')
        .success(function(contributions) {
          var total = 0;
          _.each(contributions, function(contribution) {
            total += Number(contribution.amount);
          });
          $scope.donated = total;
        });
    };
    $scope.saveDonation = function(amount) {
      donationFactory.saveDonation(amount, $stateParams.id, $stateParams._userId)
        .success(function(data) {
          console.log(data);
          $scope.updateDonatedAmount();
        });
    };

    $scope.getCampaigns = function() {
      $http.get('/api/campaigns/' + $stateParams.id)
        .success(function(data) {
          $scope.updateDonatedAmount();
          $scope.campaign = data;
          //$scope.comments = data.comments;
          console.log(data);
          generalFactory.setCampaignId(data._id);

          var amounts = _.pluck(data.contributors, 'amount');

          $scope.donated = _.reduce(amounts, function(total, n) {
            return total + n;
          });
          console.log('donated:', _.reduce(amounts, function(total, n) {
            return total + n;
          }));
          var links = data._links.slice(1, 5);
          $scope.linkApiCalls(data._links);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }

    $scope.getCampaigns();


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
    $scope.replyData = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.formData.user_id = $stateParams._userId = $scope.getCurrentUser()._id;
    $scope.formData.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.formData.username = $scope.getCurrentUser().name;
    $scope.formData.campaign_id = $stateParams.id;
    $scope.formData.text = '';
    $scope.replyData.user_id = $stateParams._userId = $scope.getCurrentUser()._id;
    $scope.replyData.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.replyData.username = $scope.getCurrentUser().name;
    $scope.replyData.campaign_id = $stateParams.id;
    $scope.replyData.text = '';
    // Current comment.
    $scope.comment = {};

    // Array where comments will be.
    //$scope.comments = [];

    // Fires when form is submited.
    $scope.addComment = function() {
      $http.post('/api/comments', $scope.formData)
        .success(function(data) {
          var commentApi = {
            'href': '/api/campaigns/' + $stateParams.id + '/comments',
            'ref': 'comments'
          }
          $scope.linkApiCalls([commentApi]);
          $scope.formData.text = '';
          $scope.form.$setPristine();
        })
        .error(function(data) {
          console.log($scope.getCurrentUser());
          console.log('Error: ' + $scope.formData);
        });
    };

    $scope.addReply = function(parent) {
      $http.post('/api/comments/' + parent + '/comments', $scope.replyData)
        .success(function(data) {
          var commentApi = {
            'href': '/api/campaigns/' + $stateParams.id + '/comments',
            'ref': 'comments'
          }
          $scope.linkApiCalls([commentApi]);
          console.log($scope.obj.comments);
          $scope.replyData.text = '';
          $scope.replyData.parent = null;
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
      //**************************sign up for supplies and volunteers**********************

    $scope.range = function(count) {

      var quantity = [];

      for (var i = 1; i < count + 1; i++) {
        quantity.push(i);
      }

      return quantity;
    }

    $scope.checkiffollowed();

    $scope.clicktofollow = function() {

      if ($scope.follow == 'Follow') {
        $http.post('/api/followers', $scope.followers)
          .success(function(data) {
            $scope.follow = 'Followed';
            $scope.check = 'check';

            $scope.followid = data._id;
            console.log(data);
            console.log($scope.followid);
          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      } else {
        console.log('delete');

        $http.delete('/api/followers/' + $scope.followid)
          .success(function(data) {
            $scope.follow = 'Follow';
            $scope.check = 'plus';
            console.log('deleted');
            console.log(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
    };


    //**************************sign up for supplies **********************
    $scope.selectedItem = '1'

    $scope.range = function(count) {

      var quantity = [];

      for (var i = 1; i < count + 1; i++) {
        quantity.push(i)
      }

      return quantity;
    }


    $scope.supplySignUp = {};
    $scope.supplySignUp.user_id = $scope.formData.user_id;
    $scope.supplySignUp.campaign_id = $scope.formData.campaign_id;
    $scope.supplySignUp.type = "Supply";
    $scope.supplySignUp.item_id = ''
    $scope.supplySignUp.amount = ''

    $scope.contributeSupply = function(quantity, id) {
      console.log(quantity, id)
      $scope.supplySignUp.item_id = id;
      $scope.supplySignUp.amount = quantity;
      $http.post('/api/contributors', $scope.supplySignUp)
        .success(function(data) {

          alert("Thanks for Donating!")
          $scope.getCampaigns();
        })
        .error(function(data) {

          console.log('Error: ' + data);
        });

    }


    //**************************sign up for volunteers **********************
    $scope.supplyVolunteer = {};
    $scope.supplyVolunteer.user_id = $scope.formData.user_id;
    $scope.supplyVolunteer.campaign_id = $scope.formData.campaign_id;
    $scope.supplyVolunteer.type = "Volunteer";
    $scope.supplyVolunteer.volunteer_id = ''
    $scope.supplyVolunteer.amount = '1'

    $scope.contributeVolunteer = function(id) {
      console.log(id)
      $scope.supplyVolunteer.volunteer_id = id;
      $http.post('/api/contributors', $scope.supplyVolunteer)
        .success(function(data) {
          alert("Thanks for Signing Up!")
          $scope.getCampaigns();
        })
        .error(function(data) {

          console.log('Error: ' + data);
        });

    }

    //**************************filtering out supply contributions **********************

    $scope.filterSupply = function(x, id) {

      // console.log('obj.contributors', x);
      // console.log('id', id)
      // console.log('filtered', _.pluck(_.filter(_.pluck(_.filter(x, {
      //   'type': "Supply"
      // }), "item_id"), {
      //   '_id': "5679bbd0e134af5d22bdb9e8"
      // }), 'quantity'));


      console.log('filteredid', _.pluck(_.filter(x, {
        'type': "Supply",
        'item_id': {
          '_id': "5679bbd0e134af5d22bdb9e8"
        }
      }), 'amount'))


      var numbers = _.pluck(_.filter(x, {
        'type': "Supply",
        'item_id': {
          '_id': id
        }
      }), 'amount')



      var reducednumber = _.reduce(numbers, function(total, n) {
        return total + n;
      })

      // console.log('reducednumber', reducednumber)

      return reducednumber
    }


    //**************************filtering out supply contributions **********************
    $scope.filterVolunteer = function(x, id) {


      // console.log('filteredid', _.pluck(_.filter(x, {
      //   'type': "Supply",
      //   'item_id': {
      //     '_id': "5679bbd0e134af5d22bdb9e8"
      //   }
      // }), 'amount'))


      var numbers = _.pluck(_.filter(x, {
        'type': "Volunteer",
        'volunteer_id': {
          '_id': id
        }
      }), 'amount')



      var reducednumber = _.reduce(numbers, function(total, n) {
        return total + n;
      })

      // console.log('reducednumber', reducednumber)

      return reducednumber
    }

    //**************************social share **********************







  }])
  .factory('campaignFactory', function($stateParams) {
    var campaignId = $stateParams.id;
    return {
      campaignId: campaignId
    };
  });
