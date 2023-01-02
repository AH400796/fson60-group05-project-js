import * as basicLightbox from 'basiclightbox';
import andrUrl from '../images/footer/Gohman.jpg';
import uraaUrl from '../images/footer/Kuruchenko.jpg';
import antoniaUrl from '../images/footer/Koshevoi.jpg';
import dansUrl from '../images/footer/Bandura.jpg';
import darrUrl from '../images/footer/Pilganchuk.jpg';
import daniyaUrl from '../images/footer/Kozlov.jpg';
import oksrUrl from '../images/footer/Zaharia.jpg';
import olexandrUrl from '../images/footer/Samohin.jpg';
import olgaUrl from '../images/footer/Konotop.jpg';
import svitlanaUrl from '../images/footer/Chudak.jpg';
import serhUrl from '../images/footer/Yacenko.jpg';
import uriyUrl from '../images/footer/Petrenko.jpg';
import ihorUrl from '../images/footer/Yakumchuk.jpg';
import irunUrl from '../images/footer/Krukyn.jpg';

const markup = `<div class="team-wrapper">
<p class="team-text">DEVELOPER TEAM&nbsp</p>
<h2 class="team-title">&nbsp"14 друзів промісу"</h2>

<ul class="team__list">
<li class="team-card">
<div class="image-bg">
 <img src="${andrUrl}" alt="Andria" class="team-image"></div>
    <p class="team-name">Андрій Гохман</p>
    <p class="team-role">Team Lead</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${uraaUrl}" alt="Yuriy" class="team-image"></div>
    <p class="team-name">Юрій Кириченко</p>
    <p class="team-role">Scrum Master</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${antoniaUrl}" alt="Anton" class="team-image"></div>
    <p class="team-name">Антон Кошевой</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${dansUrl}" alt="Danilo" class="team-image"></div>
    <p class="team-name">Данило Бандура</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${darrUrl}" alt="Darina" class="team-image"></div>
    <p class="team-name">Дарина Пільганчук</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${daniyaUrl}" alt="Daniil" class="team-image"></div>
    <p class="team-name">Данііл Козлов</p>
    <p class="team-role">Developer</p>
    </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${oksrUrl}" alt="Oksana" class="team-image"></div>
    <p class="team-name">Оксана Захарія</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${uriyUrl}" alt="Yuriy" class="team-image"></div>
    <p class="team-name">Юрій Петренко</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${olexandrUrl}" alt="Alex" class="team-image"></div>
    <p class="team-name">Олексій Самохін</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${irunUrl}" alt="Iruna" class="team-image"></div>
    <p class="team-name">Ірина Крикун</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${olgaUrl}" alt="Olga" class="team-image"></div>
    <p class="team-name">Ольга Конотоп</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${serhUrl}" alt="Sergii" class="team-image"></div>
    <p class="team-name">Сергій Яценко</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${svitlanaUrl}" alt="Svitlana" class="team-image"></div>
    <p class="team-name">Світлана Чудак</p>
    <p class="team-role">Developer</p>
  </li>
  
  <li class="team-card">
  <div class="image-bg">
    <img src="${ihorUrl}" alt="Ihor" class="team-image"></div>
    <p class="team-name">Ігор Якимчук</p>
    <p class="team-role">Developer</p>
  </li>
  </ul>
</div>`;

const footerEl = document.querySelector('.footer__modal-js');
footerEl.addEventListener('click', openModal);

const modalEl = basicLightbox.create(markup, {
  onClose: () => {
    document.body.classList.remove('show-modal1');
  },
});

function openModal(e) {
  e.preventDefault();
  modalEl.show();
  document.body.classList.add('show-modal1');
  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modalEl.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
