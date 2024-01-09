function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeByClick);
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(e) {
  if(e.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
  } 
}

function closeByClick(e) {
  if(e.target === e.currentTarget || e.target.classList.contains('popup__close')) {
      closeModal(e.currentTarget);
  }
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeByClick);
  document.removeEventListener('keydown', closeByEsc);
}

export { openModal, closeModal }; 