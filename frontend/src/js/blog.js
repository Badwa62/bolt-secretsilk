// Fichier : /frontend/src/js/blog.js
// Description : Scripts pour gérer les fonctionnalités interactives de la section Blog Sexo de Secret Silk

document.addEventListener("DOMContentLoaded", () => {
    /**
     * Gestion des articles populaires avec redirection
     */
    const articleCards = document.querySelectorAll(".article-card .btn");

    articleCards.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const articleCard = button.closest(".article-card");
            const articleTitle = articleCard.querySelector("h3").textContent;
            redirectToArticle(articleTitle, button.getAttribute("href"));
        });
    });

    function redirectToArticle(title, link) {
        showToast(`Chargement de l'article : "${title}"...`);
        setTimeout(() => {
            window.location.href = link;
        }, 1000);
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

    setInterval(nextTestimonial, 7000); // Changement toutes les 7 secondes
    showTestimonial(currentTestimonial);

    /**
     * Recherche dynamique dans les articles
     */
    const searchBar = document.querySelector(".search-bar input");
    const articles = document.querySelectorAll(".article-card");

    if (searchBar) {
        searchBar.addEventListener("input", (event) => {
            const query = event.target.value.toLowerCase();
            articles.forEach(article => {
                const title = article.querySelector("h3").textContent.toLowerCase();
                article.style.display = title.includes(query) ? "block" : "none";
            });
        });
    }

    /**
     * Gestion des catégories thématiques avec redirection
     */
    const categoryButtons = document.querySelectorAll(".category-item .btn");

    categoryButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const categoryName = button.closest(".category-item").querySelector("h3").textContent;
            showToast(`Chargement de la catégorie : "${categoryName}"...`);
            setTimeout(() => {
                window.location.href = button.getAttribute("href");
            }, 1000);
        });
    });

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
     * Animation de survol pour les cartes d'article
     */
    const cards = document.querySelectorAll(".article-card, .category-item");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });
    });

    /**
     * Formulaire de pose de questions anonymes
     */
    const askQuestionButton = document.querySelector(".cta");

    if (askQuestionButton) {
        askQuestionButton.addEventListener("click", () => {
            showToast("Redirection vers la page de questions anonymes...");
            setTimeout(() => {
                window.location.href = "ask_expert.html";
            }, 1000);
        });
    }
});
