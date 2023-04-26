import './../pages/index.css'
import { getInitialCards, getUserInfo, changeAvatar, editUserInfo, addCardInServer } from './components/api'
import { setUserId } from './components/utils'
import { popupAdd, Card } from './components/card'
import { popupEdit, closePopup, avatarIcon, popupAvatar, profileName, profileJob, openPopup, popupCloseHandler, setWaitingButton, unsetWaitingButton } from './components/modal'
import { enableValidation, setDisableButton, formSelectors, hideInputError } from './components/validate'
import Section from './components/Section';

const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const buttonAddCard = document.querySelector('.profile__add');
const formAdd = document.forms["add-picture"];
const profilePicture = document.querySelector('.profile__photo-img');
const places = document.querySelector('.places');
const formAvatar = document.forms["edit-profile-img"];
const inputAvatarUrl = document.querySelector('.form__input_avatar')
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');
const avatarIconImg = document.querySelector('.profile__photo-img')

const setProfileDataInInput = (() => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

Promise.all([getUserInfo(), getInitialCards()]).then(res => {
    const responceUserInfo = res[0];
    const responseGetInitialCard = res[1]
    profileName.textContent = responceUserInfo.name;
    profileJob.textContent = responceUserInfo.about;
    profilePicture.src = responceUserInfo.avatar;
    setUserId(responceUserInfo._id)
    const cardSection = new Section({
        data: Array.from(responseGetInitialCard),
        renderer: (item) => {
            const card = new Card(item, '#card-template');
            const cardElement = card.generate();
            cardSection.setItems(cardElement)
        }
    }, places)
    cardSection.renderItems();
})
    .catch((err) => {
        console.log(err);
    });

avatarIcon.addEventListener('click', function () {
    openPopup(popupAvatar);
    setDisableButton(popupAvatar, formSelectors);
})

const editAvatar = ((evt) => {
    setWaitingButton(popupAvatar);
    evt.preventDefault();
    changeAvatar(inputAvatarUrl.value)
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

formAvatar.addEventListener('submit', editAvatar)




const openPopupEdit = (() => {
    openPopup(popupEdit)
    setDisableButton(popupEdit, formSelectors);
    const inputsPopupEdit = Array.from(popupEdit.querySelectorAll('.form__input'))
    inputsPopupEdit.forEach((input) => {
        hideInputError(popupEdit, input, formSelectors);
    })
    setProfileDataInInput();
})

profileEdit.addEventListener('click', openPopupEdit);

const handleProfileFormSubmit = ((evt) => {
    setWaitingButton(popupEdit);
    evt.preventDefault();
    editUserInfo(nameInput.value, jobInput.value)
        .then((userInfo) => {
            profileName.textContent = userInfo.name;
            profileJob.textContent = userInfo.about;
            closePopup(popupEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            unsetWaitingButton(popupAvatar);
        });
})

profileForm.addEventListener('submit', handleProfileFormSubmit);

buttonAddCard.addEventListener('click', function () {
    openPopup(popupAdd);
    setDisableButton(popupAdd, formSelectors);
});

const handleAddFormSubmit = ((evt) => {
    evt.preventDefault(evt);
    setWaitingButton(popupAdd);
    addCardInServer(popupPlace.value, popupPictire.value)
        .then((card) => {
            const newCard = new Section({
                data: card,
                renderer: (item) => {
                    const card = new Card(item, '#card-template');
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
            unsetWaitingButton(popupAvatar);
        });
})

formAdd.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInput()

popupCloseHandler()

enableValidation(formSelectors);