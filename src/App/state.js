export default {
  user: {
    authentication: localStorage.getItem('authentication') || false,
    displayName: localStorage.getItem('displayName') || '',
    email: localStorage.getItem('email') || '',
    uid: localStorage.getItem('uid') || '',
    photoURL: localStorage.getItem('photoURL') || '',
    budyId: localStorage.getItem('budyId') || '',
    emailVerified: localStorage.getItem('emailVerified') || ''
  }
};
