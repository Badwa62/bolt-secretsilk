// Fichier : /frontend/src/js/market.js
// Description : Scripts pour gérer les fonctionnalités de la Marketplace sur Secret Silk

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Gestion de l'ajout au panier
     */
    const addToCartButtons = document.querySelectorAll(".product-card .btn-secondary");
    const cartCountElement = document.querySelector(".cart-icon");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            addToCart(productName);
        });
    });

    function addToCart(productName) {
        showToast(`"${productName}" a été ajouté à votre panier.`);
        updateCartCount();
    }

    function updateCartCount() {
        let count = parseInt(cartCountElement.dataset.count) || 0;
        count++;
        cartCountElement.dataset.count = count;
        cartCountElement.textContent = `🛒 (${count})`;
    }

    /**
     * Gestion des catégories de produits
     */
    const categoryButtons = document.querySelectorAll(".category-card a");

    categoryButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Chargement des produits de la catégorie...");
            setTimeout(() => {
                window.location.href = button.getAttribute("href");
            }, 1000);
        });
    });

    /**
     * Bandeau défilant pour les promotions
     */
    const promoBanner = document.querySelector(".promo-banner ul");

    if (promoBanner) {
        let offset = 0;
        const scrollPromo = () => {
            offset -= 2;
            if (Math.abs(offset) >= promoBanner.scrollWidth) {
                offset = window.innerWidth;
            }
            promoBanner.style.transform = `translateX(${offset}px)`;
        };

        setInterval(scrollPromo, 30);
    }

    /**
     * Notifications toast pour les actions utilisateur
     */
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

    /**
     * Messagerie sécurisée : Gestion des icônes et accès rapide
     */
    const messageIcons = document.querySelectorAll(".message-icon");

    messageIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            showToast("Ouverture de la messagerie sécurisée...");
            setTimeout(() => {
                window.location.href = icon.getAttribute("data-url");
            }, 1000);
        });
    });

    /**
     * Zoom au survol des cartes produit
     */
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("zoomed");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("zoomed");
        });
    });
});
