let tbody = document.querySelector(".allProducts .table tbody");
let number = document.querySelector(".allProductsNum .number2");
let data;
let edits = document.querySelector(".allProducts tbody");
async function productsData() {
  let url = "http://localhost:82/cafateria/coffee-php/php/all_products.php";
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

productsData().then(() => {
  let numberSlider = 1;
  for (let index = 0; index < data.length; index++) {
    let tr = document.createElement("tr");
    let li = document.createElement("li");
    let numbers = document.createElement("a");
    if (!(index % 3)) {
      numbers.textContent = numberSlider++;
      numbers.className = "fs-2 btn";
      number.appendChild(li);
    }
    li.appendChild(numbers);
    let td = document.createElement("td");
    td.innerHTML = `${data[index].name}`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `${data[index].price}`;
    tr.appendChild(td);
    td = document.createElement("td");
    let img = document.createElement("img");
    img.src = `${data[index].imagePath}`;
    td.appendChild(img);
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<a href="#" class="genric-btn mb-2 primary small circle">${data[index].status}</a><br>
        <button class="genric-btn info edit mb-1 circle">Edit</button>
        <a href="#" class="genric-btn danger small circle">Delete</a>`;
    tr.appendChild(td);
    tr.className = "d-none";
    tbody.appendChild(tr);
  }
  let span = document.createElement("span");
  span.innerHTML = "...";
  span.className = "fs-2 btn mt-auto";
  number.appendChild(span);
  let liNumber = document.querySelectorAll(".allProductsNum .numbers li");
  let rows = document.querySelectorAll(".allProducts .table tbody tr");
  let numberRowsIsDisplay = 3;
  liNumber[0].className = "active";
  if (liNumber[0].classList.contains("active")) {
    for (let index = 0; index < numberRowsIsDisplay; index++) {
      rows[index].className = "displayActive";
    }
    edits = document.querySelectorAll(".displayActive .edit");
  } else {
    rows[index].className = "d-none";
  }

  for (let index = 0; index < liNumber.length; index++) {
    liNumber[index].addEventListener("click", () => {
      for (let index = 0; index < liNumber.length; index++) {
        liNumber[index].className = "";
      }
      liNumber[index].className = "active";
      for (let i = 0; i < rows.length; i++) {
        rows[i].className = "d-none";
      }
      if (liNumber[index].classList.contains("active")) {
        let start = index * 3;
        if (index + 1 === liNumber.length) {
          numberRowsIsDisplay = array.length - start;
        } else {
          numberRowsIsDisplay = 3;
        }
        for (let index = start; index < start + numberRowsIsDisplay; index++) {
          rows[index].className = "displayActive";
        }
        edits = document.querySelectorAll(".displayActive .edit");
      }
    });
  }

  let chevronRight = document.querySelector(
    ".allProductsNum .fa-chevron-right"
  );
  let chevronLeft = document.querySelector(".allProductsNum .fa-chevron-left");
  let margin = -90;
  let click = 1;
  chevronRight.parentElement.addEventListener("click", (e) => {
    if (click <= liNumber.length / 2) {
      number.style = `margin-left: ${margin}px;`;
      margin = margin - 90;
      click++;
    }
  });
  let margin2 = 90;
  chevronLeft.parentElement.addEventListener("click", (e) => {
    if (click > 1) {
      liNumber[0].style = `margin-left: ${margin2}px;`;
      margin2 = margin2 + 90;
      click--;
    }
  });

  let anglesRight = document.querySelector(".allProductsNum .fa-angles-right");
  let activeRight;
  anglesRight.parentElement.addEventListener("click", () => {
    for (let index = 0; index < liNumber.length; index++) {
      if (liNumber[index].classList.contains("active")) {
        activeRight = index;
        if (index === liNumber.length - 1) {
          activeRight = liNumber.length - 2;
        }
      }
    }
    liNumber.forEach((element) => {
      element.className = "";
    });
    liNumber[activeRight + 1].className = "active";
    rows.forEach((element) => {
      element.className = "d-none";
    });
    if (liNumber[activeRight + 1].classList.contains("active")) {
      let start = (activeRight + 1) * 3;
      if (activeRight + 2 === liNumber.length) {
        numberRowsIsDisplay = data.length - start;
      } else {
        numberRowsIsDisplay = 3;
      }
      for (let index = start; index < start + numberRowsIsDisplay; index++) {
        rows[index].className = "displayActive";
      }
      edits = document.querySelectorAll(".displayActive .edit");
    }
  });
  let anglesLeft = document.querySelector(".allProductsNum .fa-angles-left");
  let activeLeft;
  anglesLeft.parentElement.addEventListener("click", () => {
    for (let index = 0; index < liNumber.length; index++) {
      if (liNumber[index].classList.contains("active")) {
        activeLeft = index;
        if (index === 0) {
          activeLeft = 1;
        }
      }
    }
    liNumber.forEach((element) => {
      element.className = "";
    });
    liNumber[activeLeft - 1].className = "active";
    rows.forEach((element) => {
      element.className = "d-none";
    });
    if (liNumber[activeLeft - 1].classList.contains("active")) {
      let start = (activeLeft - 1) * 3;
      if (activeLeft - 2 === liNumber.length) {
        numberRowsIsDisplay = array.length - start;
      } else {
        numberRowsIsDisplay = 3;
      }
      for (let index = start; index < start + numberRowsIsDisplay; index++) {
        rows[index].className = "displayActive";
      }
      edits = document.querySelectorAll(".displayActive .edit");
    }
  });
  edits[0].addEventListener("click", (e) => {
    let tds = edits[0].parentElement.parentElement.children;
    // if (tds[0].children[0] ) {

    // } else {

    // }
    e.preventDefault();
    let form = document.createElement("form");
    form.className = "row w-100 m-auto";
    form.method = "get";
    for (let index = 0; index < 3; index++) {
      let inputText = document.createElement("input");
      inputText.type = index === 2 ? "file" : "text";
      inputText.className = "form-control col-4 mb-3";
      inputText.name =
        index === 0 ? "nameProduct" : index === 1 ? "price" : "image";
      inputText.defaultValue = `${tds[index].textContent}`;
      tds[index].innerHTML = "";
      form.appendChild(inputText);
    }
    tds[0].setAttribute("colspan", "3");
    tds[2].remove();
    tds[1].remove();
    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "confirm";
    submit.className = "genric-btn info circle small m-auto";
    form.appendChild(document.createElement("br"));
    form.appendChild(submit);
    tds[0].appendChild(form);
    console.log("test");
    console.log(e);
  });
  // for (let index = 0; index < edits.length; index++) {
  //   edits[index].addEventListener("click", () => {
  //     editMethod(edits[index]);
  //   });
  // }
  // editMethod();
});

let editMethod = (edits) => {
  let tds = edits.parentElement.parentElement.children;
  let form = document.createElement("form");
  let inputText = document.createElement("input");
  form.method = "get";
  inputText.type = "text";
  inputText.className = "form-control";
  inputText.name = "nameProduct";
  inputText.defaultValue = `${tds[0].textContent}`;
  tds[0].innerHTML = "";
  form.appendChild(inputText);
  let submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "confirm";
  submit.className = "genric-btn mt-2 info circle small";
  form.appendChild(submit);
  tds[0].appendChild(form);
  form = document.createElement("form"); //////////////////////////
  inputText = document.createElement("input");
  form.method = "get";
  inputText.type = "text";
  inputText.className = "form-control";
  inputText.name = "price";
  inputText.defaultValue = `${tds[1].textContent}`;
  tds[1].innerHTML = "";
  form.appendChild(inputText);
  submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "confirm";
  submit.className = "genric-btn mt-2 info circle small";
  form.appendChild(submit);
  tds[1].appendChild(form);
  form = document.createElement("form"); ///////////////////////
  inputText = document.createElement("input");
  form.method = "get";
  inputText.type = "file";
  inputText.className = "form-control";
  inputText.name = "image";
  tds[2].innerHTML = "";
  form.appendChild(inputText);
  submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "confirm";
  submit.className = "genric-btn mt-2 info circle small";
  form.appendChild(submit);
  tds[2].appendChild(form);
};
// .then(() => {
//   let Product = document.getElementById("addProduct");
//   Product.addEventListener("click", () => {
//     let form = document.createElement("form");
//     form.appendChild(edits[0].parentElement.parentElement);
//     edits[1].parentElement.parentElement.before(form);
//   });
// edits[0].addEventListener("click", () => {
// });
// });

// let numberSlider = 1;
// for (let index = 0; index < array.length; index++) {
//   let tr = document.createElement("tr");
//   let li = document.createElement("li");
//   let numbers = document.createElement("a");
//   if (!(index % 3)) {
//     numbers.textContent = numberSlider++;
//     numbers.className = "fs-2 btn ms-md-2 ms-lg-3";
//     number.appendChild(li);
//   }
//   li.appendChild(numbers);
//   for (let i = 0; i < array[index].length + 1; i++) {
//     let td = document.createElement("td");
//     td.innerHTML = `${array[index][i]}`;
//     if (i == 2) {
//       let img = document.createElement("img");
//       img.src = `${array[index][i]}`;
//       td.innerHTML = "";
//       td.appendChild(img);
//     } else if (i == 3) {
//       td.innerHTML = `<a class="btn">Unavailable</a><br>
//       <a class="btn">Edit</a>
//       <a class="btn">Delete</a>`;
//       td.className = "";
//     }
//     tr.appendChild(td);
//   }
//   tr.className = "d-none";
//   tbody.appendChild(tr);
// }
// let span = document.createElement("span");
// span.innerHTML = "...";
// span.className = "fs-2 btn mt-auto";
// number.appendChild(span);

// let liNumber = document.querySelectorAll(".allProductsNum .numbers li");
// let rows = document.querySelectorAll(".allProducts .table tbody tr");
// let numberRowsIsDisplay = 3;
// liNumber[0].className = "active";
// if (liNumber[0].classList[0] == "active") {
//   for (let index = 0; index < numberRowsIsDisplay; index++) {
//     rows[index].className = "";
//   }
// } else {
//   rows[index].className = "d-none";
// }

// for (let index = 0; index < liNumber.length; index++) {
//   liNumber[index].addEventListener("click", () => {
//     liNumber.forEach((element) => {
//       element.className = "";
//     });
//     liNumber[index].className = "active";
//     for (let i = 0; i < rows.length; i++) {
//       rows[i].className = "d-none";
//     }
//     if (liNumber[index].classList[0] == "active") {
//       let start = index * 3;
//       if (index + 1 === liNumber.length) {
//         numberRowsIsDisplay = array.length - start;
//       } else {
//         numberRowsIsDisplay = 3;
//       }
//       for (let index = start; index < start + numberRowsIsDisplay; index++) {
//         rows[index].className = "";
//       }
//     }
//   });
// }

// let chevronRight = document.querySelector(".allProductsNum .fa-chevron-right");
// let chevronLeft = document.querySelector(".allProductsNum .fa-chevron-left");
// let margin = -50;
// let click = 1;
// chevronRight.parentElement.addEventListener("click", (e) => {
//   if (click <= liNumber.length / 3) {
//     number.style = `margin-left: ${margin}px;`;
//     margin = margin - 50;
//     click++;
//   }
// });
// let margin2 = 50;
// chevronLeft.parentElement.addEventListener("click", (e) => {
//   if (click > 1) {
//     liNumber[0].style = `margin-left: ${margin2}px;`;
//     margin2 = margin2 + 50;
//     click--;
//   }
// });
// let anglesRight = document.querySelector(".allProductsNum .fa-angles-right");
// let activeRight;
// anglesRight.parentElement.addEventListener("click", () => {
//   for (let index = 0; index < liNumber.length; index++) {
//     if (liNumber[index].classList.contains("active")) {
//       activeRight = index;
//       if (index === liNumber.length - 1) {
//         activeRight = liNumber.length - 2;
//       }
//     }
//   }
//   liNumber.forEach((element) => {
//     element.className = "";
//   });
//   liNumber[activeRight + 1].className = "active";
//   rows.forEach((element) => {
//     element.className = "d-none";
//   });
//   if (liNumber[activeRight + 1].classList.contains("active")) {
//     let start = (activeRight + 1) * 3;
//     if (activeRight + 2 === liNumber.length) {
//       numberRowsIsDisplay = array.length - start;
//     } else {
//       numberRowsIsDisplay = 3;
//     }
//     for (let index = start; index < start + numberRowsIsDisplay; index++) {
//       rows[index].className = "";
//     }
//   }
// });
// let anglesLeft = document.querySelector(".allProductsNum .fa-angles-left");
// let activeLeft;
// anglesLeft.parentElement.addEventListener("click", () => {
//   for (let index = 0; index < liNumber.length; index++) {
//     if (liNumber[index].classList.contains("active")) {
//       activeLeft = index;
//       if (index === 0) {
//         activeLeft = 1;
//       }
//     }
//   }
//   liNumber.forEach((element) => {
//     element.className = "";
//   });
//   liNumber[activeLeft - 1].className = "active";
//   rows.forEach((element) => {
//     element.className = "d-none";
//   });
//   if (liNumber[activeLeft - 1].classList.contains("active")) {
//     let start = (activeLeft - 1) * 3;
//     if (activeLeft - 2 === liNumber.length) {
//       numberRowsIsDisplay = array.length - start;
//     } else {
//       numberRowsIsDisplay = 3;
//     }
//     for (let index = start; index < start + numberRowsIsDisplay; index++) {
//       rows[index].className = "";
//     }
//   }
// });
