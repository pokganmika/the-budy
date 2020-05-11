/**
 *
 * @param {boolean} authentication
 * @param {string} displayName
 * @param {string} email
 * @param {string} uid
 * @param {string || object} photoURL
 * @param {string} budyId
 * @param {string || boolean} emailVerified
 */
export default (
  authentication,
  displayName,
  email,
  uid,
  photoURL,
  budyId,
  emailVerified
) => {
  localStorage.setItem('authentication', authentication);
  localStorage.setItem('displayName', displayName);
  localStorage.setItem('email', email);
  localStorage.setItem('uid', uid);
  localStorage.setItem('photoURL', photoURL);
  localStorage.setItem('budyId', budyId);
  localStorage.setItem('emailVerified', emailVerified);
};
