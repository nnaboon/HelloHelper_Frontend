import firebase, { initializeApp } from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(async ({ user }) => {
    const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
    window.localStorage.setItem('access_token', firebaseIdToken);
  });
export const signInWithFacebook = () =>
  auth
    .signInWithPopup(facebookProvider)
    .then(async (result) => {
      var token = result.credential.accessToken;
      var user = result.user;
      window.localStorage.setItem('facebook_access_token', token);

      await firebase
        .auth()
        .currentUser.getIdToken()
        .then((result) => {
          window.localStorage.setItem('access_token', result);
        });
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });

export default firebase;
