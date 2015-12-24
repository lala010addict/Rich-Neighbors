'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var feedCtrlStub = {
  index: 'feedCtrl.index',
  show: 'feedCtrl.show',
  create: 'feedCtrl.create',
  update: 'feedCtrl.update',
  destroy: 'feedCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var feedIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './feed.controller': feedCtrlStub
});

describe('Feed API Router:', function() {

  it('should return an express router instance', function() {
    feedIndex.should.equal(routerStub);
  });

  describe('GET /api/feeds', function() {

    it('should route to feed.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/feeds/:id', function() {

    it('should route to feed.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'feedCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/feeds', function() {

    it('should route to feed.controller.create', function() {
      routerStub.post
        .withArgs('/', 'feedCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/feeds/:id', function() {

    it('should route to feed.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'feedCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/feeds/:id', function() {

    it('should route to feed.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'feedCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/feeds/:id', function() {

    it('should route to feed.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'feedCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
