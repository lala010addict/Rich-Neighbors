'use strict';

angular.module('bApp')
  .controller('MyaccountCtrl', ['$scope', 'Auth', '$http', '$state', function($scope, Auth, $http, $state) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.click = function() {
      $scope.userID = $scope.getCurrentUser()._id;
    };


    $scope.mycampaigns = '';

    $scope.refresh = function() {
      $scope.click();
      $http.get('/api/users/me/campaigns')
        .success(function(data) {
          $scope.mycampaigns = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.refresh();


    $scope.isactive = false;
    $scope.activeButton = function() {
      $scope.isactive = !$scope.isactive;
    }


    $scope.filters = [{
        'filterId': 1,
        'time': 'Followed',
        'url': '/following'
      }, {
        'filterId': 2,
        'time': 'Started',
        'url': '/myaccount'
      }, {
        'filterId': 3,
        'time': 'Contributed',
        'url': '/contributed'
      }

    ];

    $scope.selected = 1;

    $scope.select = function(index) {
      $scope.selected = index;
    };
    //********************** my contributions *********************
    $scope.myContributions = {};
    $scope.getMyContributions = function() {
      $http.get('/api/users/' + $scope.userID + '/contributors')
      .success(function (data) {
        console.log('contrib data ', data);
        $scope.myContributions = data;
      });
    };
    $scope.getMyContributions();

    //********************** my follows *********************
    $scope.myfollows = {};
    $scope.getFollowers = function() {
      $http.get('/api/users/me/followers')
        .success(function(data) {

          _.forEach(data, function(item) {
            if (item.campaign_id === null) {
              $http.delete('/api/followers/' + item._id)
                .success(function(data) {
                  $scope.getFollowers();

                })
                .error(function(data) {
                  console.log('Error: ' + data);
                });
            }
          });


          $scope.myfollows = data
          console.log('follows', data)
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

    };

    $scope.getFollowers();

    //********************** delete campaigns ******************

    $scope.deletecampaign = function(id) {

      var r = confirm("Are you sure to delete??");
      if (r == true) {
        $http.delete('/api/campaigns/' + id)
          .success(function(data) {
            $scope.refresh();
            console.log('deleted')

          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      } else {
        console.log('they changed their mind')
      }
    }


    //********************** unfollow campaigns ******************

    $scope.unfollowcampaign = function(id) {

      console.log(id);

      var r = confirm("Are you sure to unfollow?");
      if (r == true) {
        $http.delete('/api/followers/' + id)
          .success(function(data) {
            $scope.getFollowers();

            console.log('unfollow')


          })
          .error(function(data) {

            console.log('Error: ' + data);
          });
      }
    }



    //********************** update campaigns ******************

    $scope.updatecampaign = function(id) {
      console.log(id)
      $state.go('updateCampaign', {
        'id': id
      });

    }







  }]);
