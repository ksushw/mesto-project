import { openPopup, closePopup } from './utils'
import { handleOpenPopup, handleClosePopup, setWaitingButton } from './modal'
import { addCardInServer, deleteCardInServer, setLike, deleteLike } from '../../api'
import { userId, getInitialCards } from '../index'

const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const popupImg = document.querySelector('.popup_type_img');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');

const createCard = ((name, link, card) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const like = cardElement.querySelector('.card__button-like');
    const deleteButton = cardElement.querySelector('.card__trash-can');
    const countLikes = cardElement.querySelector('.card__amount-likes');
    const image = cardElement.querySelector('.card__photo');
    const cardName = cardElement.querySelector('.card__name');

    if (!(card.owner._id === userId)) {
        deleteButton.remove();
    }

    console.log(card.owner._id)

    image.src = link;
    image.alt = name;
    cardName.textContent = name;

    if (card.likes.length) {
        countLikes.textContent = card.likes.length;
        card.likes.forEach(user => {
            if (user._id === userId) {
                like.classList.add('card__button-like_active');
            }
        });

    }

    handleLike(like, card._id, cardElement, countLikes);
    handleDeleteCard(deleteButton, card._id);
    handleImgOpen(link, name, image);
    return cardElement;
})


const addCard = ((name, link, card) => {
    const places = document.querySelector('.places')
    const cardElement = createCard(name, link, card)
    places.prepend(cardElement);
})

const handleAddFormSubmit = ((evt) => {
    evt.preventDefault(evt);
    setWaitingButton(popupAdd);
    addCardInServer(popupPlace.value, popupPictire.value)
        .then((card) => {
            addCard(card.name, card.link, card)
            evt.target.reset();
            console.log(card)
            handleClosePopup(popupAdd);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
})

const renderCards = ((cardList) => {
    cardList = cardList.reverse()
    for (let i = 0; i < cardList.length; i++) {
        addCard(cardList[i].name, cardList[i].link, cardList[i]);
    }
})

const addLike = ((like, id, countLikes) => {
    like.classList.add('card__button-like_active');
    countLikes.textContent = Number(countLikes.textContent) + 1;
    setLike(id)
})

const removeLike = ((like, id, countLikes) => {
    like.classList.remove('card__button-like_active')
    countLikes.textContent = Number(countLikes.textContent) - 1;
    deleteLike(id)
})

const handleLike = ((like, id, card, countLikes) => {

    like.addEventListener('click', function (event) {
        const likedCard = card.querySelector('.card__button-like_active')

        if (likedCard) {
            removeLike(like, id, countLikes)
        } else {
            addLike(like, id, countLikes)
        }
    })
})

const deleteCard = ((card) => {
    card.remove();
})

const handleDeleteCard = ((deleteButton, id) => {
    deleteButton.addEventListener('click', function () {
        const cardRemove = deleteButton.closest('.card')
        deleteCardInServer(id)
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