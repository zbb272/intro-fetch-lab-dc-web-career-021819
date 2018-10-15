function fetchSwapi(type, num) {
  return fetch(`https://swapi.co/api/${type}/${num}`).then(res => res.json())
}


function getOpeningCrawl() {
  fetchSwapi('films', 1)
  .then(d => {
    crawlDiv = document.getElementById("crawlDiv");
    crawlDiv.innerText = d.opening_crawl;
  });
};


function getPlanet(e) {
  e.preventDefault()
  const planetId = parseInt(document.querySelector('#planetInput').value)
  const planetData = document.getElementById('planetData')
  if(isNaN(planetId) || planetId < 1 || planetId > 60) {
    planetData.innerHTML = "please enter a number between 1 and 60"
  } else {
    fetchSwapi('planets', planetId)
    .then(d => {
      planetData.innerHTML = `<p>Name: ${d.name}</p> <p>Climate: ${d.climate}`
  })
  }
}

function getHomePlanet(planetData, id) {
  console.log(`about to fetch data for planet ${planetData}`);
  fetch(planetData)
  .then(r => r.json())
  .then(planet => {
    document.getElementById(`droid-${id}-homeworld`).innerText = planet.name
  })
}

function getDroids() {
  const droidIDs = [2, 3]
  droidIDs.map(id => {
    const droidNameSpan = document.getElementById(`droid-${id}-name`)
    const droidHeightSpan = document.getElementById(`droid-${id}-height`)
    const droidMassSpan = document.getElementById(`droid-${id}-mass`)
    const droidBtn = document.getElementById(`droid-${id}-btn`)
    fetchSwapi("people", id)
    .then(droid => {
      droidNameSpan.innerText = droid.name
      droidHeightSpan.innerText = droid.height
      droidMassSpan.innerText = droid.mass
      droidBtn.addEventListener('click', () => getHomePlanet(droid.homeworld, id))
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  const crawlButton = document.querySelector('#crawlBtn')
  crawlButton.addEventListener('click', getOpeningCrawl)
  const planetSelector = document.querySelector('#planetForm')
  planetSelector.addEventListener('submit', getPlanet)
  const droidBtn = document.querySelector("#find-droids")
  droidBtn.addEventListener('click', getDroids)
})
