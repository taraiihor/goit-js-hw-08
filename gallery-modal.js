import galleryItems from './gallery-items.js';
const galleryConteiner = document.querySelector('.js-gallery');
const createGallery = createGalleryMarkup(galleryItems);
galleryConteiner.insertAdjacentHTML('beforeend', createGallery);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" /></a></li>`;
    })
    .join('');
}

galleryConteiner.addEventListener('click', onOpenModal);
const windowBoxItem = document.querySelector('.lightbox');
const boxImageEl = document.querySelector('.lightbox__image');

function onOpenModal(event) {
  event.preventDefault();

  const imagaOreginalUrl = event.target.dataset.source;
  const imagaOreginalAlt = event.target.alt;
  boxImageEl.src = imagaOreginalUrl;
  boxImageEl.alt = imagaOreginalAlt;
  windowBoxItem.classList.add('is-open');
  window.addEventListener('keydown', onEscKeyPress);
}

const onCloseBtn = document.querySelector('.lightbox__button');
onCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  windowBoxItem.classList.remove('is-open');
  boxImageEl.src = '';
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onBackdropModal);

function onBackdropModal(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
