'use strict';

angular.module('bApp')
  .controller('UpdateCampaignsSuccessCtrl', ['$scope', '$state',   function ($scope, $state) {
   console.log('stateparams', $state.params.id)
   $scope.id = $state.params.id
  }]);
