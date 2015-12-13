'use strict';

angular.module('bApp.MainController', ['ui.router'])
  .controller('MainController', ['$scope', '$http', function($scope, $http) {

    $scope.data = {};
    $scope.getData = function() {
      $http.get('/api/campaigns')
        .success(function(data) {
          $scope.data = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }

    $scope.getData();

    $scope.limitChar = function(x, y) {
      var sp = x.split(' ')
      return sp.slice(0, y).join(' ')
    }

    $scope.showCampaignProfile = function(x) {
      $location.path('#/campaignProfile/' + x._id);
    };


    $scope.showData = function() {

      //show more functionality
      var pagesShown = 1;
      var pageSize = 6;

      $scope.paginationLimit = function(data) {
        return pageSize * pagesShown;
      };
      $scope.hasMoreItemsToShow = function() {
        return pagesShown < ($scope.data.length / pageSize);
      };
      $scope.showMoreItems = function() {
        pagesShown = pagesShown + 1;
      };


    };



  }]);






// (function() {

// class MainController {



//   constructor($http) {
//     this.$http = $http;
//     this.awesomeThings = [];

//     $http.get('/api/things').then(response => {
//       this.awesomeThings = response.data;
//     });
//   }

//   addThing() {
//     if (this.newThing) {
//       this.$http.post('/api/things', { name: this.newThing });
//       this.newThing = '';
//     }
//   }

//   deleteThing(thing) {
//     this.$http.delete('/api/things/' + thing._id);
//   }
// }

// angular.module('bApp')
//   .controller('MainController', MainController);

// })();
