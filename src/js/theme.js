const sunBtn = document.getElementById('sun');
const moonBtn = document.getElementById('moon');
sunBtn.addEventListener('click', switcher);
moonBtn.addEventListener('click', switcherBack);

setTheme();
function setTheme() {
  localStorage.getItem('theme', 'dark') ? switcher() : switcherBack();
}

function switcher() {
  localStorage.setItem('theme', 'dark');
  sunBtn.classList.add('visually-hidden');
  moonBtn.classList.remove('visually-hidden');
  document.getElementsByTagName('body')[0].style.backgroundColor = '#111417';
  document.getElementsByTagName('body')[0].style.color = 'white';
  document.getElementsByClassName('footer')[0].style.backgroundColor = '#070707';
  const collection = document.getElementsByClassName('gallery__title');
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    element.style.color = 'white';
  }
  document.getElementsByClassName('modal__film-card-wrapper')[0].classList.add('modal__film-card-wrapper-dark');
  document.getElementsByClassName('modal__film-card-wrapper')[0].style.backgroundColor = '#070707';
  document.getElementsByClassName('modal__svg')[0].style.backgroundColor = 'darkorange';
  document.getElementsByClassName('modal__svg')[0].style.fill = 'white';
}

function switcherBack() {
  localStorage.removeItem('theme', 'dark');
  moonBtn.classList.add('visually-hidden');
  sunBtn.classList.remove('visually-hidden');
  document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
  document.getElementsByTagName('body')[0].style.color = 'black';
  document.getElementsByClassName('footer')[0].style.backgroundColor = '#f7f7f7';
  const collection = document.getElementsByClassName('gallery__title');
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    element.style.color = 'black';
  }
  document.getElementsByClassName('modal__film-card-wrapper')[0].classList.remove('modal__film-card-wrapper-dark');
  document.getElementsByClassName('modal__film-card-wrapper')[0].style.backgroundColor = 'white';
  document.getElementsByClassName('modal__svg')[0].style.backgroundColor = 'white';
  document.getElementsByClassName('modal__svg')[0].style.fill = 'black';
}
