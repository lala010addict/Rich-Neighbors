'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth) {
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  };

  changeProfilePic(form) {
    this.submitted = true;
  console.log(this.user)
   this.Auth.changeProfilePic(this.user.profile_pic);
this.user.profile_pic = '';
  };


}

angular.module('bApp')
  .controller('SettingsController', SettingsController);
