'use strict';

angular.module('bApp.donate', ['ngMaterial'])

  .controller('DonateCtrl', ['$scope', '$http', '$stateParams', '$state','$timeout', 'Auth', 'generalFactory', 'donationFactory', 'campaignFactory',  function ($scope, $http, $stateParams, $state, $timeout, Auth, generalFactory, donationFactory, campaignFactory) {
    $scope.message = 'Please use the form below to pay:';
    $scope.showDropinContainer = true;
    $scope.isError = false;
    $scope.isPaid = false;


    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.userID = $scope.getCurrentUser()._id;

    $scope.campaignId = generalFactory.getCampaignId();

    console.log('scope.capID::', $scope.campaignId);

    console.log('scope.userID::', $scope.userID);

    $scope.getToken = function () {
      $http({
        method: 'POST',
        url: 'api/payments/client_token'
      }).success(function(data) {
        console.log(data.client_token); // CUT THIS
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
              if (data.success) {
                donationFactory.saveDonation(data.transaction.amount, $scope.campaignId, $scope.userID)
                .success(function(data) {
                  console.log(data);
                })
              }
              if (data.success) {
                $scope.message = 'Payment authorized, thanks! You will be redirected to the home page in 3 seconds.';
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
  }])
.factory('donationFactory', function ($http, $stateParams) {

  var updateDonatedAmount = function() {
    var total = 0;
    console.log('hello from donation factory')
     return $http.get('/api/campaigns/' + $stateParams.id + '/contributors')
      .success(function (contributions) {
        _.each(contributions, function(contribution) {
          total += Number(contribution.amount);
        });
      console.log(total)
        return total;
      });

  };

  var saveDonation = function(donatedAmount, campaignId, userId) {
    var contributionURL = '/api/campaigns/' + campaignId + '/contributors';
    console.log(contributionURL)
    var donationData = {
      amount: donatedAmount,
      campaign_id: campaignId,
      user_id: userId || $stateParams._userId
    };
    return $http.post(contributionURL, donationData)
      .success(function (data) {
        console.log('donation saved for this user')
      })
      .error(function (data) {
        console.log('donation backend error ', data);
      });
  };

  return {
      updateDonatedAmount: updateDonatedAmount,
      saveDonation: function(donatedAmount, campaignId, userId) {
          return saveDonation(donatedAmount, campaignId, userId);
      }
  };
});









