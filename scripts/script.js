const profileEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__button-close');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add');

const addForm = document.forms["add-picture"];
const popupPlace = document.querySelector('.popup__input_place');
const popupPictire = document.querySelector('.popup__input_url');

const plases = document.querySelector('.places')

const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');

const popupImg = document.querySelector('.popup_type_img');




const cardList = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Склоны гор'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Зимняя речка'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Многоквартирные дома'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Равнина с растениями и гора'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железнодорожная дорога сквозь лес'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Скалы на заснеженном побережье'
  }
];

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function openPopupEdit() {
  togglePopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

profileEdit.addEventListener('click', openPopupEdit);

closeButtons.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function(){
    togglePopup(popup)
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEdit);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function () {
  togglePopup(popupAdd);
});

function createCard(name, link, alt) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const like = cardElement.querySelector('.card__like');
  const deleteButton = cardElement.querySelector('.card__trash-can')
  const image = cardElement.querySelector('.card__photo');
  const cardName = cardElement.querySelector('.card__name');

  image.src = link;
  image.alt = alt;
  cardName.textContent = name;

  handleLike(like);
  handleDeleteCard(deleteButton);
  handleImgOpen(link, name, image, alt);
  return cardElement;
}


function addCard(name, link, alt) {
  const cardElement = createCard(name, link, alt)
  plases.prepend(cardElement);
}


function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(popupPlace.value, popupPictire.value);
  evt.target.reset();
  togglePopup(popupAdd);
}

addForm.addEventListener('submit', handleAddFormSubmit);

function renderCards() {
  for (let i = 0; i < cardList.length; i++) {
    addCard(cardList[i].name, cardList[i].link, cardList[i].alt);
  }
}

renderCards();


function handleLike(like) {
  like.addEventListener('click', function (event) {
    like.classList.toggle('card__like_active')
  })
};

function deleteCard(card) {
  card.remove();
}

function handleDeleteCard(deleteButton) {
  deleteButton.addEventListener('click', function () {
    const cardRemove = deleteButton.closest('.card')
    deleteCard(cardRemove)
  })
}

function handleImgOpen(link, title, card, alt) {
  card.addEventListener('click', function () {
    popupImage.src = link;
    popupImage.alt = alt;
    popupCapture.textContent = title;
    togglePopup(popupImg)
  })
}