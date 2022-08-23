const products = document.getElementById('products');
const user = document.getElementById('user');
const API = 'https://api.escuelajs.co/api/v1';


function fetchData(urlApi, callback) {
  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', urlApi, true);
  xhttp.onreadystatechange = function(event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        const err = new Error('Error' + urlApi);
        console.log(err);
      }
    }
  }

  xhttp.send();
}


fetchData(`${API}/products`, function (error1, data1) {
  if (error1) return console.log(error1);

  fetchData(`${API}/users`, function (error2, data2) {
    if (error2) return console.log(error2);

    const productList = data1.slice(5, 25); // Getting 20 products
    const cards = productList.map(item => `
      <div>
        <img src="${item.images[0]}" alt="${item.description}" />
        <h3>${item.title}</h3>
        <p>$ ${item.price}</p>
      </div>
    `);
    const userInfo = `
      <img src="${data2[0].avatar}" />
      <p>User: ${data2[0].name}</p>
      <p>Email: ${data2[0].email}</p>
    `;

    products.innerHTML = cards.join('');
    user.innerHTML = userInfo;
  })
})