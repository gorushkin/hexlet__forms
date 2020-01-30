const app = () => {
  const state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  // const elements = {
  //   form: document.querySelector('[data-form="sign-up"]'),
  //   name: document.getElementById('sign-up-name'),
  //   email: document.getElementById('sign-up-email'),
  //   password: document.getElementById('sign-up-password'),
  //   passwordConfirmation: document.getElementById('sign-up-password-confirmation'),
  //   btn: document.querySelector('[type="submit"]'),
  // }

  // const inputs = [
  //   elements.name,
  //   elements.email,
  //   elements.password,
  //   elements.passwordConfirmation
  // ];

  // const inputHandle = (elem) => (e) => {
  // }

  // const blurHandle = (elem) => (e) => {
  //   const name
  // }

  const form = document.querySelector('[data-form="sign-up"]');
  console.log('form: ', form);
  console.log('form: ', form.elements);

  const {
    name,
    email,
    password,
    passwordConfirmation,
  } = form.elements;

  const elements = [name, email, password, passwordConfirmation];
  elements.forEach(elem => {
    elem.addEventListener('input', inputHandle(elem));
    elem.addEventListener('blur', blurHandle(elem));
  })

  // inputs.forEach(elem => {
  //   elem.addEventListener('input', inputHandle(elem));
  //   elem.addEventListener('blur', blurHandle(elem));
  // })
}

app();