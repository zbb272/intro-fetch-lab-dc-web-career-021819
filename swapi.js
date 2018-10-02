// Write your swapi code in this file!
document.addEventListener("DOMContentLoaded", (e) => {
  const crawl = document.getElementById('crawlBtn');
  crawl.addEventListener('click', (e) => {
    this.fetchCrawl()
      .then(json => {
        const crawlDiv = document.getElementById('crawlDiv');
        crawlDiv.innerText = json.opening_crawl
      })
  })

  const planetForm = document.getElementById('planetForm');
  planetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.firstElementChild.value;
    if ((input >= 1 && input <=60) && typeof input === 'number') {
      this.fetchPlanet(e.target.value)
    } else {
      console.log('Wrong!', input);
    }
  })

  fetchCrawl = () => {
    return fetch(`https://swapi.co/api/films/1`)
      .then(res => res.json())
  }

  fetchPlanet = (id) => {
    return fetch(`https://swapi.co/api/planets/${id}`)
      .then(res => res.json())
      .then(console.log)
  }
})
