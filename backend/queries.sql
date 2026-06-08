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
    total INTEGER
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
    PRIMARY KEY (email,number),
    FOREIGN KEY (email) REFERENCES Users(email),
    FOREIGN KEY (number) REFERENCES Stickers(number)
);

--- Insert 10 villagers (seed) ---

INSERT INTO Stickers (number, name, species, personality, gender, rarity, url, total) VALUES
(001,'Piper','bird','peepy','female','rare','https://static.wikia.nocookie.net/animalcrossing/images/4/47/NH-Piper_poster.png/revision/latest?cb=20200522185742',15),
(002,'Ace','bird','jock','male','common','https://static.wikia.nocookie.net/animalcrossing/images/0/00/NH-Ace_poster_sq.png/revision/latest?cb=20211109153050',50),
(003,'Marlo','hamster','cranky','male','common','https://static.wikia.nocookie.net/animalcrossing/images/0/03/NH-Marlo_poster.png/revision/latest?cb=20211109151649',50),
(004,'Chevre','goat','normal','female','common','https://static.wikia.nocookie.net/animalcrossing/images/f/f4/NH-Chevre_poster.png/revision/latest?cb=20200522045944',50),
(005,'Billy','goat','jock','male','common','https://static.wikia.nocookie.net/animalcrossing/images/d/d3/NH-Billy_poster.png/revision/latest?cb=20200522022646',50),
(006,'Nan','goat','normal','female','common','https://static.wikia.nocookie.net/animalcrossing/images/d/de/NH-Nan_poster.png/revision/latest?cb=20200522184645',50),
(007,'Sherb','goat','lazy','male','common','https://static.wikia.nocookie.net/animalcrossing/images/3/31/NH-Sherb_poster.png/revision/latest?cb=20200916011120',50),
(008,'Ankha','cat','snooty','female','rare','https://static.wikia.nocookie.net/animalcrossing/images/9/9a/NH-Ankha_poster.png/revision/latest?cb=20200410182618',15),
(009,'Raymond','cat','smug','male','legendary','https://static.wikia.nocookie.net/animalcrossing/images/8/8e/NH-Raymond_poster.png/revision/latest?cb=20200522190120',5),
(010,'Olivia','cat','snooty','female','rare','https://static.wikia.nocookie.net/animalcrossing/images/5/5a/NH-Olivia_poster.png/revision/latest?cb=20200410182136',15);