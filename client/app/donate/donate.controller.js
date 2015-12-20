'use strict';

angular.module('bApp.donate', ['ngMaterial'])
<<<<<<< HEAD
  .controller('DonateCtrl', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
=======
  .controller('DonateCtrl', ['$scope', '$http', '$location', '$state', '$timeout', function($scope, $http, $location, $state, $timeout) {
>>>>>>> decfeeebffa3fc40ad74186f77b4609620dd1ef9
    $scope.message = 'Please use the form below to pay:';
    $scope.showDropinContainer = true;
    $scope.isError = false;
    $scope.isPaid = false;
<<<<<<< HEAD
    // $scope.updateDonation = function(amount) {
    //   $http({
    //     method: 'PATCH', 
    //     url: 'api/campaigns' + $stateParams.id + '/contributors'
    //   });
    // };
    $scope.getToken = function () {
=======

    $scope.getToken = function() {
>>>>>>> decfeeebffa3fc40ad74186f77b4609620dd1ef9
      $http({
        method: 'POST',
        url: 'api/payments/client_token'
      }).success(function(data) {
        console.log(data.client_token);
        braintree.setup(data.client_token, 'dropin', {
          container: 'checkout',
          // Form is not submitted by default when paymentMethodNonceReceived is implemented
          paymentMethodNonceReceived: function(event, nonce) {
            $scope.message = 'Processing your payment...';
            $scope.showDropinContainer = false;
            $http({
              method: 'POST',
              url: 'api/payments/checkout',
              data: {
                amount: $scope.amount,
                payment_method_nonce: "fake-valid-nonce"
              }
            }).success(function(data) {
              console.log(data.success);
              if (data.success) {
                $scope.message = 'Payment authorized, thanks.';
                $scope.showDropinContainer = false;
                $scope.isError = false;
                $scope.isPaid = true;


                $timeout(function() {
                  $state.go('main');
                }, 4000);


              } else {
                // implement your solution to handle payment failures
                $scope.message = 'Payment failed: ' + data.message + ' Please refresh the page and try again.';
                $scope.isError = true;
              }
            }).error(function(error) {
              $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
              $scope.showDropinContainer = false;
              $scope.isError = true;
            });
          }
        });
      }).error(function(error) {
        $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
        $scope.showDropinContainer = false;
        $scope.isError = true;
      });
    };
    $scope.getToken();
  }]);
