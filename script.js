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
  if (reg.test(email) == false) {
    return false;
  }
  return true;
}

const app = () => {
  const state = {
    form: {
      formState: 'invalid',
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    }
  }

  const btn = document.querySelector('[type="submit"]');

  watch(state, 'form', () => {
    console.clear();
    console.log('watching!!!');
    // if (state.form.name.length > 5) {
    //   console.log('open gates');
    //   btn.disabled = false;
    //   console.log(state.form.name);
    // }
    if (isEmailValid(state.form.email)) {
      console.log('open gates');
    }


    // if (state.form.password === state.form.passwordConfirmation) {
    //   btn.disabled = false;
    // }
  });

  const form = document.querySelector('[data-form="sign-up"]');

  const elements = document.querySelectorAll('[id^="sign-up"]');
  elements.forEach(element => {
    element.addEventListener('input', (e) => {
      const value = e.target.value;
      const name = e.target.name
      state.form[name] = value;
    })
  })
}

app();