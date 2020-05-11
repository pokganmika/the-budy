// import axios from 'axios';
import firebase from 'firebase';
// import { USER_API } from '../Config/api';

// export async function getFirebaseToken() {
export async function getAccessToken() {
  const result = await firebase.auth().currentUser;
  if (result) {
    return { accessToken: result.b.b };
  } else {
    return null;
  }
}

// export function getAccessToken() {
//   // TODO: get accessToken in localStorage
// }

export function compareToken() {}

/**
 * token renewal (1h) -> location data update
 */
