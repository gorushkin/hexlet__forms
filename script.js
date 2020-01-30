const errorMessages = {
  email: {
    valid: 'Value is not a valid email',
  },
  password: {
    length: 'Must be at least 6 letters',
    match: 'Password confirmation does not match to password',
  },
};

const validate = (fields) => { // pure function
  const errors = {};
  if (fields.email && !fields.email.includes('@')) {
    errors.email = errorMessages.email.valid;
  }
  if (fields.password.length < 6) {
    errors.password = errorMessages.password.length;
  } else if (fields.password !== fields.passwordConfirmation) {
    errors.password = errorMessages.password.match;
  }

  return errors;
};

const updateValidationState = (state) => {
  const errors = validate(state.form.fields);
  state.form.errors = errors;
  state.form.valid = isEqual(errors, {});
}

const app = () => {
  const state = {
    form: {
      processState: 'filling',
      fields: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      valid: false,
      errors: {},
    },
  };

  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');

  const fieldElements = {
    name: document.getElementById('sign-up-name'),
    email: document.getElementById('sign-up-email'),
    password: document.getElementById('sign-up-password'),
    passwordConfirmation: document.getElementById('sign-up-password-confirmation'),
  };
  
  Object.entries(fieldElements).forEach(([name, element]) => {
    element.addEventListener('input', (e) => {
      state.form.fields[name] = e.target.value;
      updateValidationState(state);  
    })    
  });

  watch(state.form, 'errors', () => {
    console.log('watcher');
  });

}

app();