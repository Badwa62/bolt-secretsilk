// Fichier : /frontend/src/js/cart.js
// Description : Scripts JavaScript pour la gestion du panier sur Secret Silk

// Fonction pour mettre à jour le sous-total du panier
document.addEventListener("DOMContentLoaded", () => {
    const quantityInputs = document.querySelectorAll(".cart-item input[type='number']");
    const removeButtons = document.querySelectorAll(".remove-item");
    const subtotalElement = document.querySelector(".cart-summary p:nth-of-type(1) strong");
    const taxElement = document.querySelector(".cart-summary p:nth-of-type(2) strong");
    const totalElement = document.querySelector(".cart-summary p:nth-of-type(3) strong");

    function updateCartTotal() {
        let subtotal = 0;

        quantityInputs.forEach(input => {
            const itemPrice = parseFloat(input.closest(".cart-item").querySelector(".item-details p").textContent.replace("Prix : ", "").replace(" €", ""));
            const quantity = parseInt(input.value);
            subtotal += itemPrice * quantity;
        });

        const tax = subtotal * 0.1; // Calculer 10 % de taxes
        const total = subtotal + tax;

        if (subtotalElement) subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
        if (taxElement) taxElement.textContent = `${tax.toFixed(2)} €`;
        if (totalElement) totalElement.textContent = `${total.toFixed(2)} €`;
    }

    // Événement pour mettre à jour le total lorsque la quantité change
    quantityInputs.forEach(input => {
        input.addEventListener("change", () => {
            if (input.value < 1) {
                input.value = 1;
            }
            updateCartTotal();
        });
    });

    // Événement pour supprimer un article du panier
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const cartItem = button.closest(".cart-item");
            cartItem.remove();
            updateCartTotal();
            showToast("Article supprimé du panier !");
        });
    });

    // Mise à jour initiale du total du panier au chargement de la page
    updateCartTotal();
});

// Fonction pour afficher les notifications toast
function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("visible");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, duration);
}
