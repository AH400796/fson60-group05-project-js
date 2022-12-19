import * as basicLightbox from 'basiclightbox'
import andrUrl from '../images/footer/АндрійГохман.jpg';
import uraaUrl from '../images/footer/ЮрійКириченко.jpg';
import antoniaUrl from '../images/footer/АнтонКошевой.jpg';
import dansUrl from '../images/footer/ДанилоБандура.jpg';
import darrUrl from '../images/footer/ДаринаПільганчук.jpg';
import daniyaUrl from '../images/footer/ДаніілКозлов.jpg';
import oksrUrl from '../images/footer/ОксанаЗахарія.jpg';
import olexandrUrl from '../images/footer/ОлексійСамохін.jpg';
import olgaUrl from '../images/footer/ОльгаКонотоп.jpg';
import svitlanaUrl from '../images/footer/СвітланаЧудак.jpg';
import serhUrl from '../images/footer/СергійЯценко.jpg';
import uriyUrl from '../images/footer/ЮрійПетренко.jpg';
import ihorUrl from '../images/footer/ІгорЯкимчук.jpg';
import irunUrl from '../images/footer/ІринаКрикун.jpg';

const markup = `<div class="team-wrapper">
<h2 class="team-title">“14 друзів Промісу”</h2>
<p class="team-text">DEVELOPER TEAM</p>
<ul class="team__list">
<li class="team-card">
<div class="image-bg">
 <img src="${andrUrl}" alt="Андрій" class="team-image"></div>
    <p class="team-name">Андрій Гохман</p>
    <p class="team-role">Team Lead</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${uraaUrl}" alt="Юрій" class="team-image"></div>
    <p class="team-name">Юрій Кириченко</p>
    <p class="team-role">Scrum Master</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${antoniaUrl}" alt="" class="team-image"></div>
    <p class="team-name">Антон Кошевой</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${dansUrl}" alt="Denis" class="team-image"></div>
    <p class="team-name">Данило Бандура</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${darrUrl}" alt="Ihor" class="team-image"></div>
    <p class="team-name">Дарина Пільганчук</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${daniyaUrl}" alt="" class="team-image"></div>
    <p class="team-name">Данііл Козлов</p>
    <p class="team-role">Developer</p>
    </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${oksrUrl}" alt="Vladymyr" class="team-image"></div>
    <p class="team-name">Оксана Захарія</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${uriyUrl}" alt="" class="team-image"></div>
    <p class="team-name">Юрій Петренко</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${olexandrUrl}" alt="" class="team-image"></div>
    <p class="team-name">Олексій Самохін</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${irunUrl}" alt="" class="team-image"></div>
    <p class="team-name">Ірина Крикун</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${olgaUrl}" alt="" class="team-image"></div>
    <p class="team-name">Ольга Конотоп</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${serhUrl}" alt="" class="team-image"></div>
    <p class="team-name">Сергій Яценко</p>
    <p class="team-role">Developer</p>
  </li>
  <li class="team-card">
  <div class="image-bg">
    <img src="${svitlanaUrl}" alt="" class="team-image"></div>
    <p class="team-name">Світлана Чудак</p>
    <p class="team-role">Developer</p>
  </li>
  
  <li class="team-card">
  <div class="image-bg">
    <img src="${ihorUrl}" alt="" class="team-image"></div>
    <p class="team-name">Ігор Якимчук</p>
    <p class="team-role">Developer</p>
  </li>
  </ul>
</div>`;

const footerEl = document.querySelector('.footer__modal-js');
console.log(footerEl)
footerEl.addEventListener('click', openModal);

const modalEl = basicLightbox.create(markup);

function openModal(e) {
  e.preventDefault();
  modalEl.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modalEl.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
