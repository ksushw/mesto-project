const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

const togglePopup = ((popup) => {
    popup.classList.toggle('popup_opened');
})  
const openPopupEdit = (() => {
    togglePopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

const popupCloseHandler = (function()  {closeButtons.forEach(function (button) {
    const popup = button.closest('.popup');
    button.addEventListener('click', function () {
        togglePopup(popup)
    });
})})//question

const handleProfileFormSubmit = ((evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
})


export { openPopupEdit, popupCloseHandler, handleProfileFormSubmit }