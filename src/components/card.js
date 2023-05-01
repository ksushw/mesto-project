import { Popup, PopupWithForm, PopupWithImage } from "./modal";
import { api } from "./api";

const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup__image");
const popupCapture = document.querySelector(".popup__capture");
const popupImg = document.querySelector(".popup_type_img");

class Card {
  constructor(data, cardSelector, userId, clickImage) {
    this._ownerId = data.owner._id;
    this._imageUrl = data.link;
    this._cardName = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._selector = cardSelector;
    this._userId = userId;
    this._clickImage = clickImage;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setLike() {
    api
      .setLike(this._id)
      .then((card) => {
        this._like.classList.add("card__button-like_active");
        this._amountLikes.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _removeLike() {
    api
      .deleteLike(this._id)
      .then((card) => {
        this._like.classList.remove("card__button-like_active");
        this._amountLikes.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleLike() {
    if (this._like.matches(".card__button-like_active")) {
      this._removeLike();
    } else {
      this._setLike();
    }
  }

  _isLikedUser() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _handleDeleteCard() {
    api
      .deleteCardInServer(this._id)
      .then(() => {
        this._element.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._trashCan.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImgOpen();
    });

    this._like.addEventListener("click", () => {
      this._clickImage(this._cardName, this._imageUrl);
    });
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector(".card__photo");
    this._name = this._element.querySelector(".card__name");
    this._amountLikes = this._element.querySelector(".card__amount-likes");
    this._trashCan = this._element.querySelector(".card__trash-can");
    this._like = this._element.querySelector(".card__button-like");
    this._cardImage = this._element.querySelector(".card__photo");

    this._image.src = this._imageUrl;
    this._name.textContent = this._cardName;
    this._amountLikes.textContent = this._likes.length;

    if (this._isLikedUser()) {
      this._like.classList.add("card__button-like_active");
    }

    this._setEventListeners();

    if (!(this._ownerId === this._userId)) {
      this._trashCan.remove();
    }

    return this._element;
  }
}

export { popupAdd, Card };
