const requestModal = document.querySelector(".new-user");
const requestLink = document.querySelector(".add-user");

// open add user modal
requestLink.addEventListener("click", () => {
  requestModal.classList.add("open");
});

// close add user modal
requestModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("new-user")) {
    requestModal.classList.remove("open");
  }
});
