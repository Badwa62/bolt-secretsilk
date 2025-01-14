-- Seeder pour initialiser des données de test dans la table `utilisateurs`

INSERT INTO utilisateurs (nom, email, mot_de_passe, rôle, abonnement, créé_le, mis_à_jour_le) VALUES
    ('Alice Dupuis', 'alice.dupuis@example.com', 'motdepasse_chiffre_1', 'utilisateur', 'gratuit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bob Martin', 'bob.martin@example.com', 'motdepasse_chiffre_2', 'vendeur', 'premium', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Claire Dubois', 'claire.dubois@example.com', 'motdepasse_chiffre_3', 'admin', 'gratuit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('David Lefevre', 'david.lefevre@example.com', 'motdepasse_chiffre_4', 'utilisateur', 'premium', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Emma Leroy', 'emma.leroy@example.com', 'motdepasse_chiffre_5', 'vendeur', 'gratuit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
