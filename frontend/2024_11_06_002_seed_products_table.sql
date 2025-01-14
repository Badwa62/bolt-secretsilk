-- Seeder pour initialiser des données de test dans la table `produits`

INSERT INTO produits (titre, description, prix, vendeuse_id, stock, catégorie, créé_le, mis_à_jour_le) VALUES
    ('Bougie aromatique à la lavande', 'Bougie artisanale infusée d'huile essentielle de lavande.', 15.50, 2, 100, 'Décoration', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Huile de massage relaxante', 'Huile de massage naturelle enrichie aux extraits de camomille.', 25.00, 2, 50, 'Bien-être', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Ensemble de lingerie rouge', 'Ensemble de lingerie en dentelle rouge, taille M.', 45.99, 5, 20, 'Vêtements', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Baume hydratant', 'Baume hydratant naturel pour le corps, idéal pour la peau sèche.', 12.00, 2, 150, 'Soins de la peau', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Coffret cadeau de Saint-Valentin', 'Coffret avec des articles pour une soirée romantique (bougie, huile de massage, pétales de rose).', 60.00, 5, 10, 'Cadeaux', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
