'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentCtrlStub = {
  index: 'paymentCtrl.index',
  show: 'paymentCtrl.show',
  create: 'paymentCtrl.create',
  update: 'paymentCtrl.update',
  destroy: 'paymentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './payment.controller': paymentCtrlStub
});

describe('Payment API Router:', function() {

  it('should return an express router instance', function() {
    paymentIndex.should.equal(routerStub);
  });

  describe('GET /api/payments', function() {

    it('should route to payment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'paymentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/payments/:id', function() {

    it('should route to payment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'paymentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/payments', function() {

    it('should route to payment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'paymentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/payments/:id', function() {

    it('should route to payment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'paymentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/payments/:id', function() {

    it('should route to payment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'paymentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/payments/:id', function() {

    it('should route to payment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'paymentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
