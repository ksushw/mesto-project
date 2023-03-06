import { openPopup, closePopup } from './utils'
import { handleOpenPopup, handleClosePopup } from './modal'


const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const popupImg = document.querySelector('.popup_type_img');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');

fetch('https://nomoreparties.co/v1/plus-cohort-21/cards', {
    headers: {
        authorization: '6fc36c5b-30c6-4228-accb-664772d22e4e'
    }
})
    .then(res => res.json())
    .then((result) => {
       const cardList = result;
    });

const createCard = ((name, link) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const like = cardElement.querySelector('.card__like');
    const deleteButton = cardElement.querySelector('.card__trash-can')
    const image = cardElement.querySelector('.card__photo');
    const cardName = cardElement.querySelector('.card__name');

    image.src = link;
    image.alt = name;
    cardName.textContent = name;

    handleLike(like);
    handleDeleteCard(deleteButton);
    handleImgOpen(link, name, image);
    return cardElement;
})


const addCard = ((name, link) => {
    const places = document.querySelector('.places')
    const cardElement = createCard(name, link)
    places.prepend(cardElement);
})


const handleAddFormSubmit = ((evt) => {
    evt.preventDefault();
    addCard(popupPlace.value, popupPictire.value);
    evt.target.reset();
    handleClosePopup(popupAdd);
})

const renderCards = ((cardList) => {
    for (let i = 0; i < cardList.length; i++) {
        addCard(cardList[i].name, cardList[i].link);
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
    })
})

const handleImgOpen = ((link, title, card) => {
    card.addEventListener('click', function () {
        popupImage.src = link;
        popupImage.alt = title;
        popupCapture.textContent = title;
        handleOpenPopup(popupImg)
    })
})

export {
    popupAdd,
    createCard, addCard, handleAddFormSubmit, renderCards, handleLike, deleteCard, handleDeleteCard, handleImgOpen
}