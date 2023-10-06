let prodViewer = document.querySelector("section");
let image1 = document.querySelector("#img1");
let image2 = document.querySelector("#img2");
let image3 = document.querySelector("#img3");

let votesRemaining = 25;

const allProds = []; //check

let previous = [];

function Product(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;

  allProds.push(this);
}

checkLocal();
console.log(checkLocal);

function checkLocal() {
  if (localStorage.getItem("products") === null) {
    new Product("bag", "./img/bag.jpg", 0, 0);
    new Product("banana", "./img/banana.jpg", 0, 0);
    new Product("bathroom", "./img/bathroom.jpg", 0, 0);
    new Product("boots", "./img/boots.jpg", 0, 0);
    new Product("breakfast", "./img/breakfast.jpg", 0, 0);
    new Product("bubblegum", "./img/bubblegum.jpg", 0, 0);
    new Product("chair", "./img/chair.jpg", 0, 0);
    new Product("cthulhu", "./img/cthulhu.jpg", 0, 0);
    new Product("dog-duck", "./img/dog-duck.jpg", 0, 0);
    new Product("dragon", "./img/dragon.jpg", 0, 0);
    new Product("pen", "./img/pen.jpg", 0, 0);
    new Product("pet-sweet", "./img/pet-sweep.jpg", 0, 0);
    new Product("scissors", "./img/scissors.jpg", 0, 0);
    new Product("shark", "./img/shark.jpg", 0, 0);
    new Product("sweep", "./img/sweep.png", 0, 0);
    new Product("tauntaun", "./img/tauntaun.jpg", 0, 0);
    new Product("unicorn", "./img/unicorn.jpg", 0, 0);
    new Product("water-can", "./img/water-can.jpg", 0, 0);
    new Product("wine-glass", "./img/wine-glass.jpg", 0, 0);
  } else {
    const prodsLS = JSON.parse(localStorage.getItem("products")); //parse fixed it, we're just getting the products from LS

    for (let i = 0; i < prodsLS.length; i++) {
      new Product(
        prodsLS[i].name,
        prodsLS[i].src,
        prodsLS[i].views,
        prodsLS[i].clicks
      );
    }
  }
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
    prod3Index === prod1Index ||
    previous.includes(prod1Index) ||
    previous.includes(prod2Index) ||
    previous.includes(prod3Index)
  ) {
    prod1Index = getRandomIndex();
    prod2Index = getRandomIndex();
    prod3Index = getRandomIndex();
  }

  // prevent double showing by adding into array
  previous = [prod1Index, prod2Index, prod3Index];

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

//Handle product being clicked in ONE FUCNTION
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
  //increase clicks of prods
  for (let i = 0; i < allProds.length; i++) {
    //check if name of product in array is same as alt  of image
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

    // console.log(clicksData);

    localStorage.setItem("products", JSON.stringify(allProds));

    // loadChart();
  }
}

//render results

//when user clicks button
//render a ul full of lis that tell the user how many times it has been clicked

function voteResults() {
  const results = document.getElementById("myResults");
  const ul = document.createElement("ul");
  for (let i = 0; i < allProds.length; i++) {
    const li = document.createElement("li");
    li.textContent = `You viewed ${allProds[i].name} ${allProds[i].views} times. You clicked it ${allProds[i].clicks} times.`; //caled template literal
    ul.appendChild(li);
  }
  results.appendChild(ul);
}

//adding a chart 03/10
//make all values have a variable - added data to end of handle function

//working chart:

// const nameData = [];
// const viewsData = [];
// const clicksData = [];

// const handleButtonClick = function () {
//   const nameData = JSON.parse(localStorage.getItem("nameData"));
//   const viewsData = JSON.parse(localStorage.getItem("viewsData"));
//   const clicksData = JSON.parse(localStorage.getItem("clicksData"));
// };

//render in chart
// function loadChart() {
//   const ctx = document.getElementById("myChart");
//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: nameData,
//       datasets: [
//         {
//           label: "# of views",
//           data: viewsData,
//           borderWidth: 3,
//           // backgroundColor: ["red", "#cdaa7f", "skyblue", "green", "orange"],
//         },
//         {
//           label: "# of clicks",
//           data: clicksData,
//           borderWidth: 3,
//           // backgroundColor: ["red", "#cdaa7f", "skyblue", "green", "orange"],
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }

// call functions

const viewResultsButton = document.getElementById("viewResultsButton");
viewResultsButton.addEventListener("click", voteResults);

prodViewer.addEventListener("click", handleProdClick);
renderProds();
