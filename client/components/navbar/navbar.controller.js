'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('bApp')
  .controller('NavbarController', NavbarController);
