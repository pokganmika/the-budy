// import firebase from 'firebase';
import firebase from '../Config/firebase';
// import getLocation from "./location";
// import getInitialProfileImage from '../Common/Functions/getInitialProfileImage';

// TODO: https
const OAuthService = async provider => {
  try {
    // const firebaseResult = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //   .then(result => {
    //     console.log('result check : ', result)
    //     return firebase.auth().signInWithCredential(result.credential)
    //   })
    //   .catch(error => console.error(error));
    const auth = firebase.auth();
    const firebaseResult = await auth.signInWithPopup(provider);
    // const firebaseResult = await firebase.auth().signInWithPopup(provider).catch(e => console.log('qq', e));
    // const firebaseResult = await firebase.auth().signInWithCredential(provider);
    // const firebaseResult = await firebase.auth().signInWithRedirect(provider);

    // TODO: location
    // const locationResult = await getLocation();
    const firebaseProviderData = firebaseResult.user.providerData[0];
    const firebaseData = {
      providerData: {
        displayName: firebaseProviderData.displayName,
        // photoURL: getInitialProfileImage(firebaseProviderData.displayName),
        // photoURL: firebaseProviderData.photoURL,
        email: firebaseProviderData.email,
        phoneNumber: firebaseProviderData.phoneNumber,
        providerId: firebaseProviderData.providerId,
        uid: firebaseResult.user.uid
      },
      metadata: {
        creationTime: parseInt(firebaseResult.user.metadata.a),
        lastSignInTime: parseInt(firebaseResult.user.metadata.b)
      },
      locationData: {
        altitude: null,
        latitude: null,
        longitude: null
        // altitude: locationResult.coords.altitude,
        // latitude: locationResult.coords.latitude,
        // longitude: locationResult.coords.longitude
      }
    };
    return firebaseData;
  } catch (error) {
    console.error(error);
  }
};

export default OAuthService;
