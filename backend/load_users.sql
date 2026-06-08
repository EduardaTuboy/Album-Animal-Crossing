TRUNCATE TABLE Users CASCADE;

INSERT INTO Users (email, username, password, role) VALUES
('usuario@exemplo.com', 'usuario', 'senha123', 'user');

INSERT INTO Collect (email, number, amount) VALUES
('usuario@exemplo.com', 295, 5), -- Piper
('usuario@exemplo.com', 087, 2), -- Chevre
('usuario@exemplo.com', 239, 3), -- Marlo
('usuario@exemplo.com', 245, 1), -- Merengue
('usuario@exemplo.com', 270, 3), -- Olivia
('usuario@exemplo.com', 197, 2), -- Judy
('usuario@exemplo.com', 323, 2), -- Roald
('usuario@exemplo.com', 257, 1), -- Mott
('usuario@exemplo.com', 006, 1), -- Alfonso
('usuario@exemplo.com', 008, 1), -- Alli
('usuario@exemplo.com', 115, 1), -- Del
('usuario@exemplo.com', 354, 2); -- Snooty
