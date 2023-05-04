import './pages/index.css';
import Card from './components/Сard';
import Section from './components/Section';
import UserInfo from './components/UserInfo';
import { PopupWithForm } from './components/PopupWithForm'
import { PopupWithImage } from './components/PopupWithImage'
import { FormValidator, formSelectors } from './components/FormValidator' // hideInputError
import { api } from './components/Api'

const formAdd = document.forms["add-picture"];
const places = document.querySelector('.places');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');

// Popup Vars
const addCardButton = document.querySelector('.profile__add'); //move it upstairs
const profileEditButton = document.querySelector('.profile__edit'); //move it upstairs

const avatarIcon = document.querySelector('.profile__photo');
const avatarIconImg = document.querySelector('.profile__photo-img');

// POPUP Elements 
const popupAvatarEl = document.querySelector('.popup_type_avatar-edit');
const popupEditEl = document.querySelector('.popup_type_edit');
const popupAddEl = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img')
const popupAdd = document.querySelector(".popup_type_add");

let cardSection = {};

const userInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        descriptionSelector: '.profile__description',
        imageSelector: '.profile__photo-img'
    });


Promise.all([api.getUserInfo(), api.getInitialCards()]).then(res => {
    const responceUserInfo = res[0];
    userInfo.setUserInfo(responceUserInfo);
    const responseGetInitialCard = res[1];
    cardSection = new Section({
        data: Array.from(responseGetInitialCard),
        renderer: (item) => {
            const cardElement = createCard(item)
            cardSection.setItems(cardElement)
        }
    }, places)

    cardSection.renderItems();
})
    .catch((err) => {
        console.log(err);
    });

const popupImageObj = new PopupWithImage(popupImg);

const clickImage = ((name, image) => {
    popupImageObj.open(image, name)
})

function createCard(item) {
    const card = new Card(item, '#card-template', userInfo.getUserInfo().userId, clickImage);
    const cardElement = card.generate();
    return cardElement;
}


// POPUP Objects
const popupAvatarObj = new PopupWithForm(popupAvatarEl, (avatarUrl) => {
    const postAvatar = async (avatarUrl) => {
        try {
            const responce = await api.changeAvatar(avatarUrl);
            userInfo.setUserInfo(responce);
            popupAvatarObj.toggleButtonText();
            popupAvatarObj.close();
        }
        catch (error) {
            console.log(error);
            popupAvatarObj.toggleButtonText();
        }
    }

    popupAvatarObj.toggleButtonText();
    postAvatar(avatarUrl.avatar);
});

const popupEditObj = new PopupWithForm(popupEditEl, (editData) => {
    const changeUserInfo = async (editData) => {
        try {
            const responce = await api.editUserInfo(editData.name, editData.description)
            userInfo.setUserInfo(responce);
            popupEditObj.toggleButtonText();
        }
        catch (err) {
            console.log(err);
            popupEditObj.toggleButtonText();
        }
    }

    popupEditObj.toggleButtonText();
    changeUserInfo(editData);
    popupEditObj.close();
});

const popupAddObj = new PopupWithForm(popupAddEl, (addCardData) => {
    api.addCardInServer(addCardData.name, addCardData.description)
        .then((card) => {
            const newCard = createCard(card);
            cardSection.setItems(newCard);
        })
        .catch((err) => {
            console.log(err);
        })
});

// Avatar Image Listener
avatarIcon.addEventListener('click', function () {
    popupAvatarObj.open();
    popupAvatarObj.setEventListeners();
    const popupAvatarValidator = new FormValidator(formSelectors, popupAvatarEl)
    popupAvatarValidator.setDisableButton();
});

// Profile edit Listener

profileEditButton.addEventListener('click', () => {
    popupEditObj.open();
    const popupEditValidator = new FormValidator(formSelectors, popupEditEl);
    popupEditObj.setEventListeners();
    popupEditValidator.setDisableButton();
});

// Add card popup Listener 
addCardButton.addEventListener('click', () => {
    popupAddObj.open();
    popupAddObj.setEventListeners();
    const popupAddValidator = new FormValidator(formSelectors, popupAddEl);
    popupAddValidator.setDisableButton();
});

// enable all forms validation
const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((form) => {
    const formValidator = new FormValidator(formSelectors, form);
    formValidator.enableValidation();
})

