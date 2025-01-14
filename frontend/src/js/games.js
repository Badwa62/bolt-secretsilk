// Fichier : /frontend/src/js/games.js
// Description : Scripts pour gérer les fonctionnalités de l'espace Jeux Coquins de Secret Silk

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Gestion des jeux gratuits du jour
     */
    const freeGameButtons = document.querySelectorAll("#free-games .game-card .btn");

    freeGameButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const gameCard = button.closest(".game-card");
            const gameName = gameCard.querySelector("h3").textContent;
            startGame(gameName);
        });
    });

    function startGame(gameName) {
        showToast(`Démarrage du jeu "${gameName}"...`);
        setTimeout(() => {
            window.location.href = "game_details.html";
        }, 1000);
    }

    /**
     * Gestion des packs thématiques
     */
    const packButtons = document.querySelectorAll("#packs .pack-card .btn");

    packButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const packName = button.closest(".pack-card").querySelector("h3").textContent;
            showToast(`Redirection vers le pack "${packName}"...`);
            setTimeout(() => {
                window.location.href = "pack_store.html";
            }, 1000);
        });
    });

    /**
     * Gestion des défis communautaires
     */
    const leaderboardButton = document.querySelector("#leaderboard .btn");

    if (leaderboardButton) {
        leaderboardButton.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Accès au classement des défis communautaires...");
            setTimeout(() => {
                window.location.href = leaderboardButton.getAttribute("href");
            }, 1000);
        });
    }

    /**
     * Carousel pour les témoignages
     */
    const testimonials = document.querySelectorAll(".testimonials blockquote");
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    };

    setInterval(nextTestimonial, 7000); // Change toutes les 7 secondes
    showTestimonial(currentTestimonial);

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
     * Effet de survol pour les cartes de jeu
     */
    const gameCards = document.querySelectorAll(".game-card");

    gameCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("highlight");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("highlight");
        });
    });
});
