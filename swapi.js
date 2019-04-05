// Write your swapi code in this file!

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#crawlBtn').addEventListener('click', getOpeningCrawl)
    document.querySelector('#planetForm').addEventListener('submit', getPlanet)
})

function getOpeningCrawl(e) {
    e.preventDefault()
    const crawlDiv = document.querySelector('#crawlDiv')
    fetch('https://swapi.co/api/films/1')
        .then(res => res.json())
        .then(json => {
            crawlText = document.createElement('p')
            crawlText.innerText = json.opening_crawl
            crawlDiv.appendChild(crawlText)
        })
}

function getPlanet(e) {
    e.preventDefault()
    const planetId = document.querySelector('#planetInput').value
    if (planetId > 60 || planetId < 1) {
        alert('Invalid Input. Choose a number betwen 1 and 60.')
        return
    }
    fetch(`https://swapi.co/api/planets/${planetId}`)
        .then(res => res.json())
        .then(json => {
            debugger
            const planetDiv = document.querySelector('#planetData')

            const planetHeader = document.createElement('h2')
            planetHeader.innerHTML = '<br>Planet Result'
            planetDiv.appendChild(planetHeader)

            const planetName = document.createElement('h4')
            planetName.innerText = `Name: ${json.name}`
            planetDiv.appendChild(planetName)

            const planetClimate = document.createElement("p");
            planetClimate.innerText = `Climate: ${json.climate}`
            planetDiv.appendChild(planetClimate)
        })
}