// JavaScript spécifique pour la page d'accueil (index.html)

// Animation des boutons CTA (Appels à l'action)
document.querySelectorAll('.cta-buttons a').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

// Animation d'apparition pour les fonctionnalités
const featureSections = document.querySelectorAll('.feature');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target); // Arrête d'observer une fois animé
        }
    });
}, {
    threshold: 0.2
});

featureSections.forEach(section => {
    observer.observe(section);
});

// Ajout d'un effet de scroll sur les sections
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const scrolled = window.scrollY;
        heroSection.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});
