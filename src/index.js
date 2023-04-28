import './../pages/index.css'
import { getInitialCards, addCardInServer } from './components/api'
import { popupAdd, Card } from './components/Card'
import { popupEdit, closePopup, avatarIcon, popupAvatar, profileName, profileJob, openPopup, popupCloseHandler, setWaitingButton, unsetWaitingButton } from './components/modal'
import { enableValidation, setDisableButton, formSelectors, hideInputError } from './components/validate'
import Section from './components/Section';
import UserInfo from './components/UserInfo';

const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const buttonAddCard = document.querySelector('.profile__add');
const formAdd = document.forms["add-picture"];
const places = document.querySelector('.places');
const formAvatar = document.forms["edit-profile-img"];
const inputAvatarUrl = document.querySelector('.form__input_avatar')
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const popupPlace = document.querySelector('.form__input_place');
const popupPictire = document.querySelector('.form__input_url');

const profileInfo = new UserInfo({
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__description',
    imageSelector: '.profile__photo-img'
});

Promise.all([profileInfo.getUserInfo(), getInitialCards()]).then(res => {
    const responceUserInfo = res[0];
    const responseGetInitialCard = res[1];
    const cardSection = new Section({
        data: Array.from(responseGetInitialCard),
        renderer: (item) => {
            const card = new Card(item, '#card-template', responceUserInfo._id);
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
    profileInfo.setUserPicture(inputAvatarUrl.value)
        .finally(() => {
            unsetWaitingButton(popupAvatar);
            inputAvatarUrl.value = '';
            closePopup(popupAvatar);
        });
    
})

formAvatar.addEventListener('submit', editAvatar)

const setProfileDataInInput = (() => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

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
    profileInfo.setUserInfo(nameInput.value, jobInput.value)
        .finally(() => {
            unsetWaitingButton(popupEdit);
            closePopup(popupEdit);
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
                    const card = new Card(item, '#card-template', profileInfo.getUserId());
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
            unsetWaitingButton(popupAdd);
        });
})

formAdd.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInput()

popupCloseHandler()

enableValidation(formSelectors);
