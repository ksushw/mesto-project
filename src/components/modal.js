import { openPopup, closePopup } from './utils'
import { setDisableButton, hideInputError, formSelectors } from './validate'

const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');

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
const handleOpenPopup = ((popup)=>{
    openPopup(popup)
    const overlay = popup.querySelector('.popup__overlay');
    document.addEventListener('keyup', closeByEsc);
    overlay.addEventListener('click', handlerEventListenerOverlay);
})

function handlerEventListenerOverlay() {
    const openedPopup = document.querySelector('.popup_opened');
    handleClosePopup(openedPopup)
}

//ОТРЫТЬ ОКНО ПРОФИЛЯ, УБИРАЕТ ОКНА ОШИБКИ, ВСТАВЛЯЕТ ИМЯ И ОПИСАНИЕ 
//В МОДАЛЬНЫЕ ОКНА
const openPopupEdit = (() => {
    handleOpenPopup(popupEdit)
     setDisableButton(popupEdit);
    const inputsPopupEdit = Array.from(popupEdit.querySelectorAll('.form__input'))
    inputsPopupEdit.forEach((input) => {
        hideInputError(popupEdit, input, formSelectors);
    })
    setProfileDataInInput();
})

const handleClosePopup = ((popup)=>{
    const openedPopup = document.querySelector('.popup_opened');
    const overlay = openedPopup.querySelector('.popup__overlay');
    document.removeEventListener('keyup', closeByEsc)
    overlay.removeEventListener('click', handlerEventListenerOverlay);
    closePopup(popup);
})

//ЦИКЛОМ НАВЕШИВАЕТ СЛУШАТЕЛИ СОБЫТИЙ И УДАЛЯЕТ БЛИЖАЙШИЙ ПОПАП
const popupCloseHandler = (function () {
    closeButtons.forEach(function (button) {
        const popup = button.closest('.popup');
        button.addEventListener('click', function () {
            handleClosePopup(popup)

        });
    })
})

//УСТАНАВЛИВАЕТ ИМЯ ПОЛЬЗОВАТЕЛЯ И ОПИСАНИЕ, ЗАКРЫВАЕТ ПОПАП
const handleProfileFormSubmit = ((evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    handleClosePopup(popupEdit);
})




// const closePopupKaydowAndOverlay = (() => {
//     document.addEventListener('keydown', function (evt) {
//         const openPopup = document.querySelector('.popup_opened')
//         if (evt.keyCode === 27 && openPopup) {
//             openPopup.classList.remove('popup_opened');
//         }
//     })
//     const overlays = Array.from(document.querySelectorAll('.popup__overlay'))
//     overlays.forEach((overlay) => {
//         overlay.addEventListener('click', () => {
//             const openPopup = document.querySelector('.popup_opened')
//             openPopup.classList.remove('popup_opened');
//         })

//     })


// })

export {  handleOpenPopup, handleClosePopup, setProfileDataInInput, openPopupEdit, popupCloseHandler, handleProfileFormSubmit }