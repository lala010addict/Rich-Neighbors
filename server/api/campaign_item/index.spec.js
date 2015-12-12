'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var campaignItemCtrlStub = {
  index: 'campaignItemCtrl.index',
  show: 'campaignItemCtrl.show',
  create: 'campaignItemCtrl.create',
  update: 'campaignItemCtrl.update',
  destroy: 'campaignItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var campaignItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './campaign_item.controller': campaignItemCtrlStub
});

describe('CampaignItem API Router:', function() {

  it('should return an express router instance', function() {
    campaignItemIndex.should.equal(routerStub);
  });

  describe('GET /api/campaign_items', function() {

    it('should route to campaignItem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'campaignItemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/campaign_items/:id', function() {

    it('should route to campaignItem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'campaignItemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/campaign_items', function() {

    it('should route to campaignItem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'campaignItemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/campaign_items/:id', function() {

    it('should route to campaignItem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'campaignItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/campaign_items/:id', function() {

    it('should route to campaignItem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'campaignItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/campaign_items/:id', function() {

    it('should route to campaignItem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'campaignItemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
