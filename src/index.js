import './../src/index.css'
import { togglePopup } from './components/utils'
import { popupAdd, handleAddFormSubmit, renderCards } from './components/card'
import { setDisableButton, setProfileDataInInpur, openPopupEdit, popupCloseHandler, handleProfileFormSubmit } from './components/modal'
import { enableValidation } from './components/validate'


const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const addButton = document.querySelector('.profile__add');
const addForm = document.forms["add-picture"];

profileEdit.addEventListener('click', openPopupEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function () {
    togglePopup(popupAdd);
    setDisableButton(popupAdd)
});


const closePopupKaydowAndOverlay = (() => {
    document.addEventListener('keydown', function (evt) {
        const openPopup = document.querySelector('.popup_opened')
        if (evt.keyCode === 27 && openPopup) {
            openPopup.classList.remove('popup_opened');
        }
    })
    const overlays = Array.from(document.querySelectorAll('.popup__overlay'))
    overlays.forEach((overlay) => {
        overlay.addEventListener('click', () => {
            const openPopup = document.querySelector('.popup_opened')
            openPopup.classList.remove('popup_opened');
        })

    })


})

closePopupKaydowAndOverlay()


addForm.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInpur()

popupCloseHandler()

renderCards();

enableValidation();

