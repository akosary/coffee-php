// let button = document.querySelector("form button");
let form = document.querySelector("#myform");
let product_name = document.getElementById("product_name");
let product_price = document.getElementById("product_price");
let product_quantity = document.getElementById("product_quantity");
let product_img = document.getElementById("product_image");

///////////////////////////get admin///////////////////////

async function getuserData(){
  let res = await fetch("http://localhost/admin_session.php");
  let data = await res.json();
  displayUserNameAndImage(data);
}
function displayUserNameAndImage(data){
  document.getElementById("img1").src=data.imgPath;
  document.getElementById("a1").innerHTML=data.name;
}
getuserData();



/////////////////////////////getcategories///////////////////////////
async function getorders() {
  let res = await fetch("http://localhost/products_session.php");
  let data = await res.json();
  displayorders(data);
}


function displayorders(category) {
  // console.log(order);
  let category_row;
  category.forEach((category) => {
    category_row = getorderRow(category);       
      document.querySelector("#category").append(category_row);
  });
}

function getorderRow(category) {
  // document.querySelector("#category").i=category.name;
  var category_name =document.createElement("option");
  category_name.value=category.id;
  category_name.innerHTML=category.name;
  return category_name;
}
getorders();



//////////////////////validation////////////////////////////
product_name.addEventListener("keypress", () => {
  product_name.nextElementSibling.innerHTML = "";
});
product_img.addEventListener("keypress", () => {
  product_img.nextElementSibling.innerHTML = "";
});

// console.log(form);

form.addEventListener("submit", (e) => {
  // e.preventDefault();

  if ( !(product_name.value) || !(/^([A-Za-z\s*]+)$/.test(product_name.value)) ) {
    product_name.nextElementSibling.innerHTML =
      "Error: You must enter a product name  ";
    e.preventDefault();
  }
  if (!/^([0-9]+)$/.test(product_price.value)||!(product_price.value)) {
    product_price.nextElementSibling.innerHTML =
      "Error: You must enter numeric price  ";
    e.preventDefault();
  }
  if (!/^([0-9]+)$/.test(product_quantity.value)||!(product_quantity.value)) {
    product_quantity.nextElementSibling.innerHTML =
      "Error: You must enter numeric quantity ";
    e.preventDefault();
  }
  if ( !(product_img.value) ) {
    product_img.nextElementSibling.innerHTML =
      "Error: You must choose a product image ";
    e.preventDefault();
  }
  
});
