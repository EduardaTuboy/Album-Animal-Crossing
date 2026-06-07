-- Create tables ---

CREATE TABLE Stickers (
    number INTEGER PRIMARY KEY,
    species VARCHAR(20),
    name VARCHAR(20),
    personality VARCHAR(20),
    gender VARCHAR(10),
    rarity VARCHAR(20),
    url VARCHAR(255),
    total INTEGER,
);

CREATE TABLE User (
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
    PRIMARY KEY (email,number),
    FOREIGN KEY (email) REFERENCES User(email),
    FOREIGN KEY (number) REFERENCES Stickers(number)
)

--- Insert 10 villagers (seed) ---

INSERT INTO Stickers (number, species, name, personality, gender, rarity, url, total) VALUES
("Piper","bird","peepy","female","rare","https://static.wikia.nocookie.net/animalcrossing/images/4/47/NH-Piper_poster.png/revision/latest?cb=20200522185742","15"),
("Ace","bird","jock","male","common","https://static.wikia.nocookie.net/animalcrossing/images/0/00/NH-Ace_poster_sq.png/revision/latest?cb=20211109153050","50"),
("Marlo","hamster","cranky","male","common","https://static.wikia.nocookie.net/animalcrossing/images/0/03/NH-Marlo_poster.png/revision/latest?cb=20211109151649","50"),
("Chevre","goat","normal","female","common","https://static.wikia.nocookie.net/animalcrossing/images/f/f4/NH-Chevre_poster.png/revision/latest?cb=20200522045944","50"),
("Billy","goat","jock","male","common","https://static.wikia.nocookie.net/animalcrossing/images/d/d3/NH-Billy_poster.png/revision/latest?cb=20200522022646","50"),
("Nan","goat","normal","female","common","https://static.wikia.nocookie.net/animalcrossing/images/d/de/NH-Nan_poster.png/revision/latest?cb=20200522184645","50"),
("Sherb","goat","lazy","male","common","https://static.wikia.nocookie.net/animalcrossing/images/3/31/NH-Sherb_poster.png/revision/latest?cb=20200916011120","50"),
("Ankha","cat","snooty","female","rare","https://static.wikia.nocookie.net/animalcrossing/images/9/9a/NH-Ankha_poster.png/revision/latest?cb=20200410182618","15"),
("Raymond","cat","smug","male","legendary","https://static.wikia.nocookie.net/animalcrossing/images/8/8e/NH-Raymond_poster.png/revision/latest?cb=20200522190120","5"),
("Olivia","cat","snooty","female","rare","https://static.wikia.nocookie.net/animalcrossing/images/5/5a/NH-Olivia_poster.png/revision/latest?cb=20200410182136","15");