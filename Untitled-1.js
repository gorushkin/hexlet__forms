    // if (state.form.password.length >= 6 && state.form.password === state.form.passwordConfirmation) {
    //   state.form.password = 'valid'
    //   console.log('pass is correct');
    // };
    // if (state.form.password.length >= 6) {
    //   console.log('pass is long!!!');
    // } else {
    //   console.log('pass is short!!!');
    // }

    const state = {
      form: {
        formState: 'invalid',
        name: null,
        nameState: 'invalid',
        email: null,
        emailState: 'invalid',
        password: null,
        passState: 'invalid',
        passwordConfirmation: null,
      }
    }
  
    const btn = document.querySelector('[type="submit"]');
  
    watch(state, 'form', () => {
      if (isEmailValid(state.form.email)) {
        console.log(state.form.email);
        state.form.emailState = 'valid'
        // console.log('email is valid');
      } else {
        // console.log('email is not valid');
      };
    });
  
    const form = document.querySelector('[data-form="sign-up"]');
  
    const elements = document.querySelectorAll('[id^="sign-up"]');
    elements.forEach(element => {
      element.addEventListener('change', (e) => {
        const value = e.target.value;
        const name = e.target.name
        state.form[name] = value;
      })
    })
  }




    // const elemnts = [
  //   name = {
  //     name: 'name',
  //     id: 'sign-up-name',
  //     element: form.querySelector('#sign-up-name'),
  //   },
  //   email = {
  //     name: 'email',
  //     id: 'sign-up-email',
  //     element: form.querySelector('#sign-up-email'),
  //   },
  // ];