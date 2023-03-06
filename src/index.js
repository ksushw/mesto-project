import './../pages/index.css'
import { getInitialCards, getUserInfo } from '../api'
import { openPopup, closePopup } from './components/utils'
import { popupAdd, handleAddFormSubmit, renderCards } from './components/card'
import { profileName, profileJob, handleOpenPopup, setProfileDataInInput, openPopupEdit, popupCloseHandler, handleProfileFormSubmit } from './components/modal'
import { enableValidation, setDisableButton } from './components/validate'


const profilePicture = document.querySelector('.profile__photo')

getUserInfo()
    .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        profilePicture.src = userInfo.avatar;
    })


getInitialCards()
    .then((cards) => {
        renderCards(cards)

    })

const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const addButton = document.querySelector('.profile__add');
const addForm = document.forms["add-picture"];

profileEdit.addEventListener('click', openPopupEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function () {
    handleOpenPopup(popupAdd);
    setDisableButton(popupAdd);
});




addForm.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInput()

popupCloseHandler()



// enableValidation();

