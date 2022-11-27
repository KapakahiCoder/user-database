const newUserModal = document.querySelector(".new-user");
const addUserLink = document.querySelector(".add-user");
const newUserForm = document.querySelector(".new-user form");

// open add user modal
addUserLink.addEventListener("click", () => {
  newUserModal.classList.add("open");
});

// close add user modal
newUserModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("new-user")) {
    newUserModal.classList.remove("open");
  }
});

// add new user
newUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addUser = firebase.functions().httpsCallable("addUser");
  addUser({
    firstName: newUserForm.firstName.value,
    lastName: newUserForm.lastName.value,
    email: newUserForm.email.value,
    age: newUserForm.age.value,
    street: newUserForm.street.value,
    city: newUserForm.city.value,
    state: newUserForm.state.value,
    zipCode: newUserForm.zipCode.value,
  })
  .then(()=> {
    newUserForm.reset();
    newUserModal.classList.remove("open");
    newUserForm.querySelector(".error").textContent = "";
  })
  .catch(error => {
    newUserForm.querySelector(".error").textContent = error.message;
  });
});