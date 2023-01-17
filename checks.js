let UserUrl = "http://localhost/checks.php";
let OrderUrl = "http://localhost/getOrdersByUserId.php";
let getUserUrl = "http://localhost/getSingleUser.php";
let users= [];

async function getDataFromResponse(url){
    let res = await fetch(url);
    let data =await res.json();
    // console.log(data);
    users=data;
    return data;
}

let select = document.getElementById('users');
let option = document.createElement('option');

let table = document.getElementById("myUserTable");
let tableOrder = document.getElementById("orderTable");

let old_tbody = document.getElementById("orderThead");
let product_tbody = document.getElementById("productDetails");
let userForm = document.getElementById("userForm");
let user_tbody = document.getElementById("userBody");


let btn = document.getElementById('submit');
btn.addEventListener('click',userSearch)

getDataFromResponse(UserUrl).then(
    (data)=>{
        for(const key in data){
            if(Object.hasOwnProperty.call(users,key)){
                const obj = data[key];
                let option = document.createElement('option');
                option.value=obj.Id;
                option.text=obj.name;
                select.add(option);
                let row = user_tbody.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML =`<button onClick="postUserIdUserFiled(${obj.Id})"> ${obj.Id}</button>`;
                cell2.innerHTML = obj.name;
                cell3.innerHTML = obj.Total;
            }
        }
    }
);

function print(){
    let d = document.getElementById("dateFrom").value;
    console.log(d + ' 00:00:00');
}

function userSearch(){
    old_tbody.innerHTML="";
    product_tbody.innerHTML="";
    let userId = document.getElementById('users').value;
    (function postUserId(){
        user_tbody.innerHTML = "";
        let user = userId;
        fetch(getUserUrl , {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        }).then(
            (response)=>{
                return response.json()
            }
        ).then(
            (Data)=>{
                for(const key in Data)
                {
                    if(Object.hasOwnProperty.call(Data,key)){
                        const obj = Data[key];
                        let row = user_tbody.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = `<button onClick='postUserIdUserFiled(${obj.Id})'>${obj.Id}</button>`;
                        cell2.innerHTML = obj.name;
                        cell3.innerHTML = obj.Total;
                    }
                }
            }
        )
        .catch(
            (error)=>{
                console.log(error);
            }
        )
    })()
}


function postUserIdUserFiled(id){
    postUserId(OrderUrl,id,old_tbody);
}
let orderData;

// let old_tbody = document.getElementById("orderThead");
function postUserId(url ,id,destination ){
    destination.innerHTML = "";
    let user = id;
    fetch(url , {
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    }).then(
        (response)=>{
            return response.json()
        }
    ).then(
        (Data)=>{
            for(const key in Data)
            {
                if(Object.hasOwnProperty.call(Data,key)){
                    const obj = Data[key];
                    let row = destination.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = `<button onClick='getOrderDetails(${obj.Id})'>${obj.Id}</button>`;
                    cell2.innerHTML = obj.total_price;
                    cell3.innerHTML = obj.created_at;
                }
            }
        }
    )
    .catch(
        (error)=>{
            console.log(error);
        }
    )
};


let orderDetails;
function getOrderDetails(id){
    let product_tbody = document.getElementById("productDetails");
    product_tbody.innerHTML = "";
    orderDetails = fetch("http://localhost/getOrderDetails.php" , {
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(id)
    });

    orderDetails.then(
        (response)=>{
            return response.json();
        }
    ).then(
        (Data)=>{
            for(const key in Data)
            {
                if(Object.hasOwnProperty.call(Data,key)){
                    const obj = Data[key];
                    let row = product_tbody.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = `<img src=${obj.imagePath} style="width:200px;height:200px;" >`;
                    cell2.innerHTML = obj.price;
                    cell3.innerHTML = obj.quntity;
                }
            }
        }
    )
    .catch(
        (error)=>{
            console.log(error);
        }
    )
};




































// getDataFromResponse(OrderUrl).then(
//     (data)=>{
//         console.log(data)
//     }
// ).catch(
//     console.log('error')
// );


// $.ajax(
//     {
//         type : "POST",  //type of method
//             url  : "getProductChecks.php",  //your page
//             data : { id:'12' },// passing the values
//             success: function(res){  
                                
//                     }
//     }
// )

// function sendData() {
//     var data = '293';

//     var xhr = new XMLHttpRequest();

//     //👇 set the PHP page you want to send data to
//     xhr.open("POST", "getProductChecks.php", true);
//     xhr.setRequestHeader("Content-Type", "application/json");

//     //👇 what to do when you receive a response
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == XMLHttpRequest.DONE) {
//             alert(xhr.responseText);

            
//         }
//     };
    
//     //👇 send the data
//     xhr.send(JSON.stringify(data));
// }
// sendData();

