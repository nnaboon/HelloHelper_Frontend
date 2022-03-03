import React from 'react';
import firebase from '../../firebase';

export const logout = () => {
  window.location.assign('/');

  setTimeout(() => {
    window.localStorage.removeItem('loginType');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('facebook_access_token');
    window.localStorage.removeItem('selectedCommunity');
    window.localStorage.removeItem('id');
    firebase.auth().signOut();
  }, 2000);
};
