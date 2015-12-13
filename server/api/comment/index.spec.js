'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commentCtrlStub = {
  index: 'commentCtrl.index',
  show: 'commentCtrl.show',
  create: 'commentCtrl.create',
  update: 'commentCtrl.update',
  destroy: 'commentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './comment.controller': commentCtrlStub
});

describe('Comment API Router:', function() {

  it('should return an express router instance', function() {
    commentIndex.should.equal(routerStub);
  });

  describe('GET /api/comments', function() {

    it('should route to comment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'commentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/comments/:id', function() {

    it('should route to comment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'commentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/comments', function() {

    it('should route to comment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'commentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/comments/:id', function() {

    it('should route to comment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'commentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/comments/:id', function() {

    it('should route to comment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'commentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/comments/:id', function() {

    it('should route to comment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'commentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
