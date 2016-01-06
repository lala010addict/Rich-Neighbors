'use strict';

(function () {

class MainController {
  constructor($http, geolocationFactory, campaignFactory) {
    var _this = this;
    this.campaignFactory = campaignFactory;
    this.geolocationFactory = geolocationFactory;
    this.outputBar = {
      bar: 'main'
    };
    this.offsetLevel = 1;
    this.geolocationFactory.getIpInfo()
      .then(data => _this.currentLoc = `${data.city}, ${data.region} ${data.postal}`);
    this.geolocationFactory.getLatandLong()
      .then(data => _this.loc = data)
      .finally(() => {
        _this.addMoreResults(500);
      });
  }


  addMoreResults(dist) {
    var _this = this;
    var distance = dist || 500;
    var limit = 18 + _this.offsetLevel * 9;
      this.campaignFactory.getCampaigns(this.loc[0], this.loc[1], limit, distance)
      .success(data => {
        _this.campaigns = data //_.extend($campaigns, data);
        _this.offsetLevel += 1;
      })
      .error(err => {
        console.error('Error: ' + err);
      });
  }
  calDonatedAmount(x) {
    var amounts = _.pluck(x, 'amount');
    return _.reduce(amounts, (total, n) => {
      return total + n;
    });
  }
  limitChar(x, y) {
    var sp = x.split('');
    return sp.slice(0, y).join('');
  }
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
      self.addMoreResults(500);
    }
  }
}

MainController.$inject = ['$http', 'geolocationFactory','campaignFactory'];

angular.module('bApp.MainController', ['ui.router'])
  .controller('MainController', MainController);
})();
