const products = document.getElementById('products');
const user = document.getElementById('user');
const API = 'https://api.escuelajs.co/api/v1';

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const productList = await fetchData(`${API}/products`);
    const userList = await fetchData(`${API}/users`);

    const list = productList.slice(5, 25); // Getting 20 products
    const cards = list.map(item => `
      <div>
        <img src="${item.images[0]}" alt="${item.description}" />
        <p><b>${item.title}</b></p>
        <p>$ ${item.price}</p>
      </div>
    `);
    const userInfo = `
    <img src="${userList[0].avatar}" />
    <p><b>User: ${userList[0].name}</b></p>
    <p>Email: ${userList[0].email}</p>
    `;

    products.innerHTML = cards.join('');
    user.innerHTML = userInfo;
  } catch(error) {
    console.log(error);
  }
})();