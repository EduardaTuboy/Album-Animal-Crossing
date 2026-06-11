DROP TABLE IF EXISTS Collect;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Stickers;

-- Create tables ---

CREATE TABLE Stickers (
    number INTEGER PRIMARY KEY,
    species VARCHAR(20),
    name VARCHAR(20),
    personality VARCHAR(20),
    gender VARCHAR(10),
    rarity VARCHAR(20),
    url TEXT,
    total INTEGER,
    catchphrase VARCHAR(20),
    birthday DATE,
    hobbie VARCHAR(20)
);

CREATE TABLE Users (
    email VARCHAR(255) PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(255),
    role VARCHAR(20)
);

CREATE TABLE Collect (
    email VARCHAR(255),
    number INTEGER,
    amount INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    autograph BOOLEAN DEFAULT false,
    PRIMARY KEY (email,number),
    FOREIGN KEY (email) REFERENCES Users(email),
    FOREIGN KEY (number) REFERENCES Stickers(number)
);