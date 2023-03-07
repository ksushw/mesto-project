import './../pages/index.css'
import { getInitialCards, getUserInfo } from '../api'
import { openPopup, closePopup } from './components/utils'
import { popupAdd, handleAddFormSubmit, renderCards } from './components/card'
import { profileName, profileJob, handleOpenPopup, setProfileDataInInput, openPopupEdit, popupCloseHandler, handleProfileFormSubmit, editAvatar } from './components/modal'
import { enableValidation, setDisableButton, formSelectors } from './components/validate'




let userId = '';
const profileEdit = document.querySelector('.profile__edit');
const profileForm = document.forms["edit-profile"];
const addButton = document.querySelector('.profile__add');
const addForm = document.forms["add-picture"];
const profilePicture = document.querySelector('.profile__photo-img');
const popupAvatar = document.querySelector('.popup_type_avatar-edit');
const formAvatar = document.forms["edit-profile-img"];
const avatarIcon = document.querySelector('.profile__photo');






getUserInfo()
    .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        profilePicture.src = userInfo.avatar;
        userId = userInfo._id;
    })
    .catch((err) => {
        console.log(err); 
      });


getInitialCards()
    .then((cards) => {
        renderCards(Array.from(cards))
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });


avatarIcon.addEventListener('click', function(){
    handleOpenPopup(popupAvatar);
    setDisableButton(popupAvatar);
}) 

formAvatar.addEventListener('submit', editAvatar)

profileEdit.addEventListener('click', openPopupEdit);

profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function () {
    handleOpenPopup(popupAdd);
    setDisableButton(popupAdd);
});


addForm.addEventListener('submit', handleAddFormSubmit);

setProfileDataInInput()

popupCloseHandler()

enableValidation(formSelectors);

export { userId, avatarIcon, popupAvatar }