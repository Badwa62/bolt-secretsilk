// Fichier : /frontend/src/js/slider.js
// Description : Script pour gérer le slider dynamique de la section héroïque sur Secret Silk

document.addEventListener("DOMContentLoaded", () => {
    const heroSlides = document.querySelectorAll(".hero-slide");
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");
    const dotsContainer = document.querySelector(".slider-dots");
    let currentSlide = 0;

    // Création des indicateurs dynamiques (dots)
    const createDots = () => {
        heroSlides.forEach((_, index) => {
            const dot = document.createElement("span");
            dot.classList.add("slider-dot");
            dot.dataset.slide = index;
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = () => {
        const dots = document.querySelectorAll(".slider-dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    };

    const showSlide = (index) => {
        heroSlides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
        currentSlide = index;
        updateDots();
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(currentSlide);
    };

    // Initialisation du slider
    createDots();
    showSlide(currentSlide);

    // Gestion des boutons précédent et suivant
    if (nextButton) {
        nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
        prevButton.addEventListener("click", prevSlide);
    }

    // Contrôle par les indicateurs (dots)
    dotsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("slider-dot")) {
            const targetSlide = parseInt(event.target.dataset.slide, 10);
            showSlide(targetSlide);
        }
    });

    // Passage automatique des slides avec pause au survol
    let autoSlideInterval = setInterval(nextSlide, 5000);

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    heroSlides.forEach(slide => {
        slide.addEventListener("mouseenter", stopAutoSlide);
        slide.addEventListener("mouseleave", startAutoSlide);
    });

    // Navigation au clavier
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            nextSlide();
        } else if (event.key === "ArrowLeft") {
            prevSlide();
        }
    });

    // Effet de transition pour un affichage fluide
    heroSlides.forEach(slide => {
        slide.style.transition = "opacity 1s ease-in-out";
    });
});
