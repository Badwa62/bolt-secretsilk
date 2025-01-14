-- Création de la migration pour la table `commandes`

CREATE TABLE commandes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    produit_id BIGINT NOT NULL,
    acheteur_id BIGINT NOT NULL,
    quantité INT NOT NULL,
    état ENUM('en_attente', 'en_cours', 'expédié', 'livré', 'annulé') DEFAULT 'en_attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE,
    FOREIGN KEY (acheteur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

-- Index sur l'état et la date de commande pour des recherches plus rapides
CREATE INDEX idx_commandes_etat ON commandes (état);
CREATE INDEX idx_commandes_date_commande ON commandes (date_commande);

-- Insertion de quelques commandes pour initialiser la base de données
INSERT INTO commandes (produit_id, acheteur_id, quantité, état) VALUES
    (1, 1, 2, 'en_attente'),
    (2, 3, 1, 'en_cours'),
    (3, 2, 3, 'livré');
