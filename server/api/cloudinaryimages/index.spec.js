'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cloudinaryimagesCtrlStub = {
  index: 'cloudinaryimagesCtrl.index',
  show: 'cloudinaryimagesCtrl.show',
  create: 'cloudinaryimagesCtrl.create',
  update: 'cloudinaryimagesCtrl.update',
  destroy: 'cloudinaryimagesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cloudinaryimagesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cloudinaryimages.controller': cloudinaryimagesCtrlStub
});

describe('Cloudinaryimages API Router:', function() {

  it('should return an express router instance', function() {
    cloudinaryimagesIndex.should.equal(routerStub);
  });

  describe('GET /api/cloudinaryimagess', function() {

    it('should route to cloudinaryimages.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cloudinaryimagesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/cloudinaryimagess/:id', function() {

    it('should route to cloudinaryimages.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cloudinaryimagesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/cloudinaryimagess', function() {

    it('should route to cloudinaryimages.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cloudinaryimagesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/cloudinaryimagess/:id', function() {

    it('should route to cloudinaryimages.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cloudinaryimagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cloudinaryimagess/:id', function() {

    it('should route to cloudinaryimages.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cloudinaryimagesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cloudinaryimagess/:id', function() {

    it('should route to cloudinaryimages.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cloudinaryimagesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
