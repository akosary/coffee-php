
async function getuserData(){
    let res = await fetch("http://localhost/coffee-php/userData.php");
    let data = await res.json();
    displayUserNameAndImage(data);
}
function displayUserNameAndImage(data){
    document.getElementById("userImg").src=data.imgPath;
    document.getElementById("userName").innerHTML=data.name;
}
getuserData();

async function getorders() {
    let res = await fetch("http://localhost/coffee-php/order.php");
    let data = await res.json();
    displayorders(data);
}


function displayorders(order) {
    // console.log(order);
    let order_row;
    order.forEach((order) => {
        order_row = getorderRow(order);       
        document.querySelector("tbody").append(order_row);
    });
}

function getorderRow(order) {
    let egp="EGP";
    egp=egp.fontcolor("red");
    var createdAt =document.createElement("td");
    createdAt.innerHTML=order.created_at;
    var show=document.createElement("a");
    show.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
  </svg>`;
    createdAt.append(show);
    // show.style.marginLeft="50px";
    show.classList.add("show");
    show.addEventListener("click",()=>{ 
        console.log(order.Id);
        function_showdetails(order.Id);
    })

    var Status =document.createElement("td");
    Status.innerHTML=order.status;
    var Amount =document.createElement("td");
    Amount.innerHTML=order.total_price+" "+egp;
    var action =document.createElement("td");
    var button = document.createElement("button");  

    if(order.status =="processing"){
            action.appendChild(button);
            button.innerHTML="Cancle";
            button.addEventListener("click",()=>{ 
                console.log(order.Id);
                function_cancel(order.Id)
            });
    }
    else{
        action.innerHTML=" ";
    }
    var row = document.createElement("tr");
    row.classList.add("active-row")
    row.append(createdAt);
    row.append(Status);
    row.append(Amount);
    row.append(action);
    return row;
}
getorders();


async function function_cancel(id) {
    let res = await fetch("http://localhost/coffee-php/update.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"ORDER_ID": id}),
    });
    let data = await res.json();
    console.log(data);
    location.reload();
}


async function function_showdetails(id) {
    let res = await fetch("http://localhost/coffee-php/orderdetails.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"ORDER_ID": id}),
    });

    let data = await res.json();
    console.log(data);
    showdetails(data);
}
function showdetails(data){
    let le="LE";
    // le.classList.add("LEclass");
    le=le.fontcolor("red");
    var SECTION= document.getElementById("showdetails");
    SECTION.innerHTML="";
    data.forEach(element=>{
    var card=document.createElement("div");
    card.classList.add("cardorder");
    var image=document.createElement("img");
    var name=document.createElement("p");
    var price=document.createElement("div");
    var quntity=document.createElement("p");
    image.src=element['imagePath'];
    image.classList.add("orderimage");
    price.classList.add("price");
    name.innerHTML=element['name'];
    price.innerHTML=element['price']+" "+le;
    quntity.innerHTML=element['quntity'];
    card.append(price);
    card.append(image);
    card.append(name);
    card.append(quntity);
    SECTION.append(card);
    })
   
}