-- Création de la migration pour la table `articles`

CREATE TABLE articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    contenu TEXT NOT NULL,
    auteur_id BIGINT NOT NULL,
    tags VARCHAR(255),
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

-- Index sur le titre pour des recherches plus rapides
CREATE INDEX idx_articles_titre ON articles (titre);
CREATE INDEX idx_articles_tags ON articles (tags);

-- Insertion de quelques articles pour initialiser la base de données
INSERT INTO articles (titre, contenu, auteur_id, tags) VALUES
    ('Les bases de la communication dans le couple', 'Article sur l'importance de la communication ouverte dans le couple.', 1, 'communication, couple, relation'),
    ('Bien-être intime : Conseils et astuces', 'Astuces pour améliorer le bien-être intime au quotidien.', 2, 'bien-être, intime, conseils'),
    ('Explorer ses fantasmes en toute sécurité', 'Guide sur la manière d'explorer ses fantasmes de manière saine et respectueuse.', 1, 'fantasmes, sécurité, éducation');
