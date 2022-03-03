import firebase, { initializeApp } from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDTTzpZWMgIxLMgay23G-eJja4hxzr7acg',
  authDomain: 'senior-project-97cfa.firebaseapp.com',
  projectId: 'senior-project-97cfa',
  storageBucket: 'senior-project-97cfa.appspot.com',
  messagingSenderId: '831712944324',
  appId: '1:831712944324:web:7204980ea64e6894796991'
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
      var user = result.user;
      var token = result.credential.accessToken;
      const credential = facebookProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
      window.localStorage.setItem('access_token', firebaseIdToken);
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });

export default firebase;
