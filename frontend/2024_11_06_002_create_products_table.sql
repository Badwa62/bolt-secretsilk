-- Création de la migration pour la table `produits`

CREATE TABLE produits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    vendeuse_id BIGINT NOT NULL,
    stock INT NOT NULL,
    catégorie VARCHAR(100) NOT NULL,
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendeuse_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Index sur le titre et la catégorie pour des recherches plus rapides
CREATE INDEX idx_produits_titre ON produits (titre);
CREATE INDEX idx_produits_catégorie ON produits (catégorie);

-- Insertion de quelques produits pour initialiser la base de données
INSERT INTO produits (titre, description, prix, vendeuse_id, stock, catégorie) VALUES
    ('Bougie parfumée', 'Bougie artisanale avec parfum de vanille.', 19.99, 3, 50, 'Décoration'),
    ('Huile de massage', 'Huile de massage naturelle avec senteurs relaxantes.', 29.95, 3, 30, 'Bien-être'),
    ('Lingerie en dentelle', 'Ensemble de lingerie en dentelle noire, taille unique.', 49.99, 2, 20, 'Vêtements');
