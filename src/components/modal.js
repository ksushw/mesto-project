const popupEdit = document.querySelector('.popup_type_edit');
const buttonsClose = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');


const popupAvatar = document.querySelector('.popup_type_avatar-edit');
const avatarIcon = document.querySelector('.profile__photo');



const closeByEsc = ((evt) => {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_opened')
        handleClosePopup(popupOpen)
    }
})
//оТКРЫВАЕТ ПОПАП, БЛОКИРУЕТ КНОПКУ ОТПРАВКИ, ВЕШАЕТ СЛУШАТЕЛИ ЗАКРЫТИЯ
const handleOpenPopup = ((popup) => {
    popup.classList.add('popup_opened');
    const overlay = popup.querySelector('.popup__overlay');
    document.addEventListener('keyup', closeByEsc);
    overlay.addEventListener('click', handlerEventListenerOverlay);
})

function handlerEventListenerOverlay() {
    const popupOpen = document.querySelector('.popup_opened');
    handleClosePopup(popupOpen)
}





const handleClosePopup = ((popup) => {
    const overlay = popup.querySelector('.popup__overlay');
    document.removeEventListener('keyup', closeByEsc)
    overlay.removeEventListener('click', handlerEventListenerOverlay);
    popup.classList.remove('popup_opened');
})

const popupCloseHandler = (function () {
    buttonsClose.forEach(function (button) {
        const popup = button.closest('.popup');
        button.addEventListener('click', function () {
            handleClosePopup(popup)

        });
    })
})



const setWaitingButton = ((popup)=>{
    const button = popup.querySelector('.form__button-save')
    button.setAttribute('disabled', true);
    button.textContent = "Сохранение..."
})

const unsetWaitingButton = ((popup)=>{
    const button = popup.querySelector('.form__button-save')
    button.textContent = "Сохранение"
})

export { popupEdit, avatarIcon, popupAvatar, setWaitingButton,unsetWaitingButton, profileName, profileJob, handleOpenPopup, handleClosePopup, popupCloseHandler }