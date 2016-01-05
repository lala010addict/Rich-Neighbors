'use strict';

(function () {

class MainController {
  constructor($http, geolocationFactory) {
    var _this = this;
    //this.scope = $scope;
    this.http = $http;
    this.campaigns = {};
    this.outputBar = {
      bar: 'main'
    };
    this.offsetLevel = 1;
    this.getCurrentLoc()
      .then(() => {
        _this.addMoreResults(500);
      });
  };

  getCurrentLoc() {
    var _this = this;
    var url = 'http://ipinfo.io/json';
    return _this.http.get(url)
      .success(data => {
        _this.currentLoc = `${data.city}, ${data.region} ${data.postal}`;
        _this.loc = data.loc.split(',').map(function(loc) {
          return Number(loc);
        });
      });
  };
  addMoreResults(dist) {
    var _this = this;
    var distance = dist || 500;
    var limit = 18 + _this.offsetLevel * 9;
    this.http({
        method: 'GET',
        url: '/api/campaigns',
        params: {
          longitude: this.loc[0],
          latitude: this.loc[1],
          limit: limit,
          distance: distance
        }
      })
      .success(data => {
        _this.campaigns = data //_.extend($campaigns, data);
        _this.offsetLevel += 1;
      })
      .error(err => {
        console.error('Error: ' + err);
      });
  };
  calDonatedAmount(x) {
    var amounts = _.pluck(x, 'amount');
    return _.reduce(amounts, function(total, n) {
      return total + n;
    });
  };
  limitChar(x, y) {
    var sp = x.split('');
    return sp.slice(0, y).join('');
  };
  showData() {
    var self = this;
    var pagesShown = 1;
    var pageSize = 9;
    this.paginationLimit = function() {
      return pageSize * pagesShown;
    };
    this.hasMoreItemsToShow = function() {
      return pagesShown < (self.campaigns.length / pageSize);
    };
    this.showMoreItems = function() {
      pagesShown = pagesShown + 1;
      self.addMoreResults();
    };
  }
}

//MainController.$inject = ['$scope', '$http', 'geolocationFactory'];

angular.module('bApp.MainController', ['ui.router'])
  .controller('MainController', MainController);
})();
