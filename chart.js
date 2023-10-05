//TODO

const nameData = [];
const viewsData = [];
const clicksData = [];

for (let i = 0; i < allProds.length; i++) {
  nameData.push(allProds[i].name);
  viewsData.push(allProds[i].views);
  clicksData.push(allProds[i].clicks);
}

function loadChart() {
  const products = JSON.parse(localStorage.getItem("products"));
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: nameData,
      datasets: [
        {
          label: "# of views",
          data: viewsData,
          borderWidth: 3,
          // backgroundColor: ["red", "#cdaa7f", "skyblue", "green", "orange"],
        },
        {
          label: "# of clicks",
          data: clicksData,
          borderWidth: 3,
          // backgroundColor: ["red", "#cdaa7f", "skyblue", "green", "orange"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

loadChart();
