import firebase from 'firebase';
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'chicken-96ef7.firebaseapp.com',
  messagingSenderId: '112274227966',
  databaseURL: '',
  projectId: 'chicken-96ef7',
  storageBucket: '',
  appId: '1:112274227966:web:ea550857dadc4fdfe39baf',
  measurementId: '',
};

const fire = firebase.initializeApp(config);

export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();

export default fire;
