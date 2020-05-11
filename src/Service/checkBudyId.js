/**
 * moveAdditionalInfo
 * @param {boolean} auth
 * @param {string} id
 * @param {object} history
 */
export default function(auth, id, history) {
  if (!auth) {
    history.push('/');
    return false;
  } else if (!id) {
    history.push('/signup/social');
    return false;
  } else {
    return true;
  }
}
