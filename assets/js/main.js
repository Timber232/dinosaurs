// Create Dino Constructor
function Animal(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects
const AnimalData = [];
const DinoDataRaw = JSON.parse(DINO_DATA_JSON);
DinoDataRaw.Dinos.forEach((dino) => {
  AnimalData.push(
    new Animal(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact
    )
  );
});

// Create Human Object
function Human(name, species, weight, height, diet, where, when, fact) {
  Animal.call(this, species, weight, height, diet, where, when, fact)
  this.name = name;
}

const person = new Human();

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
