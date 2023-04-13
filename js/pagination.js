let countURL = "http://localhost/userCountToPaginate.php";
const productsContainer = document.querySelector(".all-products .container");

let per = 12;
const productsData = getProducts(per,1);
let ul = document.getElementById("ul1");
let pro = document.getElementById("products");
async function getCount(url){
  let result = await fetch(url);
  ul.innerHTML="";
  let all = await result.json();
  let usrs= all.countOfPages;
  let totalPages = Math.ceil(usrs/ per);
  for(var i =0;i<totalPages;i++){
      var li = document.createElement("li");
      li.className='page-item'
      let a = document.createElement('a');
      a.appendChild(document.createTextNode(i+1));
      a.className="page-link";
      a.setAttribute("onClick",`getProducts(${per} , ${i+1})`)
      li.appendChild(a)
      ul.appendChild(li);
  }
}


// productsData

//   let productsElements = document.querySelectorAll(".all-products .product");

//   let cartItemsEle = document.querySelector(".shopping-cart .cart-items");
//   console.log(cartItemsEle);

//   for (const key in productsElements) {
//     let productEl = productsElements[key];
//     let product = products[key];

//     productEl.addEventListener("click", () => {
//       console.log(`${product.name} ${product.price} added to the cart`);

//       cartItemsEle.appendChild(
//         createCartItem(product.name.substring(0, 5), product.price)
//       );

//       let deleteIconsElemenst = document.querySelectorAll(
//         ".cart-item .delete-icon"
//       );

//       console.log(deleteIconsElemenst);

//       deleteIconsElemenst.forEach((iconEle) => {
//         iconEle.addEventListener("click", () => {
//           console.log("remove product from cart");
//           iconEle.parentElement.style.display = "none";
//         });
//       });
//     });
//   }
// });

async function getProducts(perPage,pageNumber) {
  getCount(countURL);
  const url = "http://localhost/user-home.php";
  let data;

    let response = await fetch(url,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"perPage":perPage , "pageNumber":pageNumber})
    }).then((response)=>{
      return response.json();
    }).then((products) => {
      productsContainer.innerHTML="";
      for (const product of products) {
        productsContainer.appendChild(
          createProduct(product.name, product.price, product.imagePath)
        )
      }})
}

function createProduct(name, price, image) {
  const productDev = document.createElement("div");
  productDev.classList.add("product");
  productDev.innerHTML = `
                <img
                  class="img-fluid"
                  src="${image}"
                    width="200px"
    
                />
                <div class="d-flex justify-content-between px-2 mt-2">
                  <p class="lead">${name.substring(0, 5)}</p>
                  <p class="lead">${price} LE</p>
                </div>
    `;

  return productDev;
}

function createCartItem(name, price) {
  let cartItemEle = document.createElement("div");
  cartItemEle.classList.add("cart-item");
  cartItemEle.innerHTML = `
      <p class="m-0 product-name">${name}</p>
                <p class="m-0 font-weight-bold product-price">${price}</p>
                <input
                  class="form-control"
                  style="width: 50px"
                  type="number"
                  min="1"
                  step="1"
                  name="product-count"
                  value="1"
                />
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
