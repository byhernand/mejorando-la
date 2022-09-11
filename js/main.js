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
    const productList = await fetchData(`${API}/products?offset=20&limit=20`);
    const userList = await fetchData(`${API}/users`);

    const cards = productList.map(item => `
      <div class="card">
        <figure>
          <img src="${item.images[0]}" alt="${item.description}" />
        </figure>
        <p class="card-price">$${item.price}</p>
        <p class="card-name">${item.title}</p>
      </div>
    `);
    const userInfo = `
    <img src="${userList[0].avatar}" />
    <p class="user-name">${userList[0].name}</p>
    <p class="user-email">${userList[0].email}</p>
    `;

    products.innerHTML = cards.join('');
    user.innerHTML = userInfo;
  } catch(error) {
    console.log(error);
  }
})();