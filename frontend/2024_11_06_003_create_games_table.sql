-- Création de la migration pour la table `jeux`

CREATE TABLE jeux (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    niveaux INT NOT NULL,
    type ENUM('solo', 'couple', 'groupe') NOT NULL,
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index sur le nom et le type pour des recherches plus rapides
CREATE INDEX idx_jeux_nom ON jeux (nom);
CREATE INDEX idx_jeux_type ON jeux (type);

-- Insertion de quelques jeux pour initialiser la base de données
INSERT INTO jeux (nom, description, niveaux, type) VALUES
    ('Fantasmes Cachés', 'Jeu interactif pour explorer les fantasmes personnels et en couple.', 5, 'couple'),
    ('Défis Intimes', 'Série de défis pour renforcer la complicité entre partenaires.', 7, 'couple'),
    ('Jeux de Rôle', 'Scénarios variés pour des jeux de rôle immersifs en groupe.', 10, 'groupe');
