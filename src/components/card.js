import { userId } from './utils'
import { openPopup } from './modal'
import { deleteCardInServer, setLike, deleteLike } from './api'

const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup__image');
const popupCapture = document.querySelector('.popup__capture');
const popupImg = document.querySelector('.popup_type_img');

const createCard = ((name, link, card) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const like = cardElement.querySelector('.card__button-like');
    const buttonDelete = cardElement.querySelector('.card__trash-can');
    const numberLikes = cardElement.querySelector('.card__amount-likes');
    const image = cardElement.querySelector('.card__photo');
    const cardName = cardElement.querySelector('.card__name');

    if (!(card.owner._id === userId)) {
        buttonDelete.remove();
    }

    image.src = link;
    image.alt = name;
    cardName.textContent = name;

    if (card.likes.length) {
        numberLikes.textContent = card.likes.length;
        card.likes.forEach(user => {
            if (user._id === userId) {
                like.classList.add('card__button-like_active');
            }
        });

    }

    handleLike(like, card._id, cardElement, numberLikes);
    handleDeleteCard(buttonDelete, card._id);
    handleImgOpen(link, name, image);
    return cardElement;
})


const addCard = ((name, link, card, contener) => {
    const cardElement = createCard(name, link, card)
    contener.prepend(cardElement);
})

const addLike = ((like, id, numberLikes) => {
    setLike(id)
        .then((card) => {
            like.classList.add('card__button-like_active');
            numberLikes.textContent = card.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
})

const removeLike = ((like, id, numberLikes) => {
    deleteLike(id)
        .then((card) => {
            like.classList.remove('card__button-like_active')
            numberLikes.textContent = card.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
})

const handleLike = ((like, id, card, numberLikes) => {
    like.addEventListener('click', function (event) {
        const likedCard = card.querySelector('.card__button-like_active')
        if (likedCard) {
            removeLike(like, id, numberLikes)
        } else {
            addLike(like, id, numberLikes)
        }
    })
})

const deleteCard = ((card) => {
    card.remove();
})

const handleDeleteCard = ((buttonDelete, id) => {
    buttonDelete.addEventListener('click', function () {
        const cardRemove = buttonDelete.closest('.card')
        deleteCardInServer(id)
            .then(() => {
                deleteCard(cardRemove)
            })
            .catch((err) => {
                console.log(err);
            });
    })
})

const handleImgOpen = ((link, title, card) => {
    card.addEventListener('click', function () {
        popupImage.src = link;
        popupImage.alt = title;
        popupCapture.textContent = title;
        openPopup(popupImg)
    })
})

export {
    popupAdd,
    createCard, addCard, handleLike, deleteCard, handleDeleteCard, handleImgOpen
}
