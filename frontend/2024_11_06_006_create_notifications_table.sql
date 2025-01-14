-- Création de la migration pour la table `notifications`

CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id BIGINT NOT NULL,
    type ENUM('info', 'alerte', 'promotion') NOT NULL,
    message TEXT NOT NULL,
    statut ENUM('non_lu', 'lu') DEFAULT 'non_lu',
    créé_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mis_à_jour_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Index sur le type et le statut pour des recherches plus rapides
CREATE INDEX idx_notifications_type ON notifications (type);
CREATE INDEX idx_notifications_statut ON notifications (statut);

-- Insertion de quelques notifications pour initialiser la base de données
INSERT INTO notifications (utilisateur_id, type, message, statut) VALUES
    (1, 'info', 'Votre commande a été expédiée.', 'non_lu'),
    (2, 'alerte', 'Veuillez mettre à jour vos informations de paiement.', 'non_lu'),
    (3, 'promotion', 'Profitez de 20 % de réduction sur votre prochaine commande.', 'non_lu');
