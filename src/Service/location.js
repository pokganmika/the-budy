import axios from 'axios';
import firebase from 'firebase';
import { USER_API } from '../Config/api';
// import {} from './token';

export default function getLocation() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  })
}

export async function updateLocation() {
  const locationData = await getLocation();
  const firebaseData = await firebase.auth().currentUser;
  const data = {
    altitude: locationData.coords.altitude,
    latitude: locationData.coords.latitude,
    longitude: locationData.coords.longitude
  };
  data.lastSignInTime = parseInt(firebaseData.metadata.b);
  try {
    // TODO: get access token data
    const result = await axios.post(`${USER_API}/users/geometry`, data, );
    console.log('::Location Data Update result:: ---> : ', result);
  } catch (error) {
    console.error('::Location Data Error:: ---> : ', error);
  }
}

export async function getLocationAgree() {
  try {
    await getLocation();
  } catch (error) {
    console.error(error);
  }
}
