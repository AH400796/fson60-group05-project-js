// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const { signIn, modal } = {
  signIn: document.querySelector('.js-sign-in'),
  modal: document.querySelector('.sign-in-modal'),
};

signIn.addEventListener('click', onClickSignIn);

function onClickSignIn(e) {
  if (e.target !== modal) {
    modal.classList.toggle('visually-hidden');
    signIn.classList.toggle('current');
  }
}
