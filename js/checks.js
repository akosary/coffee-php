let UserUrl = "http://localhost/checks.php";
let OrderUrl = "http://localhost/getOrdersByUserId.php";
let getUserUrl = "http://localhost/getSingleUser.php";
let getPageNoURL = "http://localhost/getPagesNumbers.php";
let getUsersByDateUrl = "http://localhost/getUsersByDate.php";
let getCountOfUsersByDateUrl = "http://localhost/getUsersByDateCount.php";
let getOrderDetailsURL = "http://localhost/getOrderDetails.php"
let users= [];
let countOfUsers;
let userOrders = document.getElementById("details");

async function getDataFromResponse(url){
    let res = await fetch(url);
    let data =await res.json();
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
let pagination = document.getElementById("pagination");
let btn = document.getElementById('submit');
btn.addEventListener('click',userSearch);
let per = 7;

let ul = document.getElementById("ul1");
/**-------------------Start Get All User without pagination------------------- */

async function getCount(url){
    let result = await fetch(url);
    ul.innerHTML="";
    let all = await result.json();
    let usrs= all.CountOfUsers;
    let totalPages = Math.ceil(usrs/ per);
    for(var i =0;i<totalPages;i++){
        var li = document.createElement("li");
        // var li = `<li class="page-item"><a class="page-link" href="#" onclick="postPageNo(${i+1})">${i+1}</a></li>`
        li.className='page-item'
        let a = document.createElement('a');
        a.appendChild(document.createTextNode(i+1));
        a.className="page-link";
        // a.classList.add('nav-link','active');
        // a.href="#"
        // a.attributes=`onClick="postPageNo(${i+1})"`;
        a.setAttribute("onClick",`postPageNo(${i+1},${per})`)
        // a.addEventListener('click',postPageNo,i+1);
        li.appendChild(a)
        ul.appendChild(li);
    }
}
function postPageNo(no , perPage){
    getCount(getPageNoURL);
    fetch(UserUrl , {
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({"pageNumber":no , "perPage":perPage})
    }).then(
        (response)=>{
            return response.json()
        }
    ).then(
        (data)=>{
            user_tbody.innerHTML="";
            for(const key in data){
                countOfUsers = data.length;
                if(Object.hasOwnProperty.call(data,key)){
                    const obj = data[key];
                    let p = data[key].CountOfUsers;
                    let option = document.createElement('option');
                    option.value=obj.Id;
                    option.text=obj.name;
                    select.add(option);
                    let row = user_tbody.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML =` <i id="clickOnOrder" onClick="postUserIdUserFiled(${obj.Id})" class="bi bi-plus-square-fill btn p-0"></i>`;
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
};
postPageNo(1,per);
/**-------------------End of Get All User without pagination------------------- */

///////////////////////////get admin///////////////////////



/**-------------------Get All User without pagination------------------- */
// getDataFromResponse(UserUrl).then(
//     (data)=>{
//         for(const key in data){
//             if(Object.hasOwnProperty.call(data,key)){
//                 const obj = data[key];
//                 let option = document.createElement('option');
//                 option.value=obj.Id;
//                 option.text=obj.name;
//                 select.add(option);
//                 let row = user_tbody.insertRow(-1);
//                 let cell1 = row.insertCell(0);
//                 let cell2 = row.insertCell(1);
//                 let cell3 = row.insertCell(2);
//                 cell1.innerHTML =`<button onClick="postUserIdUserFiled(${obj.Id})"> ${obj.Id}</button>`;
//                 cell2.innerHTML = obj.name;
//                 cell3.innerHTML = obj.Total;
//             }
//         }
//     }
// );

/** ------------------- Start Filter ------------------- */
function searchingWithDate(p,n){
    searchByDate(p,n);
}

function searchByDate(perpage,numberPage=1){
    perpage=per;
    let from = `${document.getElementById("dateFrom").value} 00:00:00`;
    let to = `${document.getElementById("dateTo").value} 00:00:00`;
    let arrOfDate = {"from" : from,"to": to , "perPage":perpage ,"pageNumber" : numberPage };
    user_tbody.innerHTML="";
    old_tbody.innerHTML="";
    product_tbody.innerHTML="";
    ul.innerHTML="";
    // ul.innerHTML="";
    // fetch(getCountOfUsersByDateUrl,{
    //     method: "post",
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    //     body: JSON.stringify(arrOfDate)
    //     });
    async function getCount(){
    let result = await fetch(getCountOfUsersByDateUrl,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(arrOfDate)
        });
    let all = await result.json();
    console.log(all);
    let usrs= all.CountOfUsers;
    let totalPages = Math.ceil(usrs/ per);
    for(var i =0;i<totalPages;i++){
        var li = document.createElement("li");
        // var li = `<li class="page-item"><a class="page-link" href="#" onclick="postPageNo(${i+1})">${i+1}</a></li>`
        li.className='page-item'
        let a = document.createElement('a');
        a.appendChild(document.createTextNode(i+1));
        a.className="page-link";
        // a.href="#"
        // a.attributes=`onClick="postPageNo(${i+1})"`;
        a.setAttribute("onClick",`searchingWithDate(${per},${i+1})`)
        // a.addEventListener('click',postPageNo,i+1);
        li.appendChild(a)
        ul.appendChild(li);
    }
};
    fetch(getUsersByDateUrl,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({arrOfDate})
        }).then((response)=>{
            return response.json();
        }).then((Data)=>{
            for(const key in Data){
                if( Data['result'] == 'Failed'){
                    return;
                }else{
                    let obj = Data[key];
                    let row = user_tbody.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML =`<i onClick="postUserIdUserFiled(${obj.Id})" class="bi bi-plus-square-fill btn p-0"></i>`;
                    cell2.innerHTML = obj.name;
                    cell3.innerHTML = obj.Total;
                }
            }
        })
        // getCount(getCountOfUsersByDateUrl);
        getCount();
};

function userSearch(){
    ul.innerHTML="";
    old_tbody.innerHTML="";
    product_tbody.innerHTML="";
    user_tbody.innerHTML="";
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
                        cell1.innerHTML = `<i onClick="postUserIdUserFiled(${obj.Id})" class="bi bi-plus-square-fill btn p-0"></i>`;
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
/** ------------------- End Filter ------------------- */


/**-------------------Start Get Orders ------------------- */
function postUserIdUserFiled(id){
    $(".details").toggle();
    product_tbody.innerHTML="";
    postUserId(OrderUrl,id,old_tbody);
}

let orderData;
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
                    cell1.innerHTML =` <i id="productsDetails" onClick="getOrderDetails(${obj.Id})" class="bi bi-plus-square-fill btn p-0"></i>`;
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
/**-------------------End Get Orders ------------------- */



/**-------------------Start Get Products ------------------- */
let orderDetails;
function getOrderDetails(id){
    $(".products").toggle();
    let product_tbody = document.getElementById("productDetails");
    product_tbody.innerHTML = "";
    orderDetails = fetch( getOrderDetailsURL, {
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

/**-------------------End Get Products ------------------- */



































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