import React from 'react';
import firebase from '../../firebase';

export const logout = () => {
  window.localStorage.removeItem('id');
  window.localStorage.removeItem('loginType');
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('selectedCommunity');
  firebase.auth().signOut();
};
