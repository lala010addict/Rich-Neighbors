'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var followerCtrlStub = {
  index: 'followerCtrl.index',
  show: 'followerCtrl.show',
  create: 'followerCtrl.create',
  update: 'followerCtrl.update',
  destroy: 'followerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var followerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './follower.controller': followerCtrlStub
});

describe('Follower API Router:', function() {

  it('should return an express router instance', function() {
    followerIndex.should.equal(routerStub);
  });

  describe('GET /api/followers', function() {

    it('should route to follower.controller.index', function() {
      routerStub.get
        .withArgs('/', 'followerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/followers/:id', function() {

    it('should route to follower.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'followerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/followers', function() {

    it('should route to follower.controller.create', function() {
      routerStub.post
        .withArgs('/', 'followerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/followers/:id', function() {

    it('should route to follower.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'followerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/followers/:id', function() {

    it('should route to follower.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'followerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/followers/:id', function() {

    it('should route to follower.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'followerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
