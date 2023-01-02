import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';
import { createModalAuthForm } from './create-markup';
import { onClickHome } from './film-card-modal';

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: 'AIzaSyCK5BybKr13x2hdBlDr6frKEP3bzJZuwXQ',
  authDomain: 'filmoteka-d7ac8.firebaseapp.com',
  projectId: 'filmoteka-d7ac8',
  storageBucket: 'filmoteka-d7ac8.appspot.com',
  messagingSenderId: '853577767389',
  appId: '1:853577767389:web:ac886f9fc598e1d5523e34',
  databaseURL: 'https://filmoteka-d7ac8-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);
export const dbRef = ref(database);

const { signIn, signOutBtn, modalBackdrop, library } = {
  signIn: document.querySelector('.header__auth-signIn'),
  signOutBtn: document.querySelector('.header__auth-signOut'),
  modalBackdrop: document.querySelector('.auth__modal-backdrop'),
  library: document.querySelector('.js-library'),
};

signIn.addEventListener('click', onClickSignIn);

if (localStorage.getItem('Authorized')) {
  setSignInInterface();
  setEvenListenerOnSignOut();
}

function onClickSignIn() {
  document.body.classList.add('show-auth-modal');
  createModalAuthForm();
  const { signForm, signInBtn, signUpBtn, googleBtn } = {
    signForm: document.querySelector('.sign-in__form'),
    signInBtn: document.querySelector('.sign-in__btn'),
    signUpBtn: document.querySelector('.sign-up__btn'),
    googleBtn: document.querySelector('.sign-in-with-google__btn'),
  };

  modalBackdrop.addEventListener('click', onClickModalBackdrop);
  window.addEventListener('keydown', closeAtuhModalOnEscKeyPress);
  signForm.addEventListener('submit', onSubmitForm);
  googleBtn.addEventListener('click', onClickGoogleBtn);

  function onSubmitForm(event) {
    event.preventDefault();

    const email = event.target.querySelector('.sign-in__input-email').value;
    const password = event.target.querySelector('.sign-in__input-password').value;

    if (event.submitter === signInBtn) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const userId = userCredential.user.uid;
          localStorage.setItem('userId', userId);
          setAuthorized(userId);

          setSignInInterface();
          closeAuthModal();
          setEvenListenerOnSignOut();

          Notiflix.Notify.success('You successfully SIGN IN!');
        })
        .catch(error => {
          Notiflix.Notify.info('Wrong password or there is no such user. Try again or SIGN UP first!');
        });
    }

    if (event.submitter === signUpBtn) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const userId = userCredential.user.uid;
          localStorage.setItem('userId', userId);
          setAuthorized(userId);
          setSignInInterface();
          closeAuthModal();
          setEvenListenerOnSignOut();
          Notiflix.Notify.success('You successfully SIGN UP!');
        })
        .catch(error => {
          Notiflix.Notify.info('This email is already registered');
        });
    }
  }

  function onClickGoogleBtn() {
    signInWithPopup(auth, provider)
      .then(result => {
        const userId = result._tokenResponse.localId;
        localStorage.setItem('userId', userId);
        setAuthorized(userId);
        setSignInInterface();
        closeAuthModal();
        setEvenListenerOnSignOut();

        Notiflix.Notify.success('You successfully SIGN IN!');
      })
      .catch(error => {});
  }
}

function closeAtuhModalOnEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeAuthModal();
  }
}

function onClickModalBackdrop(event) {
  if (event.currentTarget === event.target) {
    closeAuthModal();
  }
}

function closeAuthModal() {
  document.body.classList.remove('show-auth-modal');
  modalBackdrop.removeEventListener('click', onClickModalBackdrop);
  window.removeEventListener('keydown', closeAtuhModalOnEscKeyPress);
}

function setSignOutInterface() {
  signIn.classList.remove('hidden');
  signOutBtn.classList.add('hidden');
  library.classList.add('hidden');
  signIn.addEventListener('click', onClickSignIn);
}

function setSignInInterface() {
  signIn.removeEventListener('click', onClickSignIn);
  signIn.classList.add('hidden');
  signOutBtn.classList.remove('hidden');
  library.classList.remove('hidden');
}

function setEvenListenerOnSignOut() {
  signOutBtn.addEventListener('click', onClickSignOut);
}

function onClickSignOut() {
  signOut(auth)
    .then(() => {
      onClickHome();
      setSignOutInterface();
      setAnauthorized();
    })
    .catch(error => {});
}

function setAuthorized(userId) {
  localStorage.setItem('Authorized', 'true');
  get(child(dbRef, `users/${userId}`))
    .then(snapshot => {
      localStorage.setItem('BUTTON_WACHED_ASSIGNMENT', snapshot.val()?.watchAssign?.watchAssign || '{}');
      localStorage.setItem('BUTTON_QUEUE_ASSIGNMENT', snapshot.val()?.queueAssign?.queueAssign || '{}');
      localStorage.setItem(`KEY_WATCHED`, snapshot.val()?.watched?.watched || '[]');
      localStorage.setItem(`KEY_QUEUE`, snapshot.val()?.queue?.queue || '[]');
      localStorage.setItem('CLICKED_FILMS', snapshot.val()?.clicked?.clicked || '{}');
    })
    .catch(error => {
      console.error(error);
    });
}

function setAnauthorized() {
  localStorage.removeItem('Authorized');
  localStorage.removeItem(`KEY_CURRENT`);
  localStorage.removeItem(`KEY_WATCHED`);
  localStorage.removeItem(`KEY_QUEUE`);
  localStorage.removeItem('CLICKED_FILMS');
  localStorage.removeItem('BUTTON_WACHED_ASSIGNMENT');
  localStorage.removeItem('BUTTON_QUEUE_ASSIGNMENT');
  localStorage.removeItem('userId');
}
