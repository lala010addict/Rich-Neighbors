'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  },
  {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },

    changeProfilePic: {
      method: 'PUT',
      params: {
        controller:'profile_pic'
      }
    },

    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
}

angular.module('bApp.auth')
  .factory('User', UserResource);

})();
