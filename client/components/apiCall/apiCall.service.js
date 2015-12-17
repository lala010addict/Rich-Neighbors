'use strict';

angular.module('bApp')
  .service('apiCall', ["$http", function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

var campaign = {};

    var call = function(url) {
    		console.log('call')
      $http.get(url)
        .success(function(data) {
        	console.log(data)
          return data
        })
        .error(function(data) {
          console.log('Error: ' + data);
        })

    };

    var obj = {};

    var linkApiCalls = function(data) {
    	console.log('linkApiCalls', data)
      _.forEach(data, function(val) {
      	   console.log(val.href);
    //   obj[val.ref] = 
 //call(val.href);
      });

      return _.merge(campaign, obj)
    };




    return {
    	campaign: campaign,
      call: call,
      linkApiCalls: linkApiCalls
    }


  }]);
