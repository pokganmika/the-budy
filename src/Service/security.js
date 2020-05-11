/**
 *
 * @param {string} password
 */
export default function passwordSecurityGrade(password) {
  if (password.length < 8) return 1;

  let complexity = 0;
  let digit = 0;
  let letter = 0;
  let cap = 0;
  let other = 0;

  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;
  const pattern3 = /[?~!@#$%^&*()_+=-`{}|;':",.<>]/;

  for (let i = 0; i < password.length; i++) {
    if (pattern1.test(password[i]) && i !== password.length - 1) {
      digit = 1;
    } else if (pattern2.test(password[i])) {
      if (password[i] === password[i].toLowerCase()) {
        letter = 1;
      } else if (password[i] === password[i].toUpperCase()) {
        cap = 1;
      }
    } else if (pattern3.test(password[i])) {
      other = 1;
    }
  }

  complexity = digit + letter + cap + other;

  return complexity;
}
