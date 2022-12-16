import * as basicLightbox from 'basiclightbox';

const markup = `<div class="team-wrapper"><div class="team-card">
    <img src="./src/images/footer/Андрій Гохман.jpg" alt=" class="team-image">
    <p class="team-name">Андрій Гохман</p>
    <p class="team-role">Team Lead</p>
</div>
<div class="team-card">
    <img src="" alt="Olga" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Scrum Master</p>
</div>
<div class="team-card">
    <img src="" alt="Daria" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="" alt="Denis" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="" alt="Ihor" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="" alt="" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="" alt="Vladymyr" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <img src="" alt="" class="team-image">
    <p class="team-name"></p>
    <p class="team-role">Developer</p>
</div></div>`;

const footerEl = document.querySelector('.footer__modal-js');
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
