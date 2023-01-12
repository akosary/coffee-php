let tbody = document.querySelector(".allUsers .table tbody");
let number = document.querySelector(".allUsersNum .number2");
let data;
async function usersData() {
  let url = "http://localhost:82/cafateria/coffee-php/php/all_users.php";
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  return data;
}
usersData().then(() => {
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
    td.innerHTML = `${data[index].roomNumber}`;
    tr.appendChild(td);
    td = document.createElement("td");
    let img = document.createElement("img");
    img.src = `${data[index].imgPath}`;
    td.innerHTML = "";
    td.appendChild(img);
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<a class="btn">Edit</a><a class="btn">Delete</a>`;
    tr.appendChild(td);
    tr.className = "d-none";
    tbody.appendChild(tr);
  }
  let span = document.createElement("span");
  span.innerHTML = "...";
  span.className = "fs-2 btn mt-auto";
  number.appendChild(span);
  let liNumber = document.querySelectorAll(".allUsersNum .numbers li");
  let rows = document.querySelectorAll(".allUsers .table tbody tr");
  let numberRowsIsDisplay = 3;
  liNumber[0].className = "active";
  if (liNumber[0].classList.contains("active")) {
    for (let index = 0; index < numberRowsIsDisplay; index++) {
      rows[index].className = "";
    }
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
          rows[index].className = "";
          console.log(rows[index]);
        }
      }
    });
  }

  let chevronRight = document.querySelector(".allUsersNum .fa-chevron-right");
  let chevronLeft = document.querySelector(".allUsersNum .fa-chevron-left");
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

  let anglesRight = document.querySelector(".allUsersNum .fa-angles-right");
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
        rows[index].className = "";
      }
    }
  });
  let anglesLeft = document.querySelector(".allUsersNum .fa-angles-left");
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
});
