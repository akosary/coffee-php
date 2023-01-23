let tbody = document.querySelector(".allProducts .table tbody");
let number = document.querySelector(".allProductsNum .number2");
let formPopup = document.getElementById("form-popup");
let closeForm = document.getElementById("close");
let select = document.getElementById("category");
let imageAdmin = document.getElementById("imageAdmin");
let nameAdmin = document.getElementById("nameAdmin");
let change = document.getElementById("change");
let product = document.getElementById("product");
let price = document.getElementById("price");
let image = document.getElementById("image");
let success = document.getElementById("success");
let stopFunction = 0;
let rows = 0;
let myData, liNumber, edits, doNotSend, switchAvailability, ableOrDisable;
let rowsAlreadyGit = [];
let mainInformation = [];
let url = "http://localhost/php/all_products.php";
async function postData(num) {
    let jsonData = num;
    if (typeof num !== "string" || num === "count") {
        jsonData = JSON.stringify(num);
    }
    if (rowsAlreadyGit.includes(num)) {
        myData = 0;
        return;
    }
    rowsAlreadyGit.push(num);
    if (typeof num === "object") {
        jsonData = num;
    }
    try {
        let response = await fetch(url, {
            method: "POST",
            header: { "Content-type": "application/json; charset=UTE-8" },
            body: jsonData,
        });
        myData = await response.json();
    } catch (error) {
        console.log(error);
    }
}
postData("count").then(() => {
    if (myData === "noOne") {
        location.href = "../Login.html";
    }
    if (stopFunction === 0) {
        setSlideNumbersAndAllCategories(myData).then(() => {
            createRows(myData);
        });
    }
    OnclickSliderNumber();
    rightActive();
    leftActive();
    marginRightAndLeft();
});
function setSlideNumbersAndAllCategories(data) {
    let numberSlider = 1;
    imageAdmin.src = data[data.length - 1].imgPath;
    nameAdmin.innerHTML = data[data.length - 1].name;
    for (let index = 0; index < data[0].count; index++) {
        let li = document.createElement("li");
        let numbers = document.createElement("a");
        if (!(index % 3)) {
            numbers.textContent = numberSlider++;
            numbers.className = "fs-4 btn";
            number.appendChild(li);
        }
        li.appendChild(numbers);
    }
    liNumber = document.querySelectorAll(".allProductsNum .numbers li");
    liNumber[0].className = "active";
    for (let index = 1; index < data.length - 1; index++) {
        let option = document.createElement("option");
        option.value = data[index].id;
        option.innerHTML = `${data[index].name}`;
        select.appendChild(option);
    }
    stopFunction = 1;
    return postData(0);
}
function displayNoneOfRows() {
    rows.forEach((element) => {
        element.className = "d-none";
    });
}
function createRows(data) {
    if (data === 0) return;
    if (rows !== 0) displayNoneOfRows();
    for (let index = 0; index < data.length; index++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.dataset.id = `${data[index].Id}`;
        td.dataset.category_id = `${data[index].category_id}`;
        td.innerHTML = `${data[index].name}`;
        tr.appendChild(td);
        td = document.createElement("td");
        td.innerHTML = `${data[index].price}`;
        tr.appendChild(td);
        td = document.createElement("td");
        let img = document.createElement("img");
        if (data[index].imagePath.startsWith("..")) {
            data[index].imagePath = data[index].imagePath.slice(1);
        }
        img.src = `${data[index].imagePath}`;
        td.appendChild(img);
        tr.appendChild(td);
        td = document.createElement("td");
        let color;
        if (data[index].status === "avilable") {
            ableOrDisable = "unavelable";
            color = "danger";
        } else {
            ableOrDisable = "avilable";
            color = "success";
        }
        td.innerHTML = `<p class="mb-1">${data[index].status}</p>
          <button class="genric-btn info edit mb-1 circle">Edit</button>
          <button class="genric-btn delete small circle ${color}">${ableOrDisable}</button>`;
        tr.appendChild(td);
        tr.className = "displayActive";
        tbody.appendChild(tr);
    }
    edits = document.querySelectorAll(".displayActive .edit");
    switchAvailability = document.querySelectorAll(".displayActive .delete");
    rows = document.querySelectorAll(".allProducts .table tbody tr");
    mainInformation.push(
        rowsAlreadyGit[rowsAlreadyGit.length - 1],
        rows.length - 3
    );
    activeFormEdit();
    availability();
}
function OnclickSliderNumber() {
    for (let index = 0; index < liNumber.length; index++) {
        liNumber[index].addEventListener("click", () => {
            displayNoneOfRows();
            liNumber.forEach((element) => {
                element.className = "";
            });
            liNumber[index].className = "active";
            if (liNumber[index].classList.contains("active")) {
                let start = index * 3;
                return postData(start).then(() => {
                    createRows(myData);
                    let cancel;
                    for (
                        let index = 0;
                        index < mainInformation.length && cancel !== 1;
                        index++
                    ) {
                        if (mainInformation[index] === start && !(index % 2)) {
                            start = mainInformation[index + 1];
                            displayNoneOfRows();
                            for (
                                let index = start;
                                index < start + 3;
                                index++
                            ) {
                                rows[index].className = "displayActive";
                            }
                            cancel = 1;
                        }
                    }
                    edits = document.querySelectorAll(".displayActive .edit");
                });
            }
        });
    }
}
function rightActive() {
    let anglesRight = document.querySelector(
        ".allProductsNum .fa-angles-right"
    );
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
        displayNoneOfRows();
        if (liNumber[activeRight + 1].classList.contains("active")) {
            let start = (activeRight + 1) * 3;
            return postData(start).then(() => {
                createRows(myData);
                let cancel;
                for (
                    let index = 0;
                    index < mainInformation.length && cancel !== 1;
                    index++
                ) {
                    if (mainInformation[index] === start && !(index % 2)) {
                        start = mainInformation[index + 1];
                        displayNoneOfRows();
                        for (let index = start; index < start + 3; index++) {
                            rows[index].className = "displayActive";
                        }
                        cancel = 1;
                    }
                }
                edits = document.querySelectorAll(".displayActive .edit");
            });
        }
    });
}
function leftActive() {
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
        displayNoneOfRows();
        if (liNumber[activeLeft - 1].classList.contains("active")) {
            let start = (activeLeft - 1) * 3;
            return postData(start).then(() => {
                createRows(myData);
                let cancel;
                for (
                    let index = 0;
                    index < mainInformation.length && cancel !== 1;
                    index++
                ) {
                    if (mainInformation[index] === start && !(index % 2)) {
                        start = mainInformation[index + 1];
                        displayNoneOfRows();
                        for (let index = start; index < start + 3; index++) {
                            rows[index].className = "displayActive";
                        }
                        cancel = 1;
                    }
                }
                edits = document.querySelectorAll(".displayActive .edit");
            });
        }
    });
}
function marginRightAndLeft() {
    let chevronRight = document.querySelector(
        ".allProductsNum .fa-chevron-right"
    );
    let chevronLeft = document.querySelector(
        ".allProductsNum .fa-chevron-left"
    );
    let margin = -100;
    let click = 1;
    chevronRight.parentElement.addEventListener("click", (e) => {
        if (click <= liNumber.length ) {
            number.style = `margin-left: ${margin}px;`;
            margin = margin - 100;
            click++;
        }
    });
    let margin2 = 100;
    chevronLeft.parentElement.addEventListener("click", (e) => {
        if (click > 1) {
            liNumber[0].style = `margin-left: ${margin2}px;`;
            margin2 = margin2 + 100;
            click--;
        }
    });
}
function noneForm() {
    closeForm.addEventListener("click", () => {
        formPopup.classList.add("d-none");
    });
}
noneForm();
function activeFormEdit() {
    for (let index = 0; index < edits.length; index++) {
        edits[index].addEventListener("click", (e) => {
            let options = select.children;
            let tds = edits[index].parentElement.parentElement.children;
            product.defaultValue = tds[0].textContent;
            product.dataset.id = tds[0].dataset.id;
            price.defaultValue = tds[1].textContent;
            loadXHR(tds[2].children[0].src).then(function (blob) {
                image.files = uploadFileWithJavaScript(
                    tds[2].children[0].src,
                    blob
                ).files;
            });
            for (let index = 0; index < options.length; index++) {
                if (options[index].value === tds[0].dataset.category_id) {
                    options[index].setAttribute("selected", "");
                } else {
                    options[index].removeAttribute("selected");
                }
            }
            formPopup.classList.remove("d-none");
            formPopup.style = `top: ${e.pageY - e.pageY * 0.21}px;left: ${
                e.pageX - e.pageX * 1.2
            }px`;
        });
    }
}
function formData() {
    change.addEventListener("click", (e) => {
        success.innerHTML = "";
        doNotSend = validationForm();
        e.preventDefault();
        if (doNotSend === 0) {
            let formEdit = document.getElementById("formEdit");
            let form_data = new FormData(formEdit);
            form_data.append("id", product.dataset.id);
            postData(form_data).then(() => {
                if (myData === 1) {
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    success.innerHTML = "Success";
                    formPopup.classList.add("d-none");
                } else {
                    for (const key in myData) {
                        let input = document.querySelector(
                            `input[name=${key}]`
                        );
                        input.nextElementSibling.innerHTML = myData[key];
                    }
                }
            });
        }
    });
}
formData();
function availability() {
    for (let index = 0; index < switchAvailability.length; index++) {
        switchAvailability[index].addEventListener("click", () => {
            let status =
                switchAvailability[index].previousElementSibling
                    .previousElementSibling;
            status.textContent === "avilable"
                ? (ableOrDisable = "unavelable")
                : (ableOrDisable = "avilable");
            let message = confirm(
                `Do you really want to ${ableOrDisable} this product?`
            );
            if (message) {
                let id =
                    switchAvailability[index].parentElement.parentElement
                        .children[0].dataset.id;
                postData(
                    JSON.stringify({ id: id, status: ableOrDisable })
                ).then(() => {
                    if (myData === 1) {
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                        success.innerHTML = "Success";
                    }
                });
            }
        });
    }
}
function validationForm() {
    doNotSend = 0;
    product.addEventListener("keypress", () => {
        product.nextElementSibling.innerHTML = "";
    });
    price.addEventListener("keypress", () => {
        price.nextElementSibling.innerHTML = "";
    });
    if (!/(\w+)/.test(product.value)) {
        product.nextElementSibling.innerHTML = "Error: No Product";
        doNotSend = 1;
    }
    if (!/([1-9]+)/.test(price.value)) {
        price.nextElementSibling.innerHTML = "Error: The price is unacceptable";
        doNotSend = 1;
    }
    if (!image.value) {
        image.nextElementSibling.innerHTML = "Error: Please Add Image Product";
        doNotSend = 1;
    }
    return doNotSend;
}
function loadXHR(url) {
    return new Promise(function (resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function () {
                reject("Network error.");
            };
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject("Loading error:" + xhr.statusText);
                }
            };
            xhr.send();
        } catch (err) {
            reject(err.message);
        }
    });
}
let uploadFileWithJavaScript = (source, blob) => {
    let file = new File([blob], source, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
    });
    let container = new DataTransfer();
    container.items.add(file);
    return container;
};
