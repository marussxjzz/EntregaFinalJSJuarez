document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total span");
    const checkoutButton = document.querySelector(".checkout");
    let idx = localStorage.length;

    function updateCartWithLocalStorage() {
        for (let i = 0; i < localStorage.length; i++) {
            cart.push(JSON.parse(localStorage.getItem(i)));
        }
        updateCart();
    }

    if (localStorage.length > 0) updateCartWithLocalStorage();

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            addToCartButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const productId = parseInt(button.getAttribute("data-product-id"));
                    const selectedProduct = products.find(product => product.id === productId);
                    cart.push(selectedProduct);
                    localStorage.setItem(idx++, JSON.stringify(selectedProduct));
                    updateCart();
                });
            });
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
        });

    checkoutButton.addEventListener("click", function () {
        Swal.fire(
            'Gracias por su compra!',
            'Vuelva pronto. ',
            'success'
        );
        cart.length = 0;
        updateCart();
        localStorage.clear();
        idx = 0;
    });

    function updateCart() {
        console.log(cart);
        cartItemsList.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});