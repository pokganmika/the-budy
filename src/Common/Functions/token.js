import firebase from 'firebase';

const token = async () => {
  const result = await firebase.auth().currentUser;
  return result.user.b.b; 
}

export default token;
