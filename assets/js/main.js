// Create Dino Constructor
const humanTilePosition = 4;

function Animal(species, weight, height, diet, position) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.position = position;
}

function Dinosaur(species, weight, height, diet, where, when, fact, position) {
  Animal.call(this, species, weight, height, diet, position);
  this.where = where;
  this.when = when;
  this.fact = fact;
}

function Human(name, species, weight, height, diet, position) {
  Animal.call(this, species, weight, height, diet, position);
  this.name = name;
}

// Create Dino Objects

const AnimalData = [];
const DinoDataRaw = JSON.parse(DINO_DATA_JSON);
const randomArray = getRandomNumberArray(8);
DinoDataRaw.Dinos.forEach((dino, index) => {
  AnimalData.push(
    new Dinosaur(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact,
      randomArray[index]
    )
  );
});

// Create Human Object
const person = new Human();

// Use IIFE to get human data from form
// Compare button
const compareButton = document.getElementById("compare-button");
// Rest of the form
const fullNameField = document.getElementById("name");
const heightFeetField = document.getElementById("height-feet");
const heightInchesField = document.getElementById("height-inches");
const weightLbsField = document.getElementById("weight-lbs");
const dietField = document.getElementById("diet");

compareButton.addEventListener(
  "click", (() => {
    console.log("TEST: " + DinoDataRaw.Dinos.length);
    return () => {
      person.name = fullNameField.value;
      person.species = "Human";
      person.weight = weightLbsField.value;
      person.height = (heightFeetField.value * 12) + heightInchesField.value;
      person.diet = dietField.value;
      person.position = humanTilePosition;
    }
  })()
);

AnimalData.push(person);

console.log(AnimalData);

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


// // Helper functions
function getRandomNumberArray(size) {
  // Source: https://stackoverflow.com/a/2380113
  size++;
  var arr = [];
  while(arr.length < size){
      var r = Math.floor(Math.random() * size);
      if(arr.indexOf(r) === -1) arr.push(r);
  }
  humanTilePositionIndex = arr.indexOf(humanTilePosition)
  if(humanTilePositionIndex !== -1) arr.splice(humanTilePositionIndex, 1)
  return arr
}
