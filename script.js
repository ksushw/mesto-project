const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupButtonClose = document.querySelector('.popup__button-close');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add');

const addForm = document.querySelector('.popup__form_add');
const popupPlace = document.querySelector('.popup__input_place');
const popupPictire = document.querySelector('.popup__input_url');
const popupButtonCloseAdd = document.querySelector('.popup__button-close_add');

const plases = document.querySelector('.places')

const popupImg = document.querySelector('.popup_type_img');
const popupButtonCloseImg = document.querySelector('.popup__button-close_img');


const cardList = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function togglePopupEdit() {
  popupEdit.classList.toggle('popup_opened');
}

function openPopupEdit() {
  togglePopupEdit();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

profileEdit.addEventListener('click', openPopupEdit);
popupButtonClose.addEventListener('click', togglePopupEdit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopupEdit();
}

formElement.addEventListener('submit', handleFormSubmit);

function togglePopupAdd() {
  popupAdd.classList.toggle('popup_opened');
}

function removeValuePopupAdd() {
  popupPlace.value = '';
  popupPictire.value = '';
}

addButton.addEventListener('click', function () {
  removeValuePopupAdd()
  togglePopupAdd();
});

popupButtonCloseAdd.addEventListener('click', togglePopupAdd);

function addCardInArray(cardList, name, link) {
  cardList.unshift({});
  cardList[0].name = name;
  cardList[0].link = link;
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const like = cardElement.querySelector('.card__like');
  const deleteButton = cardElement.querySelector('.card__trash-can')
  const image = cardElement.querySelector('.card__photo');

  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__name').textContent = name;

  handlerLike(like);
  handlerDeleteCard(deleteButton);
  handleImgOpen(link, name, image);

  plases.prepend(cardElement);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  addCardInArray(cardList, popupPlace.value, popupPictire.value)
  addCard(popupPlace.value, popupPictire.value);
  togglePopupAdd();
}

addForm.addEventListener('submit', handleFormSubmitAdd);

function renderCards() {
  for (let i = 0; i < cardList.length; i++) {
    addCard(cardList[i].name, cardList[i].link);
  }
}

renderCards();


function handlerLike(like) {
  like.addEventListener('click', function (event) {
    like.classList.toggle('card__like_active')
  })
};

function deleteCard(card) {
  card.remove();
}

function handlerDeleteCard(deleteButton) {
  deleteButton.addEventListener('click', function () {
    const cardRemove = deleteButton.closest('.card')
    deleteCard(cardRemove)
  })
}

function deleteCard(card) {
  card.remove();
}

function togglePopupImg() {
  popupImg.classList.toggle('popup_opened');
}

function handleImgOpen(link, title, card) {
  card.addEventListener('click', function () {
    document.querySelector('.popup__image').src = link;
    document.querySelector('.popup__capture').textContent = title;
    togglePopupImg()
  })
}

function handlerClosePopupImg() {
  popupButtonCloseImg.addEventListener('click', togglePopupImg);
}

handlerClosePopupImg();

