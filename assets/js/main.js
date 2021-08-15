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

// Form
const formContainer = document.getElementById("dino-form-container");
// Compare button
const compareButton = document.getElementById("compare-button");
// Rest of the form
const fullNameField = document.getElementById("name");
const heightFeetField = document.getElementById("height-feet");
const heightInchesField = document.getElementById("height-inches");
const weightLbsField = document.getElementById("weight-lbs");
const dietField = document.getElementById("diet");
//Dino grid
const gridElement = document.getElementById("dino-grid");

const person = new Human();
const originalAnimalLenght = AnimalData.length;
compareButton.addEventListener(
  "click", (() => {
    return () => {
      person.name = fullNameField.value;
      person.species = "Human";
      person.weight = weightLbsField.value;
      person.height = (heightFeetField.value * 12) + heightInchesField.value;
      person.diet = dietField.value;
      person.position = humanTilePosition;

      const shuffledArrayIndex = getRandomNumberArray(7)
      pigeonIndex = AnimalData.findIndex((animal) => (animal.species === "Pigeon"));
      pigeonIndex = shuffledArrayIndex.indexOf(pigeonIndex)
      if (pigeonIndex !== -1) shuffledArrayIndex.splice(pigeonIndex, 1)
      shuffledArrayIndex.splice(0, 3);

      shuffledArrayIndex.forEach(function(value, index) {
        AnimalData[value].fact = compareFunctions[index](person, AnimalData[value])
      });
      AnimalData[originalAnimalLenght] = person;
      formContainer.className = "hidden"
      generateTiles(AnimalData)
    }
  })()
);

const compareFunctions = [
  (human, dino) => {
    const heightDiff = Math.abs(dino.height - human.height);
    const tallerOrShorter = human.height < dino.height ? "shorter" : "taller";
    return `${human.name} is ${inchesToFootAndInches(heightDiff)} ${tallerOrShorter} than ${dino.species}`;
  },
  function compareDiet(human, dino) {
    if (human.diet.toLowerCase() !== dino.diet.toLowerCase()) {
      return `${human.name}'s diet is ${human.diet.toLowerCase()} and ${dino.species} diet is ${dino.diet.toLowerCase()}`
    } else {
      return `${human.name}'s diet is the same as ${dino.species}'s diet, which is ${dino.diet}`;
    }
  },
  function compareWeight(human, dino) {
    const weightDiff = Math.abs(dino.weight - human.weight);
    const heavierOrLighter = human.weight < dino.weight ? "lighter" : "heavier";
    console.log(human.weight + ": " + dino.weight + ", human is " + heavierOrLighter + " than dino");
    return `${human.name} is ${weightDiff} pounds ${heavierOrLighter} than ${dino.species}`;
  }
]

const bgColorClasses = [
  "bg-red-700",
  "bg-blue-700",
  "bg-green-700",
  "bg-yellow-700",
  "bg-purple-700",
  "bg-yellow-500",
  "bg-red-500",
  "bg-blue-900",
  "bg-green-800",
];

// Generate Tiles for each Dino in Array
function generateTiles(data) {
  const gridFragment = document.createDocumentFragment();
  gridElement.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    var position = data.findIndex((animal) => animal.position == i);

    // Each grid boxes
    const gridBox = document.createElement("div");
    gridBox.className = `${bgColorClasses[position]} relative`;

    // Grid upper label
    const upperLabel = document.createElement("div");
    upperLabel.className = "absolute inset-x-0 top-0 h-10 bg-transparent-500 p-2 text-center bg-black bg-opacity-50 text-white";
    upperLabel.innerText = data[position].species;

    // Dinosaurs image
    const dinoImage = document.createElement("img");
    dinoImage.setAttribute("src", `../assets/img/${data[position].species.toLowerCase()}.png`);
    dinoImage.className = "absolute inset-x-0 top-10 bottom-15"

    // Grid lower label
    const lowerLabel = document.createElement("div");
    lowerLabel.className = "absolute inset-x-0 bottom-0 h-15 bg-transparent-500 p-2 text-center bg-black bg-opacity-25 text-white";
    lowerLabel.innerText = data[position].fact;
    gridBox.append(dinoImage, upperLabel);

    if (data[position].fact !== undefined) {
      gridBox.append(lowerLabel);
    }
    gridFragment.append(gridBox);
  }
  gridElement.append(gridFragment);
}

// Helper functions
function getRandomNumberArray(size) {
  // Source: https://stackoverflow.com/a/2380113
  size++;
  const arr = [];
  while (arr.length < size) {
    const r = Math.floor(Math.random() * size);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  humanTilePositionIndex = arr.indexOf(humanTilePosition)
  if (humanTilePositionIndex !== -1) arr.splice(humanTilePositionIndex, 1)
  return arr
}

// TODO: Complete inches to foot and inches function
function inchesToFootAndInches(inches) {
  const foot = inches/12
  return `${Math.floor(foot)} feet and ${inches % 12} inches`;
}
