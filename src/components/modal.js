import { togglePopup } from './utils'

const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');

const setProfileDataInInpur = (() => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

const setDisableButton = ((form) => {
    const button = form.querySelector('.form__button-save');
    button.setAttribute('disabled', true);
    button.classList.add('button_inactive');
})

const openPopupEdit = (() => {
    setDisableButton(popupEdit)
    document.querySelector('.name-input-error').textContent = ''
    document.querySelector('.text-input-error').textContent = ''
    togglePopup(popupEdit);
    setProfileDataInInpur();
})

const popupCloseHandler = (function () {
    closeButtons.forEach(function (button) {
        const popup = button.closest('.popup');
        button.addEventListener('click', function () {
            togglePopup(popup)
        });
    })
})

const handleProfileFormSubmit = ((evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(popupEdit);
})


export { setDisableButton, setProfileDataInInpur, togglePopup, openPopupEdit, popupCloseHandler, handleProfileFormSubmit }