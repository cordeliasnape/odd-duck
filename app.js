let prodViewer = document.querySelector("section");
let image1 = document.querySelector("#img1");
let image2 = document.querySelector("#img2");
let image3 = document.querySelector("#img3");

let votesRemaining = 25;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomIndex() {
  return Math.floor(Math.random() * allProds.length);
}

// in ONE FUNCTION render 3 images
function renderProds() {
  let prod1Index = getRandomIndex();
  let prod2Index = getRandomIndex();
  let prod3Index = getRandomIndex();

  //prevent from being same
  while (
    prod1Index === prod2Index ||
    prod2Index === prod3Index ||
    prod3Index === prod1Index
  ) {
    prod2Index = getRandomIndex();
    prod3Index = getRandomIndex();
  }

  //change src and names of all images
  image1.src = allProds[prod1Index].src;
  image2.src = allProds[prod2Index].src;
  image3.src = allProds[prod3Index].src;
  image1.alt = allProds[prod1Index].name;
  image2.alt = allProds[prod2Index].name;
  image3.alt = allProds[prod3Index].name;

  //increase views
  allProds[prod1Index].views++;
  allProds[prod2Index].views++;
  allProds[prod3Index].views++;

  // end of function
}

//Handle goat being clicked in ONE FUCNTION
function handleProdClick(event) {
  //get name of product
  let clickedProd = event.target.alt;
  //check even clicking on image
  if (event.target === prodViewer) {
    alert("Please choose a product.");
  } else {
    //render more
    renderProds();
  }
  //increase clicks of goats
  for (let i = 0; i < allProds.length; i++) {
    //check if name of goat in array is same as alt  of image
    if (clickedProd === allProds[i].name) {
      //increase clicks then stop loop if target found
      allProds[i].clicks++;
      break;
    }
  }
  votesRemaining--;

  if (votesRemaining === 0) {
    prodViewer.removeEventListener("click", handleProdClick);
    alert("You have used all of your votes.\nPlease view the results.");
  }
}

// array
const allProds = [
  new Product("bag", "./img/bag.jpg"),
  new Product("banana", "./img/banana.jpg"),
  new Product("bathroom", "./img/bathroom.jpg"),
  new Product("boots", "./img/boots.jpg"),
  new Product("breakfast", "./img/breakfast.jpg"),
  new Product("bubblegum", "./img/bubblegum.jpg"),
  new Product("chair", "./img/chair.jpg"),
  new Product("cthulhu", "./img/cthulhu.jpg"),
  new Product("dog-duck", "./img/dog-duck.jpg"),
  new Product("dragon", "./img/dragon.jpg"),
  new Product("pen", "./img/pen.jpg"),
  new Product("pet-sweet", "./img/pet-sweep.jpg"),
  new Product("scissors", "./img/scissors.jpg"),
  new Product("shark", "./img/shark.jpg"),
  new Product("sweep", "./img/sweep.png"),
  new Product("tauntaun", "./img/tauntaun.jpg"),
  new Product("unicorn", "./img/unicorn.jpg"),
  new Product("water-can", "./img/water-can.jpg"),
  new Product("wine-glass", "./img/wine-glass.jpg"),
];

//render results

//when user clicks button
//render a ul full of lis that tell the user hoe many times it has been clicked

prodViewer.addEventListener("click", handleProdClick);
renderProds();
