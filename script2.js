const routes = {
  usersPath: () => '/users',
}

const errorMessages = {
  email: {
    valid: 'Value is not a valid email',
  },
  password: {
    length: 'Must be at least 6 letters',
    match: 'Password confirmation does not match to password',
  },
};

const isEmailValid = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false && email !== '') {
    return false;
  }
  return true;
}

const renderAddError = (element, msg) => {
  const parent = element.parentNode;
  const errorBlock = parent.querySelector('.invalid-feedback');
  if (errorBlock) {
    parent.removeChild(errorBlock);
  }
  const div = document.createElement('div');
  div.textContent = msg;
  div.classList.add('invalid-feedback');
  parent.appendChild(div);
  element.classList.add('is-invalid');
}

const renderRemoveError = (element) => {
  const parent = element.parentNode;
  const errorBlock = parent.querySelector('.invalid-feedback');
  element.classList.remove('is-invalid');
  if (errorBlock) {
    parent.removeChild(errorBlock);
  }
}

const app = () => {
  const state = {
    form: {
      formState: 'invalid',
      name: '',
      nameState: 'invalid',
      email: '',
      emailState: 'invalid',
      password: '',
      passStateLength: 'invalid',
      passwordConfirmation: '',
      passStateMatch: 'invalid',
    }
  }

  const btn = document.querySelector('[type="submit"]');
  const domElements = {
    name: document.getElementById('sign-up-name'),
    email: document.getElementById('sign-up-email'),
    password: document.getElementById('sign-up-password'),
    passwordConfirmation: document.getElementById('sign-up-password-confirmation'),
  }

  watch(state, 'form', () => {
    if (isEmailValid(state.form.email)) {
      state.form.emailState = 'valid';
      renderRemoveError(domElements.email);
    } else {
      state.form.emailState = 'invalid';
      renderAddError(domElements.email, errorMessages.email.valid);
    };

    if (state.form.password.length >= 6 || state.form.password == '') {
      state.form.passStateLength = 'valid';
      renderRemoveError(domElements.password);
    } else {
      state.form.passStateLength = 'invalid';
      renderAddError(domElements.password, errorMessages.password.length);
    };

    if (state.form.password === state.form.passwordConfirmation || state.form.passwordConfirmation === '') {
      state.form.passStateMatch = 'valid';
      renderRemoveError(domElements.passwordConfirmation);
    } else {
      state.form.passStateMatch = 'invalid';
      renderAddError(domElements.passwordConfirmation, errorMessages.password.match);
    };

    if (state.form.emailState === 'valid' && state.form.passStateLength === 'valid' && state.form.passStateMatch === 'valid') {
      state.form.formState = 'valid';
      btn.disabled = false;
    }

  });

  const form = document.querySelector('[data-form="sign-up"]');



  // console.log('domElements: ', domElements);

  const elements = document.querySelectorAll('[id^="sign-up"]');
  elements.forEach(element => {
    element.addEventListener('change', (e) => {
      const value = e.target.value;
      const name = e.target.name
      state.form[name] = value;
    })
  })
}

app();