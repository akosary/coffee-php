/////////////////////get admin////////////////////

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

/////////////////////getorders///////////////////////

async function getorders() {
    let res = await fetch("http://localhost/orders_session.php");
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

let orderTbody = document.getElementById("tableId");
let tableDetails = document.getElementById("productTableDet");
function getorderRow(order) {
  let  row = orderTbody.insertRow(-1);
    
    let c1=row.insertCell(-1);
    c1.innerHTML=`<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${order.status}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" onclick="status_update([${order.Id},'out_for_delivery'])">out_for_delivery</a>
      <a class="dropdown-item" onclick="status_update([${order.Id},'delivered'])">delivered</a>
      <a class="dropdown-item" onclick="status_update([${order.Id},'canceled'])">canceled</a>
    </div>
  </div>
    `
    
    var order_date =document.createElement("td");
    order_date.innerHTML=order.created_at;
    var name =document.createElement("td");
    name.innerHTML=order.name;
    var room =document.createElement("td");
    room.innerHTML=order.room_no;


    
    row.classList.add("active-row")
    row.append(order_date);
    row.append(name);
    row.append(room);
    // row.append(action);

    row.addEventListener("click",()=>{ 
        // console.log(order.Id);
       show_details(order.Id).then(
        (res)=>{
            orderTbody2.innerHTML="";
            tableDetails.style.display='block';
            let order_row;
            
            res.forEach((order) => {
                
                // console.log(order);
            order_row = getorderRow2(order);       
    });
       
        }
       );
        // console.log(products);
    })
    return row;
}
getorders();
let orderTbody2 = document.getElementById("product_row");
// let orderThead = document.getElementById("tablehead");

function getorderhead()
{
  
}

function getorderRow2(order) {
    let  row = orderTbody2.insertRow(-1);
    let c1=row.insertCell(0);
    let c2=row.insertCell(1);
    let c3=row.insertCell(2);
    let img=document.createElement("img");
    img.src=order.imagePath;
    img.style.width="100px";
    img.style.height="100px";
    let c4=row.insertCell(3);
    let c5=row.insertCell(4);
    c1.innerHTML=order.name;
    c2.innerHTML=order.price;
    c3.appendChild(img);
    
// console.log(img);
    c4.innerHTML=order.quntity;
    c5.innerHTML=order.total_price;
}

let products;
 function status_update(x) {
//    console.log(x[1]);
    fetch("http://localhost/status_update.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
    });
    window.location.reload();
}

async function show_details(x){
    let res=await fetch("http://localhost/order_json.php",
    {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
    });
    let data = await res.json();
    // products=await data;
    return data;
// console.log(data);


    // window.location.reload();

}



