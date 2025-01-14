// Fichier : /frontend/src/js/checkout.js
// Description : Scripts JavaScript pour la gestion du processus de paiement sur Secret Silk

// Fonction pour gérer la validation du formulaire de paiement
document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.querySelector(".checkout-form form");
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const cityInput = document.getElementById("city");
    const zipcodeInput = document.getElementById("zipcode");
    const cardnumberInput = document.getElementById("cardnumber");
    const expdateInput = document.getElementById("expdate");
    const cvvInput = document.getElementById("cvv");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Validation des champs du formulaire
            if (!validateForm()) {
                showToast("Veuillez remplir tous les champs correctement.");
                return;
            }

            // Simuler un processus de paiement (cette partie sera connectée au backend ultérieurement)
            showToast("Paiement en cours...", 4000);
            setTimeout(() => {
                window.location.href = "payment_success.html";
            }, 3000);
        });
    }

    function validateForm() {
        // Vérifier que tous les champs sont remplis
        if (
            fullnameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            addressInput.value.trim() === "" ||
            cityInput.value.trim() === "" ||
            zipcodeInput.value.trim() === "" ||
            cardnumberInput.value.trim() === "" ||
            expdateInput.value.trim() === "" ||
            cvvInput.value.trim() === ""
        ) {
            return false;
        }

        // Vérifier que le numéro de carte est valide (simple vérification de longueur)
        if (!/^[0-9]{16}$/.test(cardnumberInput.value)) {
            showToast("Numéro de carte invalide.");
            return false;
        }

        // Vérifier que la date d'expiration est au bon format (MM/AA)
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expdateInput.value)) {
            showToast("Date d'expiration invalide.");
            return false;
        }

        // Vérifier que le CVV est valide (3 chiffres)
        if (!/^[0-9]{3}$/.test(cvvInput.value)) {
            showToast("CVV invalide.");
            return false;
        }

        return true;
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
