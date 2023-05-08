import './pages/index.css';
import Card from './components/Сard';
import Section from './components/Section';
import UserInfo from './components/UserInfo';
import { PopupWithForm } from './components/PopupWithForm'
import { PopupWithImage } from './components/PopupWithImage'
import { FormValidator, formSelectors } from './components/FormValidator' // hideInputError
import { api } from './components/Api'

const places = document.querySelector('.places');

// Popup Vars
const addCardButton = document.querySelector('.profile__add'); //move it upstairs
const profileEditButton = document.querySelector('.profile__edit'); //move it upstairs

const avatarIcon = document.querySelector('.profile__photo');

// POPUP Elements 
const popupAvatarEl = document.querySelector('.popup_type_avatar-edit');
const popupEditEl = document.querySelector('.popup_type_edit');
const popupAddEl = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img')

const popupAvatarValidator = new FormValidator(formSelectors, popupAvatarEl);
const popupEditValidator = new FormValidator(formSelectors, popupEditEl);
const popupAddValidator = new FormValidator(formSelectors, popupAddEl);

const inputName = document.querySelector('.form__input_name');
const inputSurname = document.querySelector('.form__input_job');

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
    popupImageObj.open(image, name);
    popupImageObj.setEventListeners();
})

function createCard(item) {
    const card = new Card(item, '#card-template', userInfo.getUserInfo().userId, clickImage, api);
    const cardElement = card.generate();
    return cardElement;
}


// POPUP Objects
const popupAvatarObj = new PopupWithForm(popupAvatarEl, (avatarUrl) => {
    const postAvatar = async (avatarUrl) => {
        try {
            const responce = await api.changeAvatar(avatarUrl);
            userInfo.setUserInfo(responce);
            popupAvatarObj.close();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            popupAvatarObj.toggleButtonText(false, 'Сохранить', 'Сохранение...');
        }
    }
    popupAvatarObj.toggleButtonText(true, 'Сохранить', 'Сохранение...');
    postAvatar(avatarUrl.avatar);
});
popupAvatarObj.setEventListeners();

const popupEditObj = new PopupWithForm(popupEditEl, (editData) => {
    const changeUserInfo = async (editData) => {
        try {
            const responce = await api.editUserInfo(editData.name, editData.description)
            userInfo.setUserInfo(responce);
            popupEditObj.close();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            popupEditObj.toggleButtonText(false, 'Сохранить', 'Сохранение...');
        }
    }
    popupEditObj.toggleButtonText(true, 'Сохранить', 'Сохранение...');
    changeUserInfo(editData);
},

    () => {
        const { name, about } = userInfo.getUserInfo();

        inputName.value = name;
        inputSurname.value = about;
    }
);
popupEditObj.setEventListeners();

const popupAddObj = new PopupWithForm(popupAddEl, (addCardData) => {
    popupAddObj.toggleButtonText(true, 'Создать', 'Создание...');
    api.addCardInServer(addCardData.name, addCardData.description)
        .then((card) => {
            const newCard = createCard(card);
            cardSection.setItems(newCard);
            popupAddObj.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddObj.toggleButtonText(false, 'Создать', 'Создание...')
        });
});
popupAddObj.setEventListeners();

// Avatar Image Listener
avatarIcon.addEventListener('click', function () {
    popupAvatarObj.open();
    popupAvatarValidator.disableButton();
});

// Profile edit Listener
profileEditButton.addEventListener('click', () => {
    popupEditObj.open();
    popupEditValidator.disableButton();
});

// Add card popup Listener 
addCardButton.addEventListener('click', () => {
    popupAddObj.open();
    popupAddValidator.disableButton();
});

popupAvatarValidator.enableValidation();
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();

