'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contributorCtrlStub = {
  index: 'contributorCtrl.index',
  show: 'contributorCtrl.show',
  create: 'contributorCtrl.create',
  update: 'contributorCtrl.update',
  destroy: 'contributorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contributorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contributor.controller': contributorCtrlStub
});

describe('Contributor API Router:', function() {

  it('should return an express router instance', function() {
    contributorIndex.should.equal(routerStub);
  });

  describe('GET /api/contributors', function() {

    it('should route to contributor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contributorCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contributors/:id', function() {

    it('should route to contributor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contributorCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contributors', function() {

    it('should route to contributor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'contributorCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contributors/:id', function() {

    it('should route to contributor.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'contributorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contributors/:id', function() {

    it('should route to contributor.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'contributorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contributors/:id', function() {

    it('should route to contributor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'contributorCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
