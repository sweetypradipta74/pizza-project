// Define constants for the pizza bases and toppings
const PIZZA_BASES = [
  { name: "Thin crust", imgSrc: "thin-crust.jpg" },
  { name: "Deep dish", imgSrc: "deep-dish.jpeg" },
];
const TOPPINGS = [
  { name: "Mushrooms", imgSrc: "mushrooms.jpg" },
  { name: "Peppers", imgSrc: "peppers.jpg" },
  { name: "Onions", imgSrc: "onions.jpg" },
];

// Get references to the DOM elements we need
const pizzaBaseContainer = document.querySelector(".pizza-base-container");
const toppingsContainer = document.querySelector(".toppings-container");
const pizzaImage = document.querySelector(".pizza-image");

// Define variables to store the state of the pizza
let pizzaBase = null;
let toppings = [];

// Set up the pizza base selection
for (let i = 0; i < PIZZA_BASES.length; i++) {
  const pizzaBase = PIZZA_BASES[i];
  const pizzaBaseElement = document.createElement("img");
  pizzaBaseElement.src = pizzaBase.imgSrc;
  pizzaBaseElement.alt = pizzaBase.name;
  pizzaBaseElement.classList.add("pizza-base");
  pizzaBaseElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", pizzaBase.name);
  });
  pizzaBaseContainer.appendChild(pizzaBaseElement);
}

// Set up the toppings selection
for (let i = 0; i < TOPPINGS.length; i++) {
  const topping = TOPPINGS[i];
  const toppingElement = document.createElement("img");
  toppingElement.src = topping.imgSrc;
  toppingElement.alt = topping.name;
  toppingElement.classList.add("topping");
  toppingElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", topping.name);
  });
  toppingsContainer.appendChild(toppingElement);
}

// Set up the pizza base drop zone
pizzaImage.addEventListener("dragover", (event) => {
  event.preventDefault();
});
pizzaImage.addEventListener("drop", (event) => {
  event.preventDefault();
  const pizzaBaseName = event.dataTransfer.getData("text/plain");
  pizzaBase = PIZZA_BASES.find((base) => base.name === pizzaBaseName);
  pizzaImage.src = pizzaBase.imgSrc;
});

// Set up the toppings drop zone
pizzaImage.addEventListener("dragenter", (event) => {
  event.preventDefault();
});
pizzaImage.addEventListener("dragover", (event) => {
  event.preventDefault();
});
pizzaImage.addEventListener("drop", (event) => {
  event.preventDefault();
  const toppingName = event.dataTransfer.getData("text/plain");
  const topping = TOPPINGS.find((topping) => topping.name === toppingName);
  toppings.push(topping);
  pizzaImage.src = getPizzaImageSrc();
});

// Helper function to get the src for the current pizza image
function getPizzaImageSrc() {
  let src = pizzaBase.imgSrc;
  for (let i = 0; i < toppings.length; i++) {
    src = src.replace(".jpg", "-" + toppings[i].name.toLowerCase() + ".jpg");
  }
  return src;
}
