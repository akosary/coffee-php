let form = document.querySelector("#myform");
let category_name = document.getElementById("name");

category_name.addEventListener("keypress", () => {
  category_name.nextElementSibling.innerHTML = "";
});

form.addEventListener("submit", (e) => {
  // e.preventDefault();

  if ( !(category_name.value) || !(/^([A-Za-z\s*]+)$/.test(category_name.value)) ) {
    category_name.nextElementSibling.innerHTML =
      "Error: You must enter a category name  ";
    e.preventDefault();
  }
  
});