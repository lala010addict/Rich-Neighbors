'use strict';

angular.module('bApp')
  .controller('UpdateCampaignCtrl', ['$scope', '$stateParams', '$state', '$http', 'Auth', function($scope, $stateParams, $state, $http, Auth) {
    console.log($state.params.id)

$scope.formData = {};


    $http.get('/api/campaigns/' + $state.params.id)
      .success(function(data) {
      	console.log(data)
      	$scope.formData = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });






    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if (Auth.isLoggedIn() === false) {
      console.log("not logged in!");
      $state.go('login');
    }

    $scope.id = '';
    $scope.formData.user_id = $scope.getCurrentUser()._id;

    //****************
    //**supplies & volunteers form
    //****************
    $scope.supplies = [{
      //   'name': 'supply',

    }];

    $scope.volunteers = [{
      //   'name': 'supply',

    }];


    // $scope.supplyForm = {};

    //$scope.supplyForm.name = $scope.supplies.supply.name;
    // $scope.supplyForm.quantity = $scope.supply.quantity;
    $scope.campaign_id = '';
    // $scope.stateParams = "";

    $scope.addNewChoice = function() {
      var newItemNo = $scope.supplies.length + 1;
      $scope.supplies.push({
        //  'name': 'supply' + newItemNo
      });
    };

    $scope.removeChoice = function() {
      var lastItem = $scope.supplies.length - 1;
      $scope.supplies.splice(lastItem);
    };


    $scope.addNewVolunteer = function() {
      var newItemNo = $scope.volunteers.length + 1;
      $scope.volunteers.push({
        //  'campaign_id': 'supply' + newItemNo
      });
    };

    $scope.removeVolunteer = function() {
      var lastItem = $scope.volunteers.length - 1;
      $scope.volunteers.splice(lastItem);
    };





    $scope.updateCampaign = function() {
      $http.put('/api/campaigns/' + $state.params.id, $scope.formData)
        .success(function(data) {
          console.log(data)
          $scope.id = data._id
          $scope.campaign_id = $scope.id


          _.forEach($scope.supplies, function(item) {
            var newItem = _.merge(item, {
              'campaign_id': $scope.campaign_id
            });
            console.log('new item', newItem);

            $http.put('/api/items', newItem)
              .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //  $scope.campaigns = data;

                // console.log($scope.campaign_id)
                console.log(data);
                // $scope.id = data._id
                //  console.log($scope.id)


              })
              .error(function(data) {
                console.log($scope.getCurrentUser())
                console.log('Error: ' + data);
              });

          })

          _.forEach($scope.volunteers, function(item) {
            var newItem = _.merge(item, {
              'campaign_id': $scope.campaign_id
            });

            $http.put('/api/volunteers', newItem)

            .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                //  $scope.campaigns = data;
                console.log($scope.campaign_id)
                console.log(data);
                // $scope.id = data._id
                //  console.log($scope.id)


              })
              .error(function(data) {
                console.log($scope.getCurrentUser())
                console.log('Error: ' + data);
              });

          })




          $state.go('submitCampaignsSuccess', $stateParams)



        })
        .error(function(data) {
          console.log($scope.getCurrentUser())
          console.log('Error: ' + data);
        });
    }








  }]);
