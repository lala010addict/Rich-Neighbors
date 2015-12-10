'use strict';

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



angular.module('bApp.MainController', [])
.controller('MainController', ['$scope', '$http', function($scope, $http) {

  $scope.data = data;
   $scope.Math = window.Math;


 $scope.showData = function( ){
     
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
     
         
}


}]);






