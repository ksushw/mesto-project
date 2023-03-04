import './../src/index.css'
import { togglePopup } from './components/utils'
import { popupAdd, handleAddFormSubmit, renderCards } from './components/card'
import { closePopupKaydowAndOverlay, setDisableButton, setProfileDataInInpur, openPopupEdit, popupCloseHandler, handleProfileFormSubmit } from './components/modal'
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
 
closePopupKaydowAndOverlay()


addForm.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInpur()

popupCloseHandler()

renderCards();

enableValidation();

