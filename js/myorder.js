
async function getuserData(){
    let res = await fetch("http://localhost/userData.php");
    let data = await res.json();
    displayUserNameAndImage(data);
}
function displayUserNameAndImage(data){
    document.getElementById("userImg").src=data.imgPath;
    document.getElementById("userName").innerHTML=data.name;
}
getuserData();


let per = 3;
let ul = document.getElementById("ul1");
let countOfUsers;

async function getCount(url){
    let result = await fetch(url);
    ul.innerHTML=" ";
    let all = await result.json();
    let orders= all[0]['numoforders'];
    console.log(orders);
    let totalPages = Math.ceil(orders/ per);
    console.log(totalPages);
    for(var i =0;i<totalPages;i++){
        var li = document.createElement("li");
        li.className='page-item'
        let a = document.createElement('a');
        a.appendChild(document.createTextNode(i+1));
        a.className="page-link";
        a.setAttribute("onClick",`getorders(${i+1},${per})`)
        li.appendChild(a)
        ul.appendChild(li);
    }
}

//////////////

let total;


async function getorders(no , perPage) {
    document.querySelector("tbody").innerHTML="";
    getCount("http://localhost/getpagenumber.php");
    let res = await fetch("http://localhost/order.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"pageNumber":no , "perPage":perPage}),
    });
    let data = await res.json();
    // console.log(data);
    displayorders(data);
}

getorders(1,per);

function displayorders(order) {
    total=0;
    // console.log(order);
    let order_row;
    order.forEach((order) => {
        order_row = getorderRow(order);       
        document.querySelector("tbody").append(order_row);
    });
}
let show;
function getorderRow(order) {
    total =total+order.total_price;
    let egp="EGP";
    egp=egp.fontcolor("red");
    var createdAt =document.createElement("td");
    createdAt.innerHTML=order.created_at;
     show=document.createElement("a");
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
  var span = document.getElementById("total-price");
  span.innerHTML=total;
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



async function function_cancel(id) {
    let res = await fetch("http://localhost/update.php",
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
    
    let res = await fetch("http://localhost/orderdetails.php",
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
    $(".orders_").toggle();
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










// function searchWithDate(p,n){
//     searchByDate(p,n);
// }

function searchByDate(perpage,numberPage=1){
    perpage=per;
    let from = document.getElementById("dateFrom").value  +' 00:00:00';
    console.log(from);
    let to = document.getElementById("dateTo").value +' 00:00:00';
    console.log(to);
    var tbody=document.getElementById('tbody');
    tbody.innerHTML="";

    async function getCcount(url){
    let result = await fetch(url,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({"from":from , "to":to})
        });
    let all = await result.json();
    console.log(all);
    let orders= all[0]['numoforders'];
    console.log(orders);
    let totalPages = Math.ceil(orders/ per);
    for(var i =0;i<totalPages;i++){
        var li = document.createElement("li");
        li.className='page-item'
        let a = document.createElement('a');
        a.appendChild(document.createTextNode(i+1));
        a.className="page-link";
        a.setAttribute("onClick",`get_orders(${per},${i+1})`)
        li.appendChild(a)
        ul.appendChild(li);
    }
};
async function get_orders(per,no){
    getCcount("http://localhost/countofordersbydate.php");
    // document.querySelector("tbody").innerHTML="";
    console.log("nn");
    let res = await fetch("http://localhost/ordersbydate.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"from" : from,"to": to , "perPage":per ,"pageNumber" : no }),
    });
    let data = await res.json();
    console.log("data");
    displayorders(data);

    
};
get_orders(per,1);
}
// searchByDate(per,1);