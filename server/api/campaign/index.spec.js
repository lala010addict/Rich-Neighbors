'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var campaignCtrlStub = {
  index: 'campaignCtrl.index',
  show: 'campaignCtrl.show',
  create: 'campaignCtrl.create',
  update: 'campaignCtrl.update',
  destroy: 'campaignCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var campaignIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './campaign.controller': campaignCtrlStub
});

describe('Campaign API Router:', function() {

  it('should return an express router instance', function() {
    campaignIndex.should.equal(routerStub);
  });

  describe('GET /api/campaigns', function() {

    it('should route to campaign.controller.index', function() {
      routerStub.get
        .withArgs('/', 'campaignCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/campaigns/:id', function() {

    it('should route to campaign.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'campaignCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/campaigns', function() {

    it('should route to campaign.controller.create', function() {
      routerStub.post
        .withArgs('/', 'campaignCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/campaigns/:id', function() {

    it('should route to campaign.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'campaignCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/campaigns/:id', function() {

    it('should route to campaign.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'campaignCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/campaigns/:id', function() {

    it('should route to campaign.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'campaignCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
