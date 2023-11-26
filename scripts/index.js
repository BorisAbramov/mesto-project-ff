const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onDelete);

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