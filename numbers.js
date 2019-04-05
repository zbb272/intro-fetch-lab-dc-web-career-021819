// Write your numbers code in this file!

document.addEventListener("DOMContentLoaded", allTheStuff);

function allTheStuff(e){
  let crawlButton = document.getElementById("crawlBtn");
  crawlButton.addEventListener('click', crawlButtonEventHandler);
}


function crawlButtonEventHandler(event){
  getOpeningCrawl();
}

function getOpeningCrawl(){
  let promiseForData = fetch('https://swapi.co/api/films/1/')
  .then(res  => res.json())
  .then(data => {
    let div = document.querySelector("#crawlDiv");
    div.innerText = data.opening_crawl;
  });
}
