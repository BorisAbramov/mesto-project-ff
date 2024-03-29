import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getInitialCards, addNewCard, changeProfileData, changeAvatar, deleteCardFromServer, setDislike, setLike } from './components/api.js'
import { createCard, deleteCardFromLayout, toggleLike } from "./components/card.js";

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonClosePopupEdit = popupTypeEdit.querySelector('.popup__close');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupTypeAdd = document.querySelector('.popup_type_new-card');
const buttonClosePopupAdd = popupTypeAdd.querySelector('.popup__close');
const buttonSubmitAddCard = popupTypeAdd.querySelector('.popup__button')
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const buttonCloseImg = popupTypeImage.querySelector('.popup__close');
const popupTypeDelete = document.querySelector('.popup_type_delete');
const buttonPopupDeleteCard = popupTypeDelete.querySelector('.popup__button');
const buttonSubmitEditCard = popupTypeEdit.querySelector('.popup__button');
const formElementAddCard = popupTypeAdd.querySelector('.popup__form');
const formElementEditProfile = popupTypeEdit.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const titleInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const buttonEditAvatar = document.querySelector('.profile__image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
const buttonSubmitAvatarChange = popupTypeEditAvatar.querySelector('.popup__button');
const formElementEditAvatar = popupTypeEditAvatar.querySelector('.popup__form');
const inputAvatar = popupTypeEditAvatar.querySelector('.popup__input');
let cardToDelete;
let cardIdToDelete;
const enableValidationValue = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function fillPopupProfileInputs() {
    titleInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
}

function displayClickedImage(name, url) {  
    popupImage.src = url;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
    openModal(popupTypeImage);
  }

enableValidation(enableValidationValue);

buttonEditProfile.addEventListener('click', function() {
    openModal(popupTypeEdit);
    clearValidation(formElementEditProfile, enableValidationValue);
      fillPopupProfileInputs();
});

buttonAddCard.addEventListener('click', function() {
    openModal(popupTypeAdd);
    clearValidation(formElementAddCard, enableValidationValue);
    // cardNameInput.value = '';
    // urlInput.value = '';
    formElementAddCard.reset();
});

const deleteCardFunction = (cardElement, item) => {
    openModal(popupTypeDelete);
    cardToDelete = cardElement;
    cardIdToDelete = item._id;
  }

const setAndDeleteLike = (e, item, likeCardButton, numberOfLikesElement) => {
// if(e.target.classList.contains('card__like-button_is-active')) {
//     setDislike(item)
//     .then((res) => {
//         toggleLike(likeCardButton, numberOfLikesElement, res.likes.length);
//     })
//     .catch((err) => {
//         console.log('Ошибка. Запрос не выполнен: ' + err);
//     });
//     } else {
//     setLike(item)
//     .then((res) => {
//         toggleLike(likeCardButton, numberOfLikesElement, res.likes.length);
//     })
//     .catch((err) => {
//         console.log('Ошибка. Запрос не выполнен: ' + err);
//     });
//     }
   const likeMethod = e.target.classList.contains('card__like-button_is-active') ? setDislike : setLike;
   likeMethod(item) 
       .then((res) => { 
           toggleLike(likeCardButton, numberOfLikesElement, res.likes.length); 
       }) 
       .catch((err) => { 
           console.log('Ошибка. Запрос не выполнен: ' + err); 
       });
}

buttonPopupDeleteCard.addEventListener('click', function() {
    deleteCardFromServer(cardIdToDelete)
    .then(() => {
        deleteCardFromLayout(cardToDelete);
        closeModal(popupTypeDelete);
        cardToDelete = null;
        cardIdToDelete = null;
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    });
})

Promise.all([getUserData(), getInitialCards()])
.then((data) => {
    const userData = data[0];
    const initialCards = data[1];
    initialCards.forEach(function (item) {
        const cardCopy = createCard(item, userData._id, displayClickedImage, setAndDeleteLike, deleteCardFunction);
        placesList.append(cardCopy);
        })
        
    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.setAttribute('style', `background-image: url(${userData.avatar});`);
    })
.catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ' + err);
});

formElementEditProfile.addEventListener('submit', function(e) {
    e.preventDefault();
    buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-loading');
    changeProfileData({
        name: titleInput.value,
        about: jobInput.value
    })
    .then((res) => {
        profileTitle.textContent = res.name;
        profileJob.textContent = res.about;
        closeModal(popupTypeEdit);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err);
    })
    .finally(() => {
        buttonSubmitEditCard.textContent = buttonSubmitEditCard.getAttribute('data-default-text');
    });
});

document.forms.newPlace.addEventListener('submit', function (event) {
    event.preventDefault();
    buttonSubmitAddCard.textContent = buttonSubmitAddCard.getAttribute('data-loading');

    const { placeName, link } = event.currentTarget.elements;
    
    addNewCard({ 
        name: placeName.value, 
        link: link.value 
      })
    .then((item) => {
        const cardCopy = createCard(item, item.owner._id, displayClickedImage, setAndDeleteLike, deleteCardFunction);
        placesList.prepend(cardCopy); //добавляем в начало
        closeModal(popupTypeAdd);
        })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ' + err)
    })
    .finally(() => {
        buttonSubmitAddCard.textContent = buttonSubmitAddCard.getAttribute('data-default-text');
    });
  });

buttonEditAvatar.addEventListener('click', function() {
    openModal(popupTypeEditAvatar);
    clearValidation(formElementEditAvatar, enableValidationValue);
    inputAvatar.value = '';
})

buttonSubmitAvatarChange.addEventListener('click', function(e) {
    e.preventDefault();
    buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-loading');
    const url = inputAvatar.value;
    changeAvatar(url)
    .then(() => {
        profileImage.setAttribute('style', `background-image: url(${url});`);
        closeModal(popupTypeEditAvatar);
    })
    .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
        buttonSubmitAvatarChange.textContent = buttonSubmitAvatarChange.getAttribute('data-default-text');
    });
})