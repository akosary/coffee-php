//Starting BackEnd Validation ..
let cookies = document.cookie.split("=");                                                           //get cookie in array cookies key with value 
// console.log(cookies);
let errors = Cookies.get("errors") ;                                                                 //CDN library for cookies
// let errors = cookies[cookies.findIndex(getErroreyFromArray)+1]                                      //to return index of errors
//  console.log(errors);                                                                                 //errors in string format
// function getErroreyFromArray(key)
// {
//     return key == "errors";
// }

if(errors)
{
    errors = JSON.parse(errors); 
    insertErrorMassages(errors) ;                                                                      //object key with value
}


 console.log(errors);
//insert error massage
function insertErrorMassages(object)
{
  for (const key in object )                                                                            //to loop on object with it's key
  {
    let input = document.querySelector(`input[name=${key}]`);
    let error = input.nextElementSibling;
    error.textContent = errors [key] ;
    // input.nextElementSibling.classList.add ("active") ;
  };
}

