<?php
include('./all_users.php');
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$response = $data;
$sourceImage = false;
if ($checkOnlyAdmin[0]['contain'] === 'true') {
  if ($response == "count") {
    $numberProducts = $dataBase->selectAll_NumberRecords('product');
    $categories = $dataBase->selectAll_Table('category');
    $numberAndCategory = json_encode(array_merge($numberProducts, $categories,$checkOnlyAdmin));
    echo $numberAndCategory;
  } elseif ($response === null) {
    $errors = [];
    foreach ($_REQUEST as $key => $value) {
      if (empty($value)) {
        $errors[$key] = "$key is required";
      }
    }
    validImage();
    if ($errors) {
      echo json_encode($errors);
    } else {
      $result = $dataBase->update(
        'product',
        [
          "name" => $_REQUEST['product'],
          "price" => $_REQUEST['price'],
          "category_id" => $_REQUEST['category'],
          "imagePath" => $sourceImage
        ],
        ['id' => $_REQUEST['id']]
      );
      echo $result;
    }
  } elseif (gettype($response) === 'array') {
    $result = $dataBase->update(
      'product',
      ['status' => $response['status']],
      ['id' => $response['id']]
    );
    echo $result;
  } else {
    $products = $dataBase->selectAll_NumberRow('product', 3, $data);
    $products = json_encode($products);
    echo $products;
  }
} else {
  echo json_encode('noOne');
}

function validImage()
{
  global $errors;
  $mime_type = explode('/', $_FILES["image"]['type'])[1];
  $arrImages = ["png", "jpg", "jpeg"];
  if ($_FILES["image"]['size'] == 0) {
    $errors["image"] = "Error : Please Enter Product Image ..";
  } else if ($_FILES["image"]['size'] > 1024 * 1024) {
    $errors["image"] = 'Error : size of image must be maximum 1 mega';
  } else if (!in_array($mime_type, $arrImages)) {
    $errors["image"] = 'please upload png or jpg or jpeg';
  } else {
    $fileName = time() . '.' . $mime_type;
    move_uploaded_file($_FILES["image"]['tmp_name'], '../img/upload/' . $fileName);
    global $sourceImage;
    $sourceImage = '../img/upload/' . $fileName;
  }
}
?>