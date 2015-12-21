'use strict';

angular.module('bApp')
  .controller('MyaccountCtrl', ['$scope', 'Auth', '$http', '$state',  function($scope, Auth, $http, $state) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.click = function() {
      console.log($scope.getCurrentUser()._id);
    };


    $scope.mycampaigns = '';

    $scope.refresh = function() {
      $http.get('/api/users/me/campaigns')
        .success(function(data) {
          $scope.mycampaigns = data
          console.log(data)
        })
        .error(function(data) {
          console.log('Error: ' + data);
        })
    }

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

    //********************** my follows *********************
    $scope.myfollows = {};
    $scope.getFollowers = function  () {
        $http.get('/api/users/me/followers')
         .success(function(data) {
          $scope.myfollows = data
           console.log('follows',data)
         })
         .error(function(data) {
           console.log('Error: ' + data);
         })

    }
 
  $scope.getFollowers();

    //********************** delete campaigns ******************

    $scope.deletecampaign = function(id) {


      console.log(id)

      // DOES NOT WORK
      $http.delete('/api/campaigns/' + id)
        .success(function(data) {
          $scope.refresh();
          console.log('deleted')

        })
        .error(function(data) {

          console.log('Error: ' + data);
        });

    }

//********************** update campaigns ******************

 $scope.updatecampaign = function  (id) {
   $state.go('updateCampaign',  $stateParams);

 }







  }]);
