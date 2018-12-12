# Javascript `fetch` GET requests lab

## Introduction

In this lab, you'll use `fetch` to send GET requests. First we're going to use `fetch` to get data about Star Wars 🛰👾🚀. Then, we'll check out the Numbers API and handle info for some nerdy number facts 🔢🤓📐.

## Instructions

### SWAPI

API Documentation for SWAPI is at [https://swapi.co/documentation](https://swapi.co/documentation)

1.  Opening Crawl - Star Wars Episode 4 (`getOpeningCrawl`)

- When the user clicks "Get Opening Crawl" button, it should trigger the function `getOpeningCrawl` which will fetch the data for "Star Wars Episode 4: A New Hope"
  _NOTE: The ID for Episode 4 is 1_
- When the `Promise` is resolved, the film's opening crawl should appear on the page in the `#crawlDiv`

Getting data from SWAPI is simple! We pass the url into `fetch`, then add the handling behavior for the response with `.then`:

```
fetch('https://swapi.co/api/films/1/')
  .then(res => res.json())
  .then(json => console.log(json));
```

The call to fetch returns a _Promise_ right away.

```
let promiseForData = fetch('https://swapi.co/api/films/1/')
// evaluates immediately
```

We add a handler for the data with `then`.

```
promiseForData.then(response => response.json())
```

This is similar to attaching an event handler to handle a DOM event! When the result 'happens' - when SWAPI responds to the HTTP request with some data - we want to do something with that data. `then` is the way we specify what should happen when the `Promise` resolves.

In this case, we want to parse the body of the response as JSON, so we call the `.json()` method. `then()` returns a `Promise`, and _that_ `Promise`'s handler will get the parsed JSON as input.

```
promiseForData
  .then(response => response.json())
  .then(json => console.log(json)
```

2.  Star Wars Planets (`getPlanet`)

- If a user enters an integer in the `#planetInput`, on submit it should call `getPlanet`, using the user input for the id of the planet to fetch
  _NOTE: only the numbers 1 through 60 are valid planet ids, so think about some way of validating the number_
- `getPlanet` should fetch that planet's data from the correct url
- When the promise resolves, it should display the name and climate of the planet in the `#planetData` div

3.  These Are The Droids You're Looking For (`getDroids, getHomePlanet`)

> > > > > > > master

- Things to consider:
  - What information do you need from the first fetch to make the second?
  - When should you add the event listener for these two buttons?

### NERDY NUMBERS

The [Numbers API](http://numbersapi.com/) is, in their words

> An API for interesting facts about numbers

Let's nerd out.

**Note**: The Numbers API responds with Text (Not JSON!), so we can use the `.text()` method to parse the response instead of `.json()`.

1.  Number One.

    - When a user clicks on the button 'Facts About 1':
      - fetch a random fact about the number 1 from "/{number}/trivia" endpoint.
      - Add the fact to the DOM in the `#one-facts` div

2.  Pick a Number, Any Number.

    - When a user enters a number in the input:
      - On _Change_, fetch a math fact about that number (Hint! Try looking into different event types!)
      - Try adding a validation so that a user can't submit a non-number
      - Show it on the screen in the `#random-math-fact` div

3.  Those who fail to study history are doomed to repeat it

    - When the page loads, start an interval:
      - Every 5 seconds, fetch a fact about a year and show it on the screen in the `#year-history` div
      - Start with this year
      - Every 5 seconds, get the fact about the previous year

4.  All the numbers

    - When a user clicks the 'All of the Numbers' button
      - fetch facts for one hundred random numbers
      - append a div to `"#all-the-numbers"` to display all numbers and their fact

🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓
🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓
🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓
🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓🔢🤓

## Resources

- [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [SWAPI](https://swapi.co/documentation)
- [Numbers API](http://numbersapi.com/)
