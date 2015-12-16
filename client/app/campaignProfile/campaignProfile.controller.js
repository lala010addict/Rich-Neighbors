'use strict';

// class CampaignProfileController {
// }
// angular.module('bApp')
//   .controller('CampaignProfileController', CampaignProfileController);

angular.module('bApp.CampaignProfileController', [])
  .controller('CampaignProfileController', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
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


      // Current comment.
    this.comment = {};

    // Array where comments will be.
    this.comments = [];

    // Fires when form is submited.
    this.addComment = function() {
      // Fixed img.
      this.comment.avatarSrc = 'http://lorempixel.com/200/200/people/';

      // Add current date to the comment.
      this.comment.date = Date.now();

      this.comments.push( this.comment );
      this.comment = {};

      // Reset clases of the form after submit.
      $scope.form.$setPristine();
    }

    // Fires when the comment change the anonymous state.
    this.anonymousChanged = function(){
      if(this.comment.anonymous)
        this.comment.author = "";
    }

    

  }])

// .controller('CommentsController', ['$scope', function($scope){
//     // Current comment.
//     this.comment = {};

//     // Array where comments will be.
//     this.comments = [];

//     // Fires when form is submited.
//     this.addComment = function() {
//       // Fixed img.
//       this.comment.avatarSrc = 'http://lorempixel.com/200/200/people/';

//       // Add current date to the comment.
//       this.comment.date = Date.now();

//       this.comments.push( this.comment );
//       this.comment = {};

//       // Reset clases of the form after submit.
//       $scope.form.$setPristine();
//     }

//     // Fires when the comment change the anonymous state.
//     this.anonymousChanged = function(){
//       if(this.comment.anonymous)
//         this.comment.author = "";
//     }

//   }])
