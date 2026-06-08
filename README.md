# Album-Animal-Crossing

## Frontend

cd para a pasta /frontend
npm run dev

## Backend

cd para a pasta /backend
sudo docker start pg-animal-crossing (o Postgress está no Docker)
npm run dev

### Para atualizar o backend

sudo docker exec -i pg-animal-crossing psql -U postgres -d album_animal_crossing < queries.sql
