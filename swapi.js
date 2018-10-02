document.addEventListener("DOMContentLoaded", () => {
  crawlButton = document.querySelector("#crawlBtn");
  crawlButton.addEventListener("click", getOpeningCrawl);
  planetSelector = document.querySelector("#findPlanet");
  planetSelector.addEventListener("click", getPlanet);
  getDroids();
});

const getOpeningCrawl = () => {
  fetch("https://swapi.co/api/films/1/")
    .then(r => r.json())
    .then(d => {
      crawlDiv = document.getElementById("crawlDiv");
      crawlDiv.innerText = d.opening_crawl;
    });
};

const getPlanet = e => {
  e.preventDefault();
  currentPlanet = parseInt(document.querySelector("#planetInput").value);
  planetData = document.getElementById("planetData");
  if (isNaN(currentPlanet)) {
    planetData.innerText = "please enter a number between 1 and 60";
  } else if (currentPlanet < 1 || currentPlanet > 60) {
    planetData.innerText = "please enter a number between 1 and 60";
  } else {
    fetch(`https://swapi.co/api/planets/${currentPlanet}/`)
      .then(r => r.json())
      .then(d => {
        planetData.innerHTML = `<p>Name: ${d.name}</p> <p>Climate: ${
          d.climate
        }`;
      });
  }
};

const getDroids = () => {
  let droidIDs = [2, 3];
  droidIDs.map(id => {
    let droidDiv = document.getElementById(`droid-${id}`);

    fetch(`https://swapi.co/api/people/${id}/`)
      .then(r => r.json())
      .then(droid => {
        droidDiv.innerHTML = `<p><strong>Name:</strong> ${droid.name}</p>
          <p><strong>Height:</strong> ${droid.height}</p>
          <p><strong>Mass:</strong> ${droid.mass}</p>
          <p><span class='home-planet'></span></p></br>
          <button>Show Homeworld Details</button>`;
        let button = droidDiv.querySelector("button");
        button.addEventListener("click", function() {
          fetch(droid.homeworld)
            .then(r => r.json())
            .then(planet => {
              droidDiv.querySelector(
                `.home-planet`
              ).innerHTML = `<strong>Home World:</strong> ${planet.name}`;
            });
        });
      });
  });
};
