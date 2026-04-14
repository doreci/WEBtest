let cart = JSON.parse(localStorage.getItem('cart')) || [];

function prikaziKosaricu() {
  const container = document.getElementById('cart-container');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<h3 class="empty-cart-msg">KOŠARICA JE PRAZNA</h3>';
    return;
  }

  // Naslov i tablica koriste klase iz cart.css
  let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>NAZIV PROIZVODA</th>
                    <th id="text-center">KOLIČINA</th>
                </tr>
            </thead>
            <tbody>`;

  cart.forEach((item, index) => {
    html += `
            <tr>
                <td class="cart-item-name">${item.name}</td>
                <td class="text-center">
                    <div class="quantity-controls">
                        <button class="btn-qty" onclick="promijeniKolicinu(${index}, -1)">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="btn-qty" onclick="promijeniKolicinu(${index}, 1)">+</button>
                    </div>
                </td>
            </tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

window.promijeniKolicinu = function (index, promjena) {
  cart[index].quantity += promjena;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  prikaziKosaricu();
};

prikaziKosaricu();
