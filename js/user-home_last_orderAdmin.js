let countURL = "http://localhost/userCountToPaginate.php";
const productsContainer = document.querySelector(".all-products .container");
let per = 12;
let myData;
let ul = document.getElementById("ul1");
let pro = document.getElementById("products");
async function getCount(url) {
    let result = await fetch(url);
    ul.innerHTML = "";
    let all = await result.json();
    let usrs = all.countOfPages;
    let totalPages = Math.ceil(usrs / per);
    for (var i = 0; i < totalPages; i++) {
        var li = document.createElement("li");
        li.className = "page-item";
        let a = document.createElement("a");
        a.appendChild(document.createTextNode(i + 1));
        a.className = "page-link";
        a.setAttribute("onClick", `getProductsPagination(${per} , ${i + 1})`);
        li.appendChild(a);
        ul.appendChild(li);
    }
}
async function getProductsPagination(perPage, pageNumber) {
    getCount(countURL);
    const url = "http://localhost/pagination.php";

    let response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ perPage: perPage, pageNumber: pageNumber }),
    });
    myData = await response.json();
}

const productsData = getProductsPagination(per, 1);
let quantity, plus, minus, priceProduct, deleteIconsElemenst;
let arr = [];
let rooms = document.getElementById("room");
let totalInLE = document.getElementById("totalInLE");
productsData.then(() => {
    // console.log(myData);
    for (const product of myData) {
        productsContainer.appendChild(
            createProduct(
                product.id,
                product.name,
                product.price,
                product.imagePath
            )
        );
    }
    let productsElements = document.querySelectorAll(".all-products .product");
    let cartItemsEle = document.querySelector(".shopping-cart .cart-items");
    for (const key in productsElements) {
        let productEl = productsElements[key];
        let product = myData[key];
        productEl.addEventListener("click", () => {
            cartItemsEle.appendChild(
                createCartItem(
                    product.name.substring(0, 5),
                    product.price,
                    product.id
                )
            );
            plus = document.querySelector(".cart-item .plus");
            minus = document.querySelector(".cart-item .minus");
            priceProduct = document.querySelector(".cart-item .product-price");
            let singleTotal = document.querySelector(".cart-item .singleTotal");
            plus.addEventListener("click", (e) => {
                quantity = e.target.previousElementSibling;
                quantity.value++;
                singleTotal = e.target.nextElementSibling.nextElementSibling;
                priceProduct =
                    e.target.previousElementSibling.previousElementSibling;
                singleTotal.innerHTML =
                    quantity.value * priceProduct.textContent;
                total();
            });
            minus.addEventListener("click", (e) => {
                quantity =
                    e.target.previousElementSibling.previousElementSibling;
                quantity.value--;
                singleTotal = e.target.nextElementSibling;
                singleTotal.innerHTML =
                    quantity.value * priceProduct.textContent;
                total();
                if (quantity.value <= 0) {
                    e.target.parentElement.classList.add("d-none");
                }
            });
            plus.classList.remove("plus");
            minus.classList.remove("minus");
            priceProduct.classList.remove("product-price");
            singleTotal.classList.remove("singleTotal");
            deleteIconsElemenst = document.querySelectorAll(
                ".cart-item .delete-icon"
            );
            deleteIconsElemenst.forEach((iconEle) => {
                iconEle.addEventListener("click", () => {
                    iconEle.parentElement.style.display = "none";
                    totalInLE.value = "";
                });
            });
        });
    }
});
function total() {
    totalInLE.value = 0;
    let totalSingles = document.querySelectorAll(".total_si");
    totalSingles.forEach((element) => {
        totalInLE.value =
            parseInt(totalInLE.value) + parseInt(element.textContent);
    });
}

async function getProducts() {
    const url = "http://localhost/card.php";
    let data;
    try {
        let response = await fetch(url);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    return data;
}

function createProduct(id, name, price, image) {
    const productDev = document.createElement("div");
    productDev.classList.add("product");
    productDev.innerHTML = `
                <img
                  class="img-fluid"
                  src="${image}"
                    width="200px"
                />
                <div class="d-flex justify-content-between px-2 mt-2">
                  <p data-id = '${id}' class="lead">${name.substring(0, 5)}</p>
                  <p class="lead">${price} LE</p>
                </div>
    `;
    return productDev;
}

function createCartItem(name, price, id) {
    // if (arr.includes(id)) return;
    arr.push(id);
    let cartItemEle = document.createElement("div");
    cartItemEle.classList.add("cart-item");
    cartItemEle.innerHTML = `
      <p data-id = '${id}' class="m-0 product-name">${name}</p>
                <p class="m-0 font-weight-bold product-price">${price}</p>
                <input
                  class="form-control quantity"
                  style="width: 50px"
                  type="text"
                  name="product-count"
                  value= '1'
                />
                <a class='btn btn-primary p-2 plus'>
                <i class="text-white fa-solid fa-plus"></i>
                </a>
                <a class='btn btn-primary p-2 minus'>
                <i class="text-white fa-solid fa-minus"></i>
                </a>
                <p class='total_si singleTotal'>${price}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="delete-icon"
                  width="24"
                  height="24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

      `;

    return cartItemEle;
}
let data;
async function getRooms() {
    const url = "http://localhost/room.php";
    try {
        let response = await fetch(url);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    return data;
}
getRooms().then(() => {
    for (let index = 0; index < data.length; index++) {
        let option = document.createElement("option");
        option.innerHTML = data[index].id;
        option.value = data[index].id;
        rooms.appendChild(option);
    }
});
let confirmForm = document.getElementById("confirm");
confirmForm.addEventListener("click", (e) => {
    // console.log(confirmForm);
    // e.preventDefault();
    let formEdit = document.getElementById("formEdit");
    let form_data = new FormData(formEdit);
    postData(form_data);
});
let confirmUrl = "http://localhost/confirm.php";
async function postData(num) {
    try {
        let response = await fetch(confirmUrl, {
            method: "POST",
            header: { "Content-type": "application/json; charset=UTE-8" },
            body: num,
        });
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
}
let users = document.getElementById("users");
async function getAllUsers() {
    customURL = "http://localhost/users.php";
    try {
        let response = await fetch(customURL);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
}
getAllUsers().then(() => {
    for (let index = 0; index < data.length; index++) {
        let option = document.createElement("option");
        option.innerHTML = data[index].name;
        option.value = data[index].id;
        users.appendChild(option);
    }
});
//////////////////////////last order///////////////////
async function getLastOrderProducts() {
    let res = await fetch("http://localhost/last_order.php");
    let data = await res.json();
    // createProduct(data.name, data.price, data.imagePath);
    displayorders(data);
}

function displayorders(product) {
    // console.log(order);
    let category_row;
    product.forEach((category) => {
        category_row = getorderRow(category);
        document.querySelector(".orders").append(category_row);
    });
}

function getorderRow(category) {
    let div = document.createElement("div");

    var category_name = document.createElement("p");
    var category_img = document.createElement("img");
    category_img.classList.add("last_one");
    div.append(category_img);
    div.append(category_name);

    category_name.innerHTML = category.name;
    category_img.src = category.imagePath;
    return div;
}
getLastOrderProducts();
