'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var volunteerCtrlStub = {
  index: 'volunteerCtrl.index',
  show: 'volunteerCtrl.show',
  create: 'volunteerCtrl.create',
  update: 'volunteerCtrl.update',
  destroy: 'volunteerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var volunteerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './volunteer.controller': volunteerCtrlStub
});

describe('Volunteer API Router:', function() {

  it('should return an express router instance', function() {
    volunteerIndex.should.equal(routerStub);
  });

  describe('GET /api/volunteers', function() {

    it('should route to volunteer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'volunteerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/volunteers/:id', function() {

    it('should route to volunteer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'volunteerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/volunteers', function() {

    it('should route to volunteer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'volunteerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/volunteers/:id', function() {

    it('should route to volunteer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'volunteerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/volunteers/:id', function() {

    it('should route to volunteer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'volunteerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/volunteers/:id', function() {

    it('should route to volunteer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'volunteerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
