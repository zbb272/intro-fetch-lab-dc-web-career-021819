function fetchTrivia(num) {
  return fetch(`http://numbersapi.com/${num}/trivia`).then(res => res.text())
}

function showOneTrivia() {
  const div = document.querySelector('#one-facts')
  div.innerHTML = ''
  fetchTrivia(1).then(trivia => {
    div.innerHTML = trivia
  })
}

function showTrivia() {
  const div = document.querySelector('#random-math-fact')
  div.innerHTML = ''
  const num = document.querySelector('#pick-a-number').value

  if (isNaN(num)) {
    div.innerHTML = 'please enter a valid number'
  } else {
    fetchTrivia(num).then(trivia => {
      div.innerHTML = trivia
    })
  }
}

function fetchYearFact(year) {
  return fetch(`http://numbersapi.com/${year}/year`).then(res => res.text())
}

function showYearFact(year) {
  const div = document.querySelector('#year-history')
  div.innerHTML = ''
  fetchYearFact(year).then(fact => {
    div.innerHTML = fact
  })
}

function addYearFactInterval() {
  let year = new Date().getFullYear()
  showYearFact(year)
  setInterval(() => {
    year--
    showYearFact(year)
  }, 5000)
}

function getAllTheNumbers() {
  return fetch('http://numbersapi.com/1..100').then(res => res.json())
}

function showAllTheNumbers() {
  const div = document.querySelector('#all-the-numbers')
  div.innerHTML = ''
  getAllTheNumbers().then(numbers => {
    let html = '<ul>'
    for (key in numbers) {
      html += `<li>${numbers[key]}</li>`
    }
    html += '</ul>'
    div.innerHTML = html
  })
}

document.addEventListener('DOMContentLoaded', function() {
  let oneButton = document.querySelector('#number-one')
  oneButton.addEventListener('click', showOneTrivia)
  let triviaInput = document.querySelector('#pick-a-number')
  triviaInput.addEventListener('input', showTrivia)
  addYearFactInterval()
  let allNumbersButton = document.querySelector('#all-numbers-button')
  allNumbersButton.addEventListener('click', showAllTheNumbers)
})
