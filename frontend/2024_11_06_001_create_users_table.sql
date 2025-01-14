-- Création de la migration pour la table `utilisateurs`

CREATE TABLE utilisateurs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    rôle ENUM('utilisateur', 'admin', 'vendeur') DEFAULT 'utilisateur',
    abonnement ENUM('gratuit', 'premium') DEFAULT 'gratuit',
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index sur l'email pour des recherches plus rapides
CREATE INDEX idx_utilisateurs_email ON utilisateurs (email);

-- Insertion de quelques utilisateurs pour initialiser la base de données
INSERT INTO utilisateurs (nom, email, mot_de_passe, rôle, abonnement) VALUES
    ('Jean Dupont', 'jean.dupont@example.com', 'motdepasse_chiffre_1', 'utilisateur', 'gratuit'),
    ('Marie Curie', 'marie.curie@example.com', 'motdepasse_chiffre_2', 'admin', 'premium'),
    ('Paul Martin', 'paul.martin@example.com', 'motdepasse_chiffre_3', 'vendeur', 'gratuit');
