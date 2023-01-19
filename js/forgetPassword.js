// let button = document.querySelector("form button");
let loginform = document.getElementById("loginform")
let Email1 = document.getElementById("Email1");
let Password1 = document.getElementById("Password1");

Email1.addEventListener("keypress", () => {
  Email1.nextElementSibling.innerHTML = "";
});
Password1.addEventListener("keypress", () => {
  Password1.nextElementSibling.innerHTML = "";
});

loginform.addEventListener("submit", (e) => {

  if (!/^(\w+)@([A-Za-z]{3,})[.]([A-Za-z]{3,})$/.test(Email1.value)) {
    Email1.nextElementSibling.innerHTML =
      "Error: Your Email Dosen't Match Formatting (abc@yahoo.com)";
    e.preventDefault();
  }
  if (!/^[0-9]{4,8}$/.test(Password1.value)) {
    Password1.nextElementSibling.innerHTML =
      "Error: Your Password Doesn't Match Formatting (********...)";
    e.preventDefault();
  }
});