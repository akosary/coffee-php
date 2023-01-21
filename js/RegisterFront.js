// let button = document.querySelector("form button");
let form = document.querySelector("#myform");
let fullName = document.getElementById("fullName");
let Email1 = document.getElementById("Email1");
let Password1 = document.getElementById("Password1");
let confirmPassword = document.getElementById("Password2");
let room_num = document.getElementById("room_number");
let Profile_image = document.getElementById("Profile_image");


fullName.addEventListener("keypress", () => {
  fullName.nextElementSibling.innerHTML = "";
});
Email1.addEventListener("keypress", () => {
  Email1.nextElementSibling.innerHTML = "";
});
Password1.addEventListener("keypress", () => {
  Password1.nextElementSibling.innerHTML = "";
});
confirmPassword.addEventListener("keypress", () => {
  confirmPassword.nextElementSibling.innerHTML = "";
});
room_num.addEventListener("keypress", () => {
  room_num.nextElementSibling.innerHTML = "";
});
Profile_image.addEventListener("keypress", () => {
  Profile_image.nextElementSibling.innerHTML = "";
});

// console.log(form);

form.addEventListener("submit", (e) => {
  // e.preventDefault();
  if (!/(^[A-Za-z]+)\s([A-Za-z]+)$/.test(fullName.value)) {
    fullName.nextElementSibling.innerHTML =
      "Error: Your Name Doesn't Match Formatting (Mohamed Shehata)";
    e.preventDefault();
  }
  if (!/^(\w+)@([A-Za-z]{3,})[.]([A-Za-z]{3,})$/.test(Email1.value)) {
    Email1.nextElementSibling.innerHTML =
      "Error: Your Email Doesn't Match Formatting (abc@yahoo.com)";
    e.preventDefault();
  }
  if (!/^[0-9]{4,8}$/.test(Password1.value)) {
    Password1.nextElementSibling.innerHTML =
      "Error: Your Password Doesn't Match Formatting (********...)";
    e.preventDefault();
  }
  if ( !(Password1.value===confirmPassword.value) || !(confirmPassword.value) )  {
    confirmPassword.nextElementSibling.innerHTML =
      "Error: Your Confirm Password Doesn't Match Your Password (********...)";
    e.preventDefault();
  }
  if ( !(room_num.value) ) {
    room_num.nextElementSibling.innerHTML =
      "Error: You must choose a room number ";
    e.preventDefault();
  }
  if ( !(Profile_image.value) ) {
    Profile_image.nextElementSibling.innerHTML =
      "Error: You must choose a Profile image ";
    e.preventDefault();
  }
  
});
