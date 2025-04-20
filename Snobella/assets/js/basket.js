document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    function loadCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartContainer.innerHTML = '';

      if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        totalAmount.textContent = '0.00';
        return;
      }

      let total = 0;

      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let row = document.createElement('div');
        row.className = 'row align-items-center mb-3 border-bottom pb-3';

        row.innerHTML = `
          <div class="col-md-2">
            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
          </div>
          <div class="col-md-3">
            <h5>${item.name}</h5>
            <small>$${item.price.toFixed(2)} each</small>
          </div>
          <div class="col-md-3">
            <div class="input-group">
              <button class="btn btn-outline-secondary decrease-btn" data-index="${index}">−</button>
              <input type="text" class="form-control text-center" value="${item.quantity}" disabled>
              <button class="btn btn-outline-secondary increase-btn" data-index="${index}">+</button>
            </div>
          </div>
          <div class="col-md-2">
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
          <div class="col-md-2">
            <button class="btn btn-danger remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
        cartContainer.appendChild(row);
      });

      totalAmount.textContent = total.toFixed(2);

     
      document.querySelectorAll('.remove-btn').forEach(btn =>
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          loadCart();
        })
      );

      document.querySelectorAll('.increase-btn').forEach(btn =>
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          cart[index].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          loadCart();
        })
      );

      document.querySelectorAll('.decrease-btn').forEach(btn =>
        btn.addEventListener('click', function() {
          const index = this.dataset.index;
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
          }
        })
      );
    }

    checkoutBtn.addEventListener('click', function() {
      alert("Checkout is not implemented yet ");
    });

    loadCart();
  });