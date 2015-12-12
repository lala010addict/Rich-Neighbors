'use strict';

(function() {

angular.module('bApp.auth')
  .run(function($rootScope, $state, Auth) {    
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {    
      if(!next.authenticate) {
        return;
      }

      let query = typeof next.authenticate === 'string' ? Auth.hasRole : Auth.isLoggedIn;

      query(1,2).then(good => {
        if(!good) {
          event.preventDefault();
          Auth.isLoggedIn().then(is => {
            $state.go(is ? 'main' : 'login');
          });
        }
      });
    });    
  });

})();
