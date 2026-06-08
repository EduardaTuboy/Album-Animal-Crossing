# Album-Animal-Crossing

## Frontend

cd para a pasta /frontend
npm run dev

## Backend

cd para a pasta /backend
sudo docker start pg-animal-crossing (o Postgress está no Docker)
npm run dev

### Para atualizar o backend

sudo docker exec -i pg-animal-crossing psql -U postgres -d album_animal_crossing < load_stickers.sql

sudo docker exec -i pg-animal-crossing psql -U postgres -d album_animal_crossing < load_users.sql

## Raridade das Figurinhas

### Comum

- Bird
- Bull
- Cat
- Chicken
- Cow
- Deer
- Dog
- Duck
- Goat
- Hamster
- Horse
- Kangaroo
- Mouse
- Octopus
- Ostrich
- Pig
- Rabbit
- Sheep
- Squirrel
- Wolf

### Raro

- Alligator
- Anteater
- Bear
- Cub
- Eagle
- Hippo
- Koala
- Lion
- Monkey
- Penguin

### Legendário

- Elephant
- Frog
- Gorilla
- Rhino
- Tiger
