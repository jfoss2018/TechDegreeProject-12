// The validate function is used by the new user registration form and profile
// form when updating users. It uses the built in HTML5 form validation when composing
// error messages. This function puts the error messages in custom span element error
// message components.
function validate(form) {
  // HTML5 form validation does not have a field comparison option. Here the password
  // and confirm password feilds are collected for comparison.
  let passwordField;
  let cPasswordField;
  const formLength = form.length;
  for (let i=0; i<formLength; i+=1) {
    if (form[i].name === 'password') {
      passwordField = form[i].value;
    } else if (form[i].name === 'confirmPassword') {
      cPasswordField = form[i].value;
    }
  }
  if (form.checkValidity() === false) {
    // If the form fields are invalid, the corresponding invalid inputs' error span
    // elements are filled and displayed.
    for (let i=0; i<formLength; i+=1) {
      const elem = form[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        if (!elem.validity.valid) {
          errorLabel.style.display = 'inline-block';
          errorLabel.textContent = elem.validationMessage;
        } else {
          errorLabel.style.display = 'none';
          errorLabel.textContent = '';
        }
      }
    }
    if (passwordField !== cPasswordField) {
      const errorLabel = document.querySelector('.c-pass');
      errorLabel.style.display = 'inline-block';
      errorLabel.textContent = 'The confirm password field must match the password field.'
    }
    return false;
  } else {
    // If the form fields are valid, the span elements are emptied, and true is returned.
    for (let i=0; i<formLength; i+=1) {
      const elem = form[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        errorLabel.style.display = 'none';
        errorLabel.textContent = '';
      }
    }
    if (passwordField !== cPasswordField) {
      const errorLabel = document.querySelector('.c-pass');
      errorLabel.style.display = 'inline-block';
      errorLabel.textContent = 'The confirm password field must match the password field.'
      return false;
    }
    return true;
  }
}

export {validate};
