'use strict';

angular.module('bApp.auth', [
  'bApp.constants',
  'bApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
