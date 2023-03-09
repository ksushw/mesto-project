import { openPopup, closePopup } from './utils'
import { setDisableButton, hideInputError, formSelectors } from './validate'
import { editUserInfo, changeAvatar } from '../../api'
import { avatarIcon, popupAvatar } from '../index'

const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const inputAvatarUrl = document.querySelector('.form__input_avatar')

const setProfileDataInInput = (() => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

const closeByEsc = ((evt) => {
    if (evt.keyCode === 27 && openPopup) {
        const openPopup = document.querySelector('.popup_opened')
        handleClosePopup(openPopup)
    }
})
//оТКРЫВАЕТ ПОПАП, БЛОКИРУЕТ КНОПКУ ОТПРАВКИ, ВЕШАЕТ СЛУШАТЕЛИ ЗАКРЫТИЯ
const handleOpenPopup = ((popup) => {
    openPopup(popup)
    const overlay = popup.querySelector('.popup__overlay');
    document.addEventListener('keyup', closeByEsc);
    overlay.addEventListener('click', handlerEventListenerOverlay);
})

function handlerEventListenerOverlay() {
    const openedPopup = document.querySelector('.popup_opened');
    handleClosePopup(openedPopup)
}

const openPopupEdit = (() => {
    handleOpenPopup(popupEdit)
    setDisableButton(popupEdit);
    const inputsPopupEdit = Array.from(popupEdit.querySelectorAll('.form__input'))
    inputsPopupEdit.forEach((input) => {
        hideInputError(popupEdit, input, formSelectors);
    })
    setProfileDataInInput();
})

const editAvatar = ((evt) => {
    setWaitingButton(popupAvatar);
    evt.preventDefault();
    changeAvatar(inputAvatarUrl.value)
        .then((profile) => {
            avatarIcon.src = profile.avatar;
            handleClosePopup(popupAvatar);
        })
        .catch((err) => {
            console.log(err); 
          });
})

const handleClosePopup = ((popup) => {
    const openedPopup = document.querySelector('.popup_opened');
    const overlay = openedPopup.querySelector('.popup__overlay');
    document.removeEventListener('keyup', closeByEsc)
    overlay.removeEventListener('click', handlerEventListenerOverlay);
    closePopup(popup);
})

const popupCloseHandler = (function () {
    closeButtons.forEach(function (button) {
        const popup = button.closest('.popup');
        button.addEventListener('click', function () {
            handleClosePopup(popup)

        });
    })
})

const handleProfileFormSubmit = ((evt) => {
    setWaitingButton(popupEdit);
    evt.preventDefault();
    editUserInfo(nameInput.value, jobInput.value)
        .then((userInfo) => {
            profileName.textContent = userInfo.name;
            profileJob.textContent = userInfo.about;
            handleClosePopup(popupEdit);
        })
        .catch((err) => {
            console.log(err); 
          });
})

const setWaitingButton = ((popup)=>{
    const button = popup.querySelector('.form__button-save')
    button.setAttribute('disabled', true);
    button.textContent = "Сохранение..."
})

export { setWaitingButton, profileName, profileJob, handleOpenPopup, handleClosePopup, setProfileDataInInput, openPopupEdit, popupCloseHandler, handleProfileFormSubmit, editAvatar }