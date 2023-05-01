import './../pages/index.css';
import { popupAdd, Card } from './components/Card';
import Section from './components/Section';
import UserInfo from './components/UserInfo';
// import { popupEdit, closePopup, avatarIcon, popupAvatar, profileName, profileJob, openPopup, popupCloseHandler, setWaitingButton, unsetWaitingButton } from './components/modal'
import { Popup, PopupWithForm, PopupWithImage } from './components/modal'
import { FormValidator, formSelectors } from './components/validate' // hideInputError
import { api } from './components/api'

const formAdd = document.forms["add-picture"];
const places = document.querySelector('.places');
const inputAvatarUrl = document.querySelector('.form__input_avatar')
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');

// Popup Vars
const addCardButton = document.querySelector('.profile__add'); //move it upstairs
const profileEditButton = document.querySelector('.profile__edit'); //move it upstairs

const profileInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    imageSelector: '.profile__photo-img'
});

Promise.all([profileInfo.getUserInfo(), api.getInitialCards()]).then(res => {
    const responceUserInfo = res[0];
    const responseGetInitialCard = res[1];
    const cardSection = new Section({
        data: Array.from(responseGetInitialCard),
        renderer: (item) => {
            const card = new Card(item, '#card-template', responceUserInfo._id, clickImage);
            const cardElement = card.generate();
            cardSection.setItems(cardElement)
        }
    }, places)

    cardSection.renderItems();
})
    .catch((err) => {
        console.log(err);
});

 const clickImage = (() => {
    
 })

const avatarIcon = document.querySelector('.profile__photo');
const avatarIconImg = document.querySelector('.profile__photo-img');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

// POPUP Elements 
const popupAvatarEl = document.querySelector('.popup_type_avatar-edit');
const popupEditEl = document.querySelector('.popup_type_edit');
const popupAddEl = document.querySelector('.popup_type_add');
const popupImg = document.querySelector('.popup_type_img')

// POPUP Objects
const popupAvatarObj = new PopupWithForm(popupAvatarEl, (avatarUrl) => {
    const postAvatar = async (avatarUrl) => {
        try {
            setWaitingButton()
            const responce = await api.changeAvatar(avatarUrl);
            avatarIconImg.src = responce.avatar;
            popupAvatarObj.close();
        }
        catch(error) {
            console.log(error);
        }
    }
    postAvatar(avatarUrl.avatar);
});

const popupEditObj = new PopupWithForm(popupEditEl, (editData) => {
    console.log(editData); // PUT HERE THE LOGIC OF SUBMIT EDIT DATA POPUP OR CALLBACK
    //setWaitingButtton
    const changeUserInfo = async (editData) => {
        try {
            const responce = await profileInfo.setUserInfo(editData.name, editData.description);
        }
        catch (err) {
            console.log(err);
        }
    }
    changeUserInfo(editData); 
    popupEditObj.close();
});

const popupAddObj = new PopupWithForm(popupAddEl, (addCardData) => {
    console.log(addCardData); // PUT HERE THE LOGIC OF SUBMIT ADD CARD POPUP OR CALLBACK
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

// Add Card Logic OLD
const handleAddFormSubmit = ((evt) => {
    evt.preventDefault(evt);
    // setWaitingButton(popupAdd);
    api.addCardInServer(popupPlace.value, popupPictire.value)
        .then((card) => {
            const newCard = new Section({
                data: card,
                renderer: (item) => {
                    const card = new Card(item, '#card-template', profileInfo.getUserId(), clickImage);
                    const cardElement = card.generate();
                    newCard.setItems(cardElement)
                }
            }, places)
            newCard.renderItem();
            evt.target.reset();
            closePopup(popupAdd);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // unsetWaitingButton(popupAdd);
        });
});

// enable all forms validation
const forms = Array.from(document.querySelectorAll('.form'));
forms.forEach((form) => {
    const formValidator = new FormValidator(formSelectors, form);
    formValidator.enableValidation();
})

/*const setProfileDataInInput = (() => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}) */

// --------------------------

    

formAdd.addEventListener('submit', handleAddFormSubmit);

//setProfileDataInInput() 

//popupCloseHandler()
