// Global JavaScript for Secret Silk

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Floating button interaction (Secret Quest)
const secretQuestButton = document.getElementById('secret-quest-btn');
if (secretQuestButton) {
    secretQuestButton.addEventListener('click', () => {
        // Open Secret Quest modal or chat window
        alert('Bienvenue dans Secret Quest! Posez vos questions ou explorez vos quêtes.');
    });
}

// Responsive navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Utility: Add class on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});
