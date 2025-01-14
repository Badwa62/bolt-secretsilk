// Fichier : /frontend/src/js/dashboard.js
// Description : Scripts JavaScript pour les tableaux de bord acheteur et vendeuse sur Secret Silk

// Fonctionnalités du tableau de bord acheteur
document.addEventListener("DOMContentLoaded", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-card a");
    const addReviewButton = document.querySelector(".reviews-list + .btn-primary");

    favoriteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Redirection vers les détails du produit...");
            setTimeout(() => {
                window.location.href = button.getAttribute("href");
            }, 1000);
        });
    });

    if (addReviewButton) {
        addReviewButton.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Redirection vers la page d'ajout d'avis...");
            setTimeout(() => {
                window.location.href = addReviewButton.getAttribute("href");
            }, 1000);
        });
    }
});

// Fonctionnalités du tableau de bord vendeuse
document.addEventListener("DOMContentLoaded", () => {
    const editProductButtons = document.querySelectorAll(".products-grid .btn-secondary");
    const addProductButton = document.querySelector(".products-grid + .btn-primary");

    editProductButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Redirection vers la page de modification du produit...");
            setTimeout(() => {
                window.location.href = button.getAttribute("href");
            }, 1000);
        });
    });

    if (addProductButton) {
        addProductButton.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Redirection vers la page d'ajout de produit...");
            setTimeout(() => {
                window.location.href = addProductButton.getAttribute("href");
            }, 1000);
        });
    }
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
