let tbody = document.querySelector(".allProducts .table tbody");
let number = document.querySelector(".allProductsNum .number2");

let array = [
  ["Tea", "5 EGP", "../images/test.png"],
  ["Tea2222222", "5 EGP", "../images/test.png"],
  ["Tea23332", "5 EGP", "../images/test.png"],
  ["4444", "4 EGP", "../images/test.png"],
  ["5555", "55 EGP", "../images/test.png"],
  ["6666", "55 EGP", "../images/test.png"],
  ["7777", "55 EGP", "../images/test.png"],
  ["888", "55 EGP", "../images/test.png"],
  ["999", "55 EGP", "../images/test.png"],
  ["10", "55 EGP", "../images/test.png"],
  ["11", "55 EGP", "../images/test.png"],
  ["12", "55 EGP", "../images/test.png"],
  ["13", "55 EGP", "../images/test.png"],
  ["14", "55 EGP", "../images/test.png"],
  ["15", "55 EGP", "../images/test.png"],
  ["16", "55 EGP", "../images/test.png"],
];
let numberSlider = 1;
for (let index = 0; index < array.length; index++) {
  let tr = document.createElement("tr");
  let li = document.createElement("li");
  let numbers = document.createElement("a");
  if (!(index % 3)) {
    numbers.textContent = numberSlider++;
    numbers.className = "fs-2 btn ms-md-2 ms-lg-3";
    number.appendChild(li);
  }
  li.appendChild(numbers);
  for (let i = 0; i < array[index].length + 1; i++) {
    let td = document.createElement("td");
    td.innerHTML = `${array[index][i]}`;
    if (i == 2) {
      let img = document.createElement("img");
      img.src = `${array[index][i]}`;
      td.innerHTML = "";
      td.appendChild(img);
    } else if (i == 3) {
      td.innerHTML = `<a class="btn">Unavailable</a>
      <a class="btn">Edit</a>
      <a class="btn">Delete</a>`;
    }
    tr.appendChild(td);
  }
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
if (liNumber[0].classList[0] == "active") {
  for (let index = 0; index < numberRowsIsDisplay; index++) {
    rows[index].className = "";
  }
} else {
  rows[index].className = "d-none";
}

for (let index = 0; index < liNumber.length; index++) {
  liNumber[index].addEventListener("click", () => {
    liNumber.forEach((element) => {
      element.className = "";
    });
    liNumber[index].className = "active";
    for (let i = 0; i < rows.length; i++) {
      rows[i].className = "d-none";
    }
    if (liNumber[index].classList[0] == "active") {
      let start = index * 3;
      if (index + 1 === liNumber.length) {
        numberRowsIsDisplay = array.length - start;
      } else {
        numberRowsIsDisplay = 3;
      }
      for (let index = start; index < start + numberRowsIsDisplay; index++) {
        rows[index].className = "";
      }
    }
  });
}

let chevronRight = document.querySelector(".allProductsNum .fa-chevron-right");
let chevronLeft = document.querySelector(".allProductsNum .fa-chevron-left");
let margin = -50;
let click = 1;
chevronRight.parentElement.addEventListener("click", (e) => {
  if (click <= liNumber.length / 3) {
    number.style = `margin-left: ${margin}px;`;
    margin = margin - 50;
    click++;
  }
});
let margin2 = 50;
chevronLeft.parentElement.addEventListener("click", (e) => {
  if (click > 1) {
    liNumber[0].style = `margin-left: ${margin2}px;`;
    margin2 = margin2 + 50;
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
      numberRowsIsDisplay = array.length - start;
    } else {
      numberRowsIsDisplay = 3;
    }
    for (let index = start; index < start + numberRowsIsDisplay; index++) {
      rows[index].className = "";
    }
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
      rows[index].className = "";
    }
  }
});
