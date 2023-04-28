const modal = document.querySelector('#modal')!
const modalContent = document.querySelector('#modal-content #message')!
const modalButton = document.querySelector('#modal button')!

export const closeModal = () => {
  modal.classList.remove('modal');
  modal.classList.add('hidden');
}

export const openModal = (message: string, isComment?: boolean) => {
  if (isComment) {
    modalContent.innerHTML = `<h3>${message}</h3>`;
  } else {
    modalContent.innerHTML = `<h2>GAME OVER <br />${message}</h2>`;
  }
  modal.classList.remove('hidden');
  modal.classList.add('modal');
}

modalButton.addEventListener('click', () => closeModal());