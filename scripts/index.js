const showEditProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup'); 

const popupEdit = document.querySelector('.popup_type_edit'); 
const popupAddCard = document.querySelector('.popup_type_new-card'); 
const popupImage = document.querySelector('.popup_type_image'); 

const popupClose = document.querySelector('.popup__close'); 

const profileName = document.getElementById('name'); //берем имя из профиля страницы 
const profileJob = document.getElementById('job'); //берем профессию из профиля страницы 

const inputName = document.getElementById('inputName'); //берем имя из инпут-формы 
const inputJob = document.getElementById('inputJob'); //берем профессию из инпут-формы 

const formElement = document.querySelector('.popup__form'); 

//modals 
const editModal = document.querySelector('.popup_type_edit'); 
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

//open modal buttons 
const openEditModalButton= document.querySelector('.profile__edit-button');
const openAddCardModalButton= document.querySelector('.profile__add-button');

//close modal buttons 
const closeEditModalButton= editModal.querySelector('.popup__close');
const closeAddCardModalButton= addCardModal.querySelector('.popup__close');
const closeImageModalButton= imageModal.querySelector('.popup__close');

//popup добавления фоток 
const popupAdd = document.querySelector('.popup-add'); 
const formElementAdd = document.querySelector('#popup-add__form'); 
const showImageAdd = document.querySelector('.profile__add'); 

const popupImgPic = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption'); 


const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function openPopup(modal) { 
  modal.classList.add('popup_is-opened'); 
  document.addEventListener('keyup', handleEsc); 
} 

function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onDelete);
  
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

function addCard(item) {
  cardsContainer.append(item);
}

initialCards.forEach((item) => {
  const cardData = createCard(item, deleteCard);
  addCard(cardData);
})


//----отправка редактирование профиля 

formElement.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  closeModal(editModal); 
  profileName.textContent = inputName.value; 
  profileJob.textContent = inputJob.value; 
  formElement.reset(); 
});  

// ------отправка добавления карточек 

formElementAdd.addEventListener('submit', function(ev) { 
  ev.preventDefault(); 
  closeModal(addCardModal); 
  const name = ev.target.querySelector('#formAddInputName').value; 
  const link = ev.target.querySelector('#formAddInputLink').value; 
  const item = {name, link}; 
  addCard(item);
  formElementAdd.reset(); 
  const button = addCardModal.querySelector('.popup__button');
  button.setAttribute("disabled", true); 
  button.classList.add('popup__button_inactive'); 
});

//---------------------------------- 

function handleEsc (event){ 
  if (event.key === 'Escape'){ 
    const activePopup = document.querySelector('.popup_is-opened'); 
    closeModal(activePopup); 
  } 
} 

//------------------------ 
function closeModal(popup) { 
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keyup', handleEsc); 
} 

popupEdit.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('popup_type_edit') || evt.target.classList.contains('popup__close')){ 
    const popupOpened = document.querySelector('.popup_is-opened'); 
    closeModal(popupOpened); 
  } 
}) 

popupAddCard.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('popup_type_add-card') || evt.target.classList.contains('popup__close')){ 
    const popupOpened = document.querySelector('.popup_is-opened'); 
    closeModal(popupOpened); 
  }
}) 

popupImage.addEventListener('click', function(evt){ 
  if (evt.target.classList.contains('popup_type_image') || evt.target.classList.contains('popup__close')){ 
    const popupOpened = document.querySelector('.popup_is-opened'); 
    closeModal(popupOpened); 
  }
}) 

//----открытие редактирования профиля 
openEditModalButton.addEventListener('click', () => { 
  inputName.value = profileName.textContent; 
  inputJob.value = profileJob.textContent; 
  openPopup(editModal); 
}) 

//-----открытие добавления карточек 
openAddCardModalButton.addEventListener('click', () => { 
  openPopup(addCardModal); 
})