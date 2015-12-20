'use strict';

angular.module('bApp')
  .controller('MyaccountCtrl', ['$scope', 'Auth', '$http', function($scope, Auth, $http) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.name = $scope.getCurrentUser().name;
    $scope.profile_pic = $scope.getCurrentUser().profile_pic;
    $scope.click = function() {
      console.log($scope.getCurrentUser()._id);
    };


    $scope.mycampaigns = '';
    $http.get('/api/users/me/campaigns')
      .success(function(data) {
        $scope.mycampaigns = data
        console.log(data)
      })
      .error(function(data) {
        console.log('Error: ' + data);
      })


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

    $scope.select= function(index) {
       $scope.selected = index; 
    };

//********************** my follows *********************
$scope.myfollows = {};
 // $http.get('/api/users/me/campaigns')
 //      .success(function(data) {
 //        $scope.mycampaigns = data
 //        console.log(data)
 //      })
 //      .error(function(data) {
 //        console.log('Error: ' + data);
 //      })

//********************** delete campaigns ******************

$scope.deletecampaign = function  (id) {


  console.log(id)

  // DOES NOT WORK
 $http.delete('/api/campaigns/' + id)
        .success(function(data) {

          console.log('deleted')
       

        })
        .error(function(data) {

          console.log('Error: ' + data);
        });

}


  }]);
