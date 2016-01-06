'use strict';


angular.module('bApp.StartCampaignController', ['ngFileUpload'])
  .controller('StartCampaignController', ['$scope', '$http', 'Auth', '$state', '$rootScope', '$stateParams', '$cookies', 'geolocationFactory','Upload', function ($scope, $http, Auth, $state, $rootScope, $stateParams, $cookies, geolocationFactory, Upload) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    if (Auth.isLoggedIn() === false) {
      console.error("not logged in!");
      $state.go('login');
    }

    $scope.formData = {};
    //$scope.campaign_id = '';
    $scope.formData.user_id = $scope.getCurrentUser()._id;
    geolocationFactory.getLoc()
      .then(function(result) {
        $scope.formData.loc = result.data.loc.split(',').map(function(loc) {
          return Number(loc);
        });
      });

    //****************
    //**supplies & volunteers form
    //****************
    $scope.supplies = [{}];
    $scope.volunteers = [{}];
    $scope.picture = [];

    // uploader.onBeforeUploadItem = function (item) {
    //   item.headers = {
    //     Authorization: 'Bearer ' + $cookies.get('token')
    //   };
    //   item.url = '/api/campaigns/' + $scope.campaign_id + '/images';
    // };

    //$scope.supplyForm.name = $scope.supplies.supply.name;
    // $scope.supplyForm.quantity = $scope.supply.quantity;
    //$scope.campaign_id = '';
    // $scope.stateParams = "";

    $scope.addNewChoice = function(item, qty) {
      var newItemNo = $scope.supplies.length + 1;
      $scope.supplies.push({
        // 'name': item,
        // 'quantity' : qty
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

    $scope.addRelated = function (data, api) {
      return function () {
        _.forEach(data, function(item) {
          var newItem = _.merge(item, {
            'campaign_id': $scope.campaign_id
          });
          $http.post(api, newItem);
        });
      };
    };

    // $scope.upload = function (file, campaign) {
    //     console.log('upload called');
    //     Upload.upload({
    //         url: '/api/images',
    //         data: {file: file, campaign_id: campaign}
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         console.log(evt);
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };

    // for multiple files:
    $scope.uploadFiles = function (files, campaign) {
      console.log('upload called');
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          console.log(files[i]);
          Upload.upload({url: '/api/images' , data: {file: files[i], campaign_id: campaign}});
        }
      }
    }

    $scope.createCampaign = function() {
      //console.log('scope.loc:: ', $scope.formData.loc);
      if ($scope.picture.length >= 1) {
        $http.post('/api/campaigns', $scope.formData)
          .then(function(data) {
            console.log(data);
            $scope.campaign_id = data.data._id;
            console.log(data.data._id);
            $scope.uploadFiles($scope.picture, data.data._id);
          })
          .then($scope.addRelated($scope.supplies, '/api/items'))
          .then($scope.addRelated($scope.volunteers, '/api/volunteers'))
          .then(function () {
            $state.go('submitCampaignsSuccess', $stateParams)
          })
          .catch(function(err) {
            console.error('Error: ' + err);
          });
      } else {
        alert('Please add at least 1 picture')
      }
    }

  }])
