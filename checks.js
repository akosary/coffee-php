async function getDatafromResponse(){
    let res = await fetch("http://localhost/checks.php");
    let data =await res.json();
    return data;
}
let select = document.getElementById('users');
let option = document.createElement('option');

let table = document.getElementById("myUserTable");

getDatafromResponse().then(
    (data)=>{
        for(const key in data){
            if(Object.hasOwnProperty.call(users,key)){
                const obj = data[key];
                let option = document.createElement('option');
                option.value=obj.Id;
                option.text=obj.name;
                select.add(option);
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerText = obj.Id
                cell2.innerText = obj.name;
                cell3.innerText = obj.Total;
            }
        }
    }
);

