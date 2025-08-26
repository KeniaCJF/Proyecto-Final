console.log("hola munde");

// Array that contains the main images and their names
const cards = [
  {
    image:
      "https://images.pexels.com/photos/31800280/pexels-photo-31800280.jpeg",
    name: "Ardilla",
  },
  {
    image:
      "https://images.pexels.com/photos/32457733/pexels-photo-32457733.jpeg",
    name: "Peces",
  },
  {
    image:
      "https://images.pexels.com/photos/32706805/pexels-photo-32706805.jpeg",
    name: "chat",
  },
];

// const is used to save references to BEM blocks or elements. Use # for ids and . for classes
const modalImageView = document.querySelector("#modal-image-view");
const modalProfile = document.querySelector("#modal-profile");
const travelerProfileEditBtn = document.querySelector(
  ".traveler-profile__edit-btn"
);
const formEditProfile = document.querySelector("#form-edit-profile");
const profileNameInput = document.querySelector("#profile-title");
const profileBioInput = document.querySelector("#profile-description");

// Function to toggle a modal open/close
function toggleModal(modal) {
  modal.classList.toggle("modal_is-opened");
}

// Function to check if any input in the form is invalid.
const validarBoton = (modalInputs) => {
  return modalInputs.some(
    (inputElement) =>
      !inputElement.validity.valid || inputElement.value.trim() === ""
  );
};

const modalForms = Array.from(document.querySelectorAll(".modal__form"));

// Validates form inputs and disables the submit button if any input is invalid.
modalForms.forEach((modalForm) => {
  const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
  const modalButton = modalForm.querySelector(".modal__button");
  modalButton.disabled = validarBoton(modalInputs);

  modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
      let modalError = document.querySelector("#" + modalInput.id + "-error");
      if (!modalInput.validity.valid || modalInput.value.trim() === "") {
        modalError.textContent = "Hay un error";
        modalError.classList.add("modal__error_visible");
      } else {
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }

      modalButton.disabled = validarBoton(modalInputs);
    });
  });
});

// Function to create a card with an image and a title
const createCard = (card) => {
  // Validación de datos antes de crear
  if (!card.image || !card.name) {
    console.warn("No se creó la carta: campos vacíos.");
    return;
  }

  const templatePlaceCard = document
    .querySelector("#template-place-card")
    .content.cloneNode(true);

  const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
  const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

  placeCardImage.src = card.image;
  placeCardImage.alt = card.description || "Imagen sin descripción";
  placeCardTitle.textContent = card.name;

  // Open Image modal when clicking on the card image
  placeCardImage.addEventListener("click", () => {
    modalImageView.classList.toggle("modal_is-opened");
    const modalImage = modalImageView.querySelector(".modal__image");
    const modalCaption = modalImageView.querySelector(".modal__caption");
    modalImage.src = placeCardImage.src;
    modalImage.alt = placeCardImage.alt;
    modalCaption.textContent = placeCardTitle.textContent;
  });

  const placeCardDeleteButton = templatePlaceCard.querySelector(
    ".place-card__delete-button"
  );

  const placeCardLikeButton = templatePlaceCard.querySelector(
    ".place-card__like-button"
  );

  //Button to delete a card
  placeCardDeleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".place-card").remove();
  });

  //Button to like a card
  placeCardLikeButton.addEventListener("click", () => {
    placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
  });

  placesGalleryList.appendChild(templatePlaceCard);
};

const travelerProfileAddPlaceButton = document.querySelector(
  ".traveler-profile__add-place-btn"
);
const travelerProfileDetails = document.querySelector(
  ".traveler-profile__details"
);
const travelerProfileName = travelerProfileDetails.querySelector(
  ".traveler-profile__name"
);
const travelerProfileBio =
  travelerProfileDetails.querySelector(".traveler-profile__bio");

const placesGalleryList = document.querySelector(".places-gallery__list");
const ModalNewPlace = document.querySelector("#modal-new-place");
const modalsClose = Array.from(document.querySelectorAll(".modal__close"));

//This function opens modal Newplace
travelerProfileAddPlaceButton.addEventListener("click", () => {
  toggleModal(ModalNewPlace);
});

// Function to add new images while Modal Newplace is open
ModalNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const tempCard = {};
  const modalForms = ModalNewPlace.querySelector(".modal__form");
  const modalInputs = Array.from(modalForms.querySelectorAll(".modal__input"));

  let isValid = true;

  modalInputs.forEach((modalInput) => {
    const value = modalInput.value.trim();
    tempCard[modalInput.name] = value;

    let modalError = document.querySelector("#" + modalInput.id + "-error");

    if (!value) {
      isValid = false;
      modalError.textContent = "Este campo no puede estar vacío";
      modalError.classList.add("modal__error_visible");
    } else {
      modalError.textContent = "";
      modalError.classList.remove("modal__error_visible");
    }
  });

  if (!isValid) {
    console.warn("No se creó la carta: faltan datos.");
    return;
  }

  createCard(tempCard);
  toggleModal(ModalNewPlace); // cerrar modal si se creó bien
});

console.dir(travelerProfileDetails);

//Open the Edit perfil modal
travelerProfileEditBtn.addEventListener("click", () => {
  profileNameInput.value = travelerProfileName.textContent;
  profileBioInput.value = travelerProfileBio.textContent;
  toggleModal(modalProfile);
});

// Save changes
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nameValue = profileNameInput.value.trim();
  const bioValue = profileBioInput.value.trim();

  if (!nameValue || !bioValue) {
    console.warn("No se guardó: campos vacíos.");
    // aquí podrías poner errores debajo de inputs si quieres
    return;
  }

  travelerProfileName.textContent = nameValue;
  travelerProfileBio.textContent = bioValue;
  toggleModal(modalProfile);
});

// Function to close a modal. Works only for modals that share this class
modalsClose.forEach((modalClose) => {
  modalClose.addEventListener("click", (evt) => {
    let modal = evt.target.closest(".modal");
    toggleModal(modal);
  });
});

// Create the initial cards from the array
cards.forEach((card) => {
  createCard(card);
});

console.dir(travelerProfileName);
