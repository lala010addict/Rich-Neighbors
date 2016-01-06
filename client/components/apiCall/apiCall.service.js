'use strict';

angular.module('bApp')
  .service('apiCall', ["$http", function($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //  var campaign = {};
    var obj = {};
    var call = function(url, ref) {
      $http.get(url, ref)
        .success(function(data) {
          console.log(ref)
            // obj.push({
            //   ref: data
            // });
          obj[ref] = data
        })
        .error(function(data) {
          console.log('Error: ' + data);
        })

    };

    var linkApiCalls = function(data) {
      // console.log('linkApiCalls', data)
      _.forEach(data, function(val) {
        call(val.href, val.ref)
      });
      // var merged = _.merge(campaign, obj)
      return obj
    };

    var linkApiCallsRecursive = function(data) {
      var cmts = {};
      if (Array.isArray(data)) {
        _.forEach(data, function(val) {
          $http.get('/api/comments/' + val._id + '/comments', ref)
            .success(function(data) {
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        })
      };
    };



    return {
      //  campaign: campaign,
      obj: obj,
      call: call,
      linkApiCalls: linkApiCalls
    }


  }]);
