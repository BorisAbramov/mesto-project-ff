import {openPopup} from './modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const popupImgPic = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption');
const imageModal = document.querySelector('.popup_type_image');

function createCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
  
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', onDelete);
    
    const listItemLike = cardElement.querySelector('.card__like-button'); 
    listItemLike.addEventListener('click', (evt) => { 
      evt.target.classList.toggle('card__like-button_is-active'); 
    })
  
    const imgClickHandler = (evt) => {
      popupImgPic.src = cardData.link;
      popupImgText.textContent = cardData.name;
      openPopup(imageModal) 
    } 
    
    cardImage.addEventListener('click', function(evt) { 
      imgClickHandler(); 
    })
  
    return cardElement;
  }
  
  function deleteCard(event) {
    const cardListItem = event.target.closest('.card');
    cardListItem.remove();
  }
  
  function addCard(cardData) {
    cardsContainer.prepend(cardData);
  }

export {createCard, deleteCard, addCard};