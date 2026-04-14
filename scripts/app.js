
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const menuUl = document.getElementById('menu-categories');

function prikaziKategorije() {
  const menuUl = document.getElementById('menu-categories');
  const productDisplay = document.getElementById('product-display');
  const headerTitle = document.querySelector('.current-category');

  if (!menuUl || !productDisplay) return;
  menuUl.innerHTML = '';

  data.categories.forEach((kategorija) => {
    const li = document.createElement('li');
    li.textContent = kategorija.name;
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      headerTitle.textContent = kategorija.name;
      productDisplay.innerHTML = '';

      kategorija.products.forEach((proizvod) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = 'assets/images/' + proizvod.image;
        img.alt = proizvod.name;

        const addBtn = document.createElement('div');
        addBtn.className = 'add-to-cart-overlay';
        addBtn.innerHTML = '🛒+';

        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dodajUKosaricu(proizvod);
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(addBtn);

        const nameWrapper = document.createElement('p');
        nameWrapper.textContent = proizvod.name;

        const quantityBadge = document.createElement('span');
        quantityBadge.className = 'product-quantity-badge';
        const safeId = proizvod.name.replace(/\s+/g, '-');
        quantityBadge.id = `qty-${safeId}`;

        imgContainer.appendChild(quantityBadge);
        productCard.appendChild(imgContainer);
        productCard.appendChild(nameWrapper);
        productDisplay.appendChild(productCard);

        azurirajBadgeove(proizvod.name);
        azurirajAktivnog();
      });
    });
    menuUl.appendChild(li);
  });
}

function azurirajAktivnog() {
  const menuItems = menuUl.querySelectorAll('li');
  const currentCategory = document.querySelector('.current-category').textContent;

  menuItems.forEach((item) => {
    if (item.textContent === currentCategory) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function dodajUKosaricu(proizvod) {
  const postojeci = cart.find((item) => item.name === proizvod.name);
  if (postojeci) {
    postojeci.quantity += 1;
  } else {
    cart.push({ ...proizvod, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  azurirajZaglavlje();
  azurirajBadgeove(proizvod.name);
}

function azurirajZaglavlje() {
  const cartIcon = document.querySelector('.cart-quantity');
  if (!cartIcon) return;
  const ukupnoKomada = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartIcon.textContent = ukupnoKomada;
  if (ukupnoKomada <= 0) {
    cartIcon.textContent = '';
    cartIcon.style.display = 'none';
  }
}

function azurirajBadgeove(imeProizvoda) {
  const postojeci = cart.find((item) => item.name === imeProizvoda);
  const safeId = imeProizvoda.replace(/\s+/g, '-');
  const badge = document.getElementById(`qty-${safeId}`);

  if (postojeci && badge) {
    badge.textContent = `${postojeci.quantity}`;
    badge.style.display = 'inline';
  } else if (badge) {
    badge.style.display = 'none';
  }
}

function prikaziKategoriju(imeKategorije) {
  const kategorija = data.categories.find((cat) => cat.name === imeKategorije);
  if (kategorija) {
    const headerTitle = document.querySelector('.current-category');
    headerTitle.textContent = kategorija.name;
    const productDisplay = document.getElementById('product-display');
    productDisplay.innerHTML = '';
    
    kategorija.products.forEach((proizvod) => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';

      const imgContainer = document.createElement('div');
      imgContainer.className = 'image-container';

      const img = document.createElement('img');
      img.src = 'assets/images/' + proizvod.image;
      img.alt = proizvod.name;
      const addBtn = document.createElement('div');

      addBtn.className = 'add-to-cart-overlay';
      addBtn.innerHTML = '🛒+';

      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dodajUKosaricu(proizvod);
      });

      imgContainer.appendChild(img);
      imgContainer.appendChild(addBtn);

      const nameWrapper = document.createElement('p');
      nameWrapper.textContent = proizvod.name;
      const quantityBadge = document.createElement('span');
      quantityBadge.className = 'product-quantity-badge';
      const safeId = proizvod.name.replace(/\s+/g, '-');
      quantityBadge.id = `qty-${safeId}`;

      imgContainer.appendChild(quantityBadge);
      productCard.appendChild(imgContainer);
      productCard.appendChild(nameWrapper);
      productDisplay.appendChild(productCard);
      azurirajBadgeove(proizvod.name);
    });
  }
}

prikaziKategorije();
azurirajZaglavlje();
prikaziKategoriju('Puder');
azurirajAktivnog();