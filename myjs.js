async function getEmployers() {
    let res = await fetch("http://localhost/order_json.php");
    let data = await res.json();
    if(data){
        displayEmployers(data);
    }
   
}

function displayEmployers(employers) {
    let employers_row = "";
    employers.forEach((employer) => {
        employers_row += getEmplyerRow(employer);
    });
    document.getElementById("product_row").innerHTML = employers_row ;
}

function getEmplyerRow(employer) {
    return `
    <br>
<tr>
        <td> <b>Name : </b> ${employer.name} </td>
        <td><b>Image : </b> <img src=" ${employer.imagePath} " width="100px" height="100px"></td>
        <td><b>Price : </b>${employer.price} </td>
        <td><b>Quantity : </b>${employer.quntity} </td>
        <td><b>Total price :</b> ${employer.total_price} </td><br>
        </tr>
        
    `;
}

function myFunction(x) {
var order_id=x.id;
document.cookie = 'order_id='+order_id;
getEmployers();
}



