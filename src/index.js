import './../pages/index.css'
import { setUserId } from './components/utils'
import { popupAdd, addCard } from './components/card'
// import { popupEdit, closePopup, avatarIcon, popupAvatar, profileName, profileJob, openPopup, popupCloseHandler, setWaitingButton, unsetWaitingButton } from './components/modal'
import { Popup, PopupWithForm, PopupWithImage } from './components/modal'
import { FormValidator, formSelectors } from './components/validate' // hideInputError
import { api } from './components/api'

const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const formAdd = document.forms["add-picture"];
const profilePicture = document.querySelector('.profile__photo-img');
const places = document.querySelector('.places');
const formAvatar = document.forms["edit-profile-img"];
const inputAvatarUrl = document.querySelector('.form__input_avatar')
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');
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
    console.log(avatarUrl); // PUT HERE THE LOGIC OF SUBMIT CHANGE AVATAR POPUP OR CALLBACK
});

const popupEditObj = new PopupWithForm(popupEditEl, (editData) => {
    console.log(editData); // PUT HERE THE LOGIC OF SUBMIT EDIT DATA POPUP OR CALLBACK
});

const popupAddObj = new PopupWithForm(popupAddEl, (addCardData) => {
    console.log(addCardData); // PUT HERE THE LOGIC OF SUBMIT ADD CARD POPUP OR CALLBACK
});


// Avatar Image Listener
avatarIcon.addEventListener('click', function () {
    popupAvatarObj.open(); // ALSO MAYBE MOVE IT TO THE CALLBACK AS openPopupEdit (?) const openPopupAvatar = () => {...}
    popupAvatarObj.setEventListeners();
    const popupAvatarValidator = new FormValidator(formSelectors, popupAvatarEl)
    popupAvatarValidator.setDisableButton();
});

// Profile edit Listener
const profileEditButton = document.querySelector('.profile__edit'); //move it upstairs
profileEditButton.addEventListener('click', () => {
    popupEditObj.open();
    //setProfileDataInInput(); // DO THE ANALOG THEN DELETE
    const popupEditValidator = new FormValidator(formSelectors, popupEditEl);
    popupEditObj.setEventListeners();
    popupEditValidator.setDisableButton();
});

// Add card popup Listener 
const addCardButton = document.querySelector('.profile__add'); //move it upstairs
addCardButton.addEventListener('click', () => {
    popupEditObj.open();
    popupAddObj.setEventListeners();
    const popupAddValidator = new FormValidator(formSelectors, popupAddEl);
    popupAddValidator.setDisableButton();
});

// Change Avatar Logic OLD
const editAvatar = ((evt) => { // DO THE waiting button logic while changing avatar
    setWaitingButton(popupAvatar);
    evt.preventDefault();
    api.changeAvatar(inputAvatarUrl.value)
        .then((profile) => {
            avatarIconImg.src = profile.avatar;
            closePopup(popupAvatar);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            unsetWaitingButton(popupAvatar);
        });
})

// Profile Edit Logic OLD
const handleProfileFormSubmit = ((evt) => { 
    setWaitingButton(popupEdit);
    evt.preventDefault();
    api.editUserInfo(nameInput.value, jobInput.value)
        .then((userInfo) => {
            profileName.textContent = userInfo.name;
            profileJob.textContent = userInfo.about;
            closePopup(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            unsetWaitingButton(popupEdit);
        });
});

// Add Card Logic OLD
const handleAddFormSubmit = ((evt) => {
    evt.preventDefault(evt);
    setWaitingButton(popupAdd);
    api.addCardInServer(popupPlace.value, popupPictire.value)
        .then((card) => {
            addCard(card.name, card.link, card, places)
            evt.target.reset();
            closePopup(popupAdd);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            unsetWaitingButton(popupAdd);
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

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(res => {
    const responceUserInfo = res[0];
    const responseGetInitialCard = res[1]
    profileName.textContent = responceUserInfo.name;
    profileJob.textContent = responceUserInfo.about;
    profilePicture.src = responceUserInfo.avatar;
    setUserId(responceUserInfo._id)
    renderCards(Array.from(responseGetInitialCard))
})
    .catch((err) => {
        console.log(err);
    });

const renderCards = ((cardList) => {
    cardList = cardList.reverse()
    for (let i = 0; i < cardList.length; i++) {
        addCard(cardList[i].name, cardList[i].link, cardList[i], places);
    }
})

formAdd.addEventListener('submit', handleAddFormSubmit);

//setProfileDataInInput() 

//popupCloseHandler()
