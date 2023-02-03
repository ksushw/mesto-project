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


const initialCards = [
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

function toggleLike(like) {
  like.addEventListener('click', function (event) {
    like.classList.toggle('card__like_active')
  })
};

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

addButton.addEventListener('click', togglePopupAdd);
popupButtonCloseAdd.addEventListener('click', togglePopupAdd);

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  initialCards.unshift({});
  initialCards[0].name = popupPlace.value;
  initialCards[0].link = popupPictire.value;
  addCard(popupPlace.value, popupPictire.value)
  togglePopupAdd();
}


addForm.addEventListener('submit', handleFormSubmitAdd);


function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const like = cardElement.querySelector('.card__like');
  const deleteButton = cardElement.querySelector('.card__trash-can');
  cardElement.querySelector('.card__photo').src = link;
  cardElement.querySelector('.card__name').textContent = name;
  const image = cardElement.querySelector('.card__photo');
  toggleLike(like);
  deleteCard(deleteButton);
  // handlerDeleteCard
  // handlerToggleLike

  openPopupImg(link, name, image);

  plases.prepend(cardElement);
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}

function deleteCard(deleteButton) {
  deleteButton.addEventListener('click', function () {
    const cardRemove = deleteButton.closest('.card')
    cardRemove.remove();
  })
}


function togglePopupImg() {
  popupImg.classList.toggle('popup_opened');
}

function closePopupImg() {
  popupButtonCloseImg.addEventListener('click', togglePopupImg);
}

closePopupImg();

function openPopupImg(link, title, image) {
  image.addEventListener('click', function () {
    document.querySelector('.popup__image').src = link;
    document.querySelector('.popup__capture').textContent = title;
    togglePopupImg()
  })
}