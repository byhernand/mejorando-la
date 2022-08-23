const products = document.getElementById('products');
const user = document.getElementById('user');
const API = 'https://api.escuelajs.co/api/v1';


fetch(`${API}/products`)
  .then(response => response.json())
  .then(productList => {
    const list = productList.slice(5, 25); // Getting 20 products
    const cards = list.map(item => `
      <div>
        <img src="${item.images[0]}" alt="${item.description}" />
        <p><b>${item.title}</b></p>
        <p>$ ${item.price}</p>
      </div>
    `);

    products.innerHTML = cards.join('');

    return fetch(`${API}/users`); // Getting user info
  })
  .then(response => response.json())
  .then(userList => {
    const userInfo = `
      <img src="${userList[0].avatar}" />
      <p><b>User: ${userList[0].name}</b></p>
      <p>Email: ${userList[0].email}</p>
    `;

    user.innerHTML = userInfo;
  })
  .catch(err => console.log(err));