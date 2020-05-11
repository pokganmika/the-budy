const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();
const usernameSchema = new passwordValidator();
const budyIdSchema = new passwordValidator();
const shortBioSchema = new passwordValidator();

function emailSchema(val) {
  const regularExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/i;
  return regularExp.test(val);
}

passwordSchema
  .is()
  .min(8)
  .is()
  .max(15)
  .has()
  .digits()
  .has()
  .lowercase()
  .has()
  .not()
  .spaces();

usernameSchema.is().min(4).is().max(30);

budyIdSchema.has(/^[0-9a-zA-Z_]{4,30}$/);

shortBioSchema.is().max(200);

export {
  emailSchema,
  passwordSchema,
  usernameSchema,
  budyIdSchema,
  shortBioSchema,
};
