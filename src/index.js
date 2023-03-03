import './../pages/index.css'
import {togglePopup} from './components/utils'
import {createCard, addCard, handleAddFormSubmit, renderCards, handleLike, deleteCard, handleDeleteCard, handleImgOpen} from './components/card'
import {openPopupEdit, popupCloseHandler, handleProfileFormSubmit} from './components/modal'
import {showInputError, hideInputError, checkInputValidity, hasInvalidInput, enableButton, setEventListeners, enableValidation} from './components/validate'


const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const popupAdd = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add');
const addForm = document.forms["add-picture"];

profileEdit.addEventListener('click', openPopupEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);



addButton.addEventListener('click', function () {
    togglePopup(popupAdd);
});

addForm.addEventListener('submit', handleAddFormSubmit);

renderCards();

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 

