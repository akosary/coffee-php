
let URL = "http://localhost/session_validate.php";
let URL2 = "http://localhost/admin_session.php";

async function getUserDataAndReturn(){
    let result = await fetch(URL);
    let data = await result.json();
    displayDataOfUser(data);
}
getUserDataAndReturn();

function displayDataOfUser(Data){
    // console.log(Data);
    if(Data.login=="notValid"){
        location.href = "/Login.html";
        // window.open('login.html','_self');
    }else{
        // console.log(Data);
        addUserData(Data);
    }
}

function addUserData(obj){
    let image = document.getElementById("imgOfUser");
    let name = document.getElementById("nameOfUser");
    if(obj.role == 'admin'){
        name.innerHTML=obj.Data.name;
        image.src=obj.Data.imgPath;
    }else if(obj.role == 'user'){
        // console.log(obj);
        name.innerHTML=obj.Data.name;
        image.src=obj.Data.imgPath;
        // location.href="./user-home_last_one.html";
    }

}

async function getuserData(){
    let res = await fetch("http://localhost/admin_session.php");
    let data = await res.json();
    // console.log(data);
    if(data!=false){
        location.href='./404.html';
    }
}
getuserData();
