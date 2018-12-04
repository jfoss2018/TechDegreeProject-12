function validate(form) {
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
