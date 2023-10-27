// elements holder
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let deleteAll = document.getElementById('deleteall');
let tableBody = document.getElementById('info');
let searchInput = document.getElementById('search');
// mode of program
let mood = 'create';
let searchMood = 'Title';
let tmp;
// function to get Totlal
function getTotal() {
  if (price.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = 'green';
  } else {
    total.innerHTML = '';
    total.style.background = 'red';
  }
}
// return last data
let products;
if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}
// create product
create.addEventListener('click', () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    count.value < 100
  ) {
    if (mood === 'create') {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          products.push(product);
        }
      } else {
        products.push(product);
      }
    } else {
      products[tmp] = product;
      mood = 'create';
      create.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clearInputDate();
  }
  // save localStorage
  localStorage.setItem('products', JSON.stringify(products));
  disProducts();
});

// delete input in input
function clearInputDate() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  total.innerHTML = '';
  discount.value = '';
  count.value = '';
  category.value = '';
}
// function to show date in table front end
function disProducts() {
  getTotal();
  let row = '';
  for (let index = 0; index < products.length; index++) {
    row += `<tr>
    <td>${index + 1}</td>
    <td>${products[index].title}</td>
    <td>${products[index].price}</td>
    <td>${products[index].taxes}</td>
    <td>${products[index].ads}</td>
    <td>${products[index].discount}</td>
    <td>${products[index].total}</td>

    <td>${products[index].category}</td>
    <td><button onclick="updateProduct(${index})"  id="update" >Update</button></td>
    <td><button onclick="deleteProduct(${index})" id="delete">Delete</button></td>
    </tr>`;
  }
  tableBody.innerHTML = row;

  if (products.length > 0) {
    deleteAll.innerHTML = `<button onclick="delAll()">Delete All (${products.length})</button>`;
  } else {
    deleteAll.innerHTML = '';
  }
}
disProducts();
// function to delete select product
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.products = JSON.stringify(products);
  disProducts();
}
function delAll() {
  localStorage.clear();
  products.splice(0);
  disProducts();
}
function updateProduct(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  category.value = products[index].category;
  getTotal();
  count.style.display = 'none';
  create.innerHTML = 'Update';
  mood = 'update';
  tmp = index;
  scroll({
    top: 0,
    behavior: 'smooth',
  });
}
function searchMode(id) {
  if (id === 'searchTitle') {
    searchMood = 'title';
  } else {
    searchMood = 'category';
  }
  searchInput.focus();
  searchInput.placeholder = 'Search By ' + searchMood;
  searchInput.value = '';
  disProducts();
}
function searchProduct(value) {
  let row = '';
  for (let index = 0; index < products.length; index++) {
    if (searchMood == 'title') {
      if (products[index].title.includes(value.toLowerCase())) {
        row += `<tr>
        <td>${index}</td>
        <td>${products[index].title}</td>
        <td>${products[index].price}</td>
        <td>${products[index].taxes}</td>
        <td>${products[index].ads}</td>
        <td>${products[index].discount}</td>
        <td>${products[index].total}</td>
        <td>${products[index].category}</td>
        <td><button onclick="updateProduct(${index})"  id="update" >Update</button></td>
        <td><button onclick="deleteProduct(${index})" id="delete">Delete</button></td>
        </tr>`;
      }
    } else {
      if (products[index].category.includes(value.toLowerCase())) {
        row += `<tr>
        <td>${index}</td>
        <td>${products[index].title}</td>
        <td>${products[index].price}</td>
        <td>${products[index].taxes}</td>
        <td>${products[index].ads}</td>
        <td>${products[index].discount}</td>
        <td>${products[index].total}</td>
        <td>${products[index].category}</td>
        <td><button onclick="updateProduct(${index})"  id="update" >Update</button></td>
        <td><button onclick="deleteProduct(${index})" id="delete">Delete</button></td>
        </tr>`;
      }
    }
  }
  tableBody.innerHTML = row;
}
