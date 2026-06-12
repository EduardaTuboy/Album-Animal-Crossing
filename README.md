# Album-Animal-Crossing

# Docker

sudo docker compose up --build (first run)
sudo docker compose ps (conferir que está rodando)
sudo docker compose up
sudo docker compose down
sudo docker compose down -v (reset db)

## Raridade das Figurinhas

### Comum (50)

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

### Raro (20)

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

### Legendário (5)

- Elephant
- Frog
- Gorilla
- Rhino
- Tiger

## Villager Component Architecture

The `Villager` component is designed using a **Data-Driven Dynamic Layering** approach. Instead of hardcoding visual elements, it interprets a configuration array to render character layers and their respective UI controls dynamically.

### How It Works

1. **Layer Definition (`avatarLayers`)**:
   Inside the component, there is a central array of objects containing the configuration for each customizable part of the character (e.g., Skin, Eyes, Hair).
   ```javascript
   {
     id: "hair",              // Unique identifier
     label: "Hair",           // UI display name
     assets: hairs,           // Array of imported image assets
     index: hairIndex,        // Current active index state
     setIndex: setHairIndex,  // State setter for changing items
     color: hairColor,        // [Optional] Hex color code state
     setColor: setHairColor,  // [Optional] State setter for color changes
     blendMode: "screen"      // [Optional] CSS mix-blend-mode ("color", "screen", "multiply")
   }
   ```
