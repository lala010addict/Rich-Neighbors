'use strict';



angular.module('bApp.geolocation', ["ui.map", "ui.event"])

.factory('GeoLoc', ['$http', function($http) {
  var getAddress = function(lat, lng) {

    var apiAddress = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + ',' + lng

    return $http.get(apiAddress, {
      cache: true
    }).success(function(data) {
 //  console.log(data)
      return data

    });

  }

  return {
    getAddress: getAddress
  };
}])



.controller('GeolocationController', function($scope, $http, GeoLoc) {
  $scope.lat = "0";
  $scope.lng = "0";
  $scope.address = "";
  $scope.accuracy = "0";
  $scope.error = "";
  $scope.model = {
    myMap: undefined
  };
  $scope.myMarkers = [];

  $scope.showResult = function() {
    return $scope.error == "";
  }

  $scope.mapOptions = {
    center: new google.maps.LatLng($scope.lat, $scope.lng),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.showPosition = function(position) {
   // console.log(position)
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;
    $scope.$apply();

    $scope.getCity(position.coords.latitude, position.coords.longitude);

    var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
    $scope.model.myMap.setCenter(latlng);
    $scope.myMarkers.push(new google.maps.Marker({
      map: $scope.model.myMap,
      position: latlng
    }));

  }

  $scope.showError = function(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $scope.error = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        $scope.error = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        $scope.error = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        $scope.error = "An unknown error occurred."
        break;
    }
    $scope.$apply();
  }

  $scope.getLocation = function() {
    if (navigator.geolocation) {


      navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
    } else {
      $scope.error = "Geolocation is not supported by this browser.";
    }
  }

$scope.getCity = function(lat, lng) {

   GeoLoc.getAddress(lat, lng)
    .success(function(data) {
      console.log(data.results[2].formatted_address)
      $scope.address = data.results[2].formatted_address
      
    })
  }




  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452

  $scope.getLocation();
});
