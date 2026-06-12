TRUNCATE TABLE Users CASCADE;

INSERT INTO Users (email, username, password, role) VALUES
('usuario@exemplo.com', 'usuario', 'senha123', 'user');

INSERT INTO Collect (email, number, amount, autograph) VALUES
('usuario@exemplo.com', 295, 5, false), -- Piper
('usuario@exemplo.com', 087, 2, false), -- Chevre
('usuario@exemplo.com', 239, 3, false), -- Marlo
('usuario@exemplo.com', 245, 1, false), -- Merengue
('usuario@exemplo.com', 270, 3, false), -- Olivia
('usuario@exemplo.com', 197, 2, false), -- Judy
('usuario@exemplo.com', 323, 2, false), -- Roald
('usuario@exemplo.com', 257, 1, false), -- Mott
('usuario@exemplo.com', 006, 1, false), -- Alfonso
('usuario@exemplo.com', 008, 1, false), -- Alli
('usuario@exemplo.com', 115, 1, false), -- Del
('usuario@exemplo.com', 354, 2, false); -- Snooty
