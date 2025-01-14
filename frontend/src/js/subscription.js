// Fichier : /frontend/src/js/subscription.js
// Description : Scripts JavaScript pour la gestion de l'abonnement Premium sur Secret Silk

// Fonction pour gérer l'abonnement aux différents plans
document.addEventListener("DOMContentLoaded", () => {
    const subscribeButtons = document.querySelectorAll(".subscription-plans .btn-primary");

    subscribeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const plan = button.getAttribute("href").split("=")[1];
            subscribeToPlan(plan);
        });
    });

    function subscribeToPlan(plan) {
        // Simuler le processus d'abonnement (cette partie sera connectée au backend ultérieurement)
        showToast(`Abonnement au plan ${plan === 'monthly' ? 'Mensuel' : 'Annuel'} en cours...`, 4000);
        setTimeout(() => {
            window.location.href = "payment_success.html";
        }, 3000);
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
