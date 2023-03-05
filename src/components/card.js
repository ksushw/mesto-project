import { openPopup, closePopup } from './utils'
import { handleOpenPopup, handleClosePopup } from './modal'


const popupAdd = document.querySelector('.popup_type_add');
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


const createCard = ((name, link, alt) => {
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
})


const addCard = ((name, link, alt) => {
    const places = document.querySelector('.places')
    const cardElement = createCard(name, link, alt)
    places.prepend(cardElement);
})


const handleAddFormSubmit = ((evt) => {
    evt.preventDefault();

    const popupPlace = document.querySelector('.form__input_place');
    const popupPictire = document.querySelector('.form__input_url');

    addCard(popupPlace.value, popupPictire.value);
    evt.target.reset();
    handleClosePopup(popupAdd);
})

const renderCards = (() => {
    for (let i = 0; i < cardList.length; i++) {
        addCard(cardList[i].name, cardList[i].link, cardList[i].alt);
    }
})

const handleLike = ((like) => {
    like.addEventListener('click', function (event) {
        like.classList.toggle('card__like_active')
    })
})

const deleteCard = ((card) => {
    card.remove();
})

const handleDeleteCard = ((deleteButton) => {
    deleteButton.addEventListener('click', function () {
        const cardRemove = deleteButton.closest('.card')
        deleteCard(cardRemove)
        console.log(saxsax)
    })
})

const handleImgOpen = ((link, title, card, alt) => {
    card.addEventListener('click', function () {
        popupImage.src = link;
        popupImage.alt = alt;
        popupCapture.textContent = title;
        handleOpenPopup(popupImg)
    })
})

export {
    popupAdd,
    createCard, addCard, handleAddFormSubmit, renderCards, handleLike, deleteCard, handleDeleteCard, handleImgOpen
}