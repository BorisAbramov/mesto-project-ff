// @todo: Темплейт карточки
const listElementTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const list = document.querySelector('places__list');

// @todo: Функция создания карточки

function createCard(item) { 
  let listItem = document.querySelector('.places__item card');
  let listItemImage = document.querySelector('.card__image');
  let listItemTitle = document.querySelector('.card__title');
  let listItemBasket = document.querySelector('.card__delete-button');
  let listItemLike = document.querySelector('.card__like-button');
  
  listItemImage.src = item.link;
  listItemTitle.textContent = item.name;
  listItemImage.alt = item.name;
 
  
  let listItemBasketList = listItemBasket.closest('.places__item card');
  listItemBasket.addEventListener('click', (evt) => {listItemBasketList.remove()});
  listItemLike.addEventListener('click', (evt) => {evt.target.classList.toggle('card__like-button_is-active')});

  return listItem;
 
  }; 
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach(item => { 
    createCard(item);
    list.prepend(listItem); 
});