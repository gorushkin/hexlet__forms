const errorMessages = {
  email: {
    valid: 'Value is not a valid email',
  },
  password: {
    length: 'Must be at least 6 letters',
    match: 'Password confirmation does not match to password',
  },
};

const routes = {
  usersPath: () => '/users',
}

const formhandle = (state, form) => (e) => {
  e.preventDefault();
  // const formData = new FormData(form);
  form.action = '/users';
  form.method = 'POST';
  form.submit();
}

const isEmailValid = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false) {
    return false;
  }
  return true;
}

const addErrorBlock = (element, msg) => {
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

const removeErrorBlock = (element) => {
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
      name: {
        errorStatus: false,
        state: 'invalid',
        value: '',
      },
      email: {
        errorStatus: false,
        state: 'invalid',
        value: '',
      },
      password: {
        errorStatus: false,
        state: 'invalid',
        value: '',
      },
      passwordConfirmation: {
        errorStatus: false,
        state: 'invalid',
        value: '',
      },
    }
  }

  const form = document.querySelector('[data-form="sign-up"]');
  const btn = form.querySelector('[type="submit"]');

  const checkReadyState = (state) => {
    if (state.form.name.state === 'valid' && state.form.email.state === 'valid' && state.form.password.state === 'valid' && state.form.passwordConfirmation.state === 'valid') {
      state.form.formState = 'valid';
    } else {
      state.form.formState = 'invalid';
    };
  }

  watch(state, 'form', () => {
    // console.log(state.form.formState);
    console.log(state.form.name.value);
    if (state.form.email.errorStatus) {
      addErrorBlock(elements.email, errorMessages.email.valid);
    } else {
      removeErrorBlock(elements.email);
    }

    if (state.form.password.errorStatus) {
      addErrorBlock(elements.password, errorMessages.password.length);
    } else {
      removeErrorBlock(elements.password);
    }

    if (state.form.passwordConfirmation.errorStatus) {
      addErrorBlock(elements.passwordConfirmation, errorMessages.password.match);
    } else {
      removeErrorBlock(elements.passwordConfirmation);
    }

    if (state.form.formState === 'valid') {
      btn.disabled = false;
    }
  });


  const elements = {
    name: form.querySelector('#sign-up-name'),
    email: form.querySelector('#sign-up-email'),
    password: form.querySelector('#sign-up-password'),
    passwordConfirmation: form.querySelector('#sign-up-password-confirmation'),
  }

  elements.name.addEventListener('change', (e) => {
    // e.preventDefault();
    const value = e.target.value;
    state.form.name.value = value;
    if (value !== '') {
      state.form.name.state = 'valid';
    } else {
      state.form.name.state = 'invalid';
    }
    checkReadyState(state);
  });

  elements.email.addEventListener('change', (e) => {
    e.preventDefault();
    const value = e.target.value;
    state.form.email.value = value;
    if (isEmailValid(value)) {
      state.form.email.state = 'valid';
      state.form.email.errorStatus = false;
    } else {
      state.form.email.state = 'invalid';
      state.form.email.errorStatus = true;
    }
    if (value === '') {
      state.form.email.errorStatus = false;
    }
    checkReadyState(state);
  });

  elements.password.addEventListener('change', (e) => {
    e.preventDefault();
    const value = e.target.value;
    state.form.password.value = value;
    if (value.length >= 6) {
      state.form.password.state = 'valid';
      state.form.password.errorStatus = false;
    } else {
      state.form.password.state = 'invalid';
      state.form.password.errorStatus = true;
    }
    if (value === '') {
      state.form.password.errorStatus = false;
    }
    checkReadyState(state);
  });

  elements.passwordConfirmation.addEventListener('change', (e) => {
    e.preventDefault();
    const value = e.target.value;
    state.form.email.value = value;
    if (value === state.form.password.value) {
      state.form.passwordConfirmation.state = 'valid';
      state.form.passwordConfirmation.errorStatus = false;
    } else {
      state.form.passwordConfirmation.state = 'invalid';
      state.form.passwordConfirmation.errorStatus = true;
    }
    if (value === '') {
      state.form.passwordConfirmation.errorStatus = false;
    }
    checkReadyState(state);
  });

  form.addEventListener('submit', formhandle(state, form));
}

app();


const form = document.querySelector('[data-form="sign-up"]');
const nameInput = document.getElementById('sign-up-name');
const emailInput = document.getElementById('sign-up-email');
const passwordInput = document.getElementById('sign-up-password');
const passwordConfirmationInput = document.getElementById('sign-up-password-confirmation');