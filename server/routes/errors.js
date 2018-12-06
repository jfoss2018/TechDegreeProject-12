
const newError = {};

newError.registrationError = function() {
  const err = new Error('It looks like you already have an account set up with this username.');
  err.status = '409';
  return err;
}

newError.serverError = function() {
  const err = new Error('Internal Server Error. Please try again at a later time.');
  err.status = '500';
  return err;
}

newError.loginError = function() {
  const err = new Error('This username and/or password is invalid.');
  err.status = '401';
  return err;
}

newError.picError = function() {
  const err = new Error('Only .jpg & .png files can be uploaded.');
  err.status = '400';
  return err;
}

module.exports = newError;
