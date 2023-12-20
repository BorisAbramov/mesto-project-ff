//modals 

function openPopup(modal) { 
    modal.classList.add('popup_is-opened'); 
    document.addEventListener('keyup', handleEsc); 
  } 

//------------------------ 
function closeModal(popup) { 
    popup.classList.remove('popup_is-opened'); 
    document.removeEventListener('keyup', handleEsc); 
  } 

function handleEsc (event){ 
  if (event.key === 'Escape'){ 
    const activePopup = document.querySelector('.popup_is-opened'); 
    closeModal(activePopup); 
  } 
}

export {openPopup, closeModal};