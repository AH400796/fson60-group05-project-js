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
  document.getElementsByClassName('modal__film-card')[0].style.background = '#B04700';
  document.getElementsByClassName('footer')[0].style.backgroundColor = 'black';
  const collection = document.getElementsByClassName('gallery__title');
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    element.style.color = 'white';
  }
}

function switcherBack() {
  localStorage.removeItem('theme', 'dark');
  moonBtn.classList.add('visually-hidden');
  sunBtn.classList.remove('visually-hidden');
  document.getElementsByTagName('body')[0].style.backgroundColor = '#FFF';
  document.getElementsByClassName('footer')[0].style.backgroundColor = '#f7f7f7';
  const collection = document.getElementsByClassName('gallery__title');
  for (let index = 0; index < collection.length; index++) {
    const element = collection[index];
    element.style.color = 'black';
  }
}
