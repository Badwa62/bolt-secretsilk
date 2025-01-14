// Fichier : /frontend/src/js/secretquest.js
// Description : Scripts interactifs pour la page Secret Quest de Secret Silk

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Chatbot interactif : Affichage/Masquage et gestion des messages
     */
    const chatbotToggle = document.querySelector('#chatbot-toggle');
    const chatbotWindow = document.querySelector('#chatbot-window');
    const chatbotInput = document.querySelector('#chatbot-input');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('open');
    });

    const addMessage = (message, isBot = false) => {
        const messageEl = document.createElement('div');
        messageEl.className = isBot ? 'bot-message' : 'user-message';
        messageEl.textContent = message;
        chatbotMessages.appendChild(messageEl);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && chatbotInput.value.trim()) {
            addMessage(chatbotInput.value);
            chatbotInput.value = '';
            setTimeout(() => {
                addMessage('Merci pour votre message, je réfléchis...', true);
            }, 1000);
        }
    });

    /**
     * Animation des cartes des fonctionnalités
     */
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseout', () => {
            card.classList.remove('hover');
        });
    });

    /**
     * Gestion des quêtes
     */
    fetch('/api/quests')
        .then(response => response.json())
        .then(quests => {
            const questList = document.querySelector('.quest-list');
            quests.forEach(quest => {
                const questItem = document.createElement('div');
                questItem.className = 'quest-item';
                questItem.innerHTML = `
                    <h3>${quest.title}</h3>
                    <p>${quest.description}</p>
                    <button class="start-quest" data-id="${quest.id}">Commencer</button>
                `;
                questList.appendChild(questItem);
            });
        });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-quest')) {
            const questId = e.target.dataset.id;
            startQuest(questId);
        }
    });

    const startQuest = (id) => {
        alert(`La quête ${id} a commencé !`);
    };

    /**
     * Système de classement et récompenses
     */
    fetch('/api/leaderboard')
        .then(response => response.json())
        .then(users => {
            const leaderboard = document.querySelector('.leaderboard');
            users.forEach((user, index) => {
                const userEntry = document.createElement('li');
                userEntry.textContent = `${index + 1}. ${user.name} - ${user.points} points`;
                leaderboard.appendChild(userEntry);
            });
        });

    const leaderboardItems = document.querySelectorAll('.leaderboard li');
    leaderboardItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('highlight');
        });
        item.addEventListener('mouseout', () => {
            item.classList.remove('highlight');
        });
    });

    /**
     * Système de statistiques utilisateur
     */
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.dataset.target;
            const current = +counter.textContent;
            const increment = target / 100;

            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });

    /**
     * Animations au défilement
     */
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });

    sections.forEach(section => observer.observe(section));
});
