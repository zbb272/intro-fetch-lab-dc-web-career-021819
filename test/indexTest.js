var expect = chai.expect;

//Avoid any infinite loops triggered by click
document.addEventListener("submit", (e) => e.preventDefault())

sinon.spy(window, "setInterval")

describe("Fetch exercises", () => {

  after(() => {
    window.setInterval.restore()
  })

  describe("swapi.js", () => {
    beforeEach(() => {
      sinon.stub(window, "fetch");
    });

    afterEach(() => {
      window.fetch.restore();
    });

    describe("Opening Crawl", () => {
      let fakeData = { opening_crawl: "test opening crawl" };

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ json: () => Promise.resolve(fakeData) })
        );
        let button = document.querySelector("#crawlBtn");
        button.click();
      });

      it('When the user clicks the button "Get Opening Crawl", you should fetch the data from the correct URL', () => {
        expect(window.fetch).to.have.been.calledWith(
          "https://swapi.co/api/films/1/"
        );
      });

      it("When the promise is resolved, the opening crawl should appear on the page", done => {
        setTimeout(() => {
          let div = document.getElementById("crawlDiv");
          expect(div.innerText).equal(fakeData.opening_crawl);
          done();
        }, 0);
      });
    });

    describe("Star Wars Planets", () => {
      let input = document.querySelector("#planetInput");
      let button = document.querySelector("#findPlanet");
      let div = document.querySelector("#planetData")
      let fakeData = { name: "test planet name", climate: "test planet climate" };

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ json: () => Promise.resolve(fakeData) })
        );
      })

      it("On submit of the planet form, fetch that planet's data from the correct url", () => {
        input.value = 33
        button.click()
        expect(window.fetch).to.have.been.calledWith(
          "https://swapi.co/api/planets/33/"
        );
      });

      it("When the promise resolves, display the name and climate of the planet in the `#planetData`", done => {
        button.click()
        setTimeout(() => {
          let div = document.getElementById("planetData");
          expect(div.innerHTML).equal(`<p>Name: ${fakeData.name}</p> <p>Climate: ${fakeData.climate}</p>`);
          done();
        }, 0);
      });

      it("Validates that the planet id is a number between 1 and 60", () => {
        //check to see if the number is >= 1
        input.value = 0
        button.click()
        expect(div.innerText).equal("please enter a number between 1 and 60");

        //check to see if the number is <= 60
        input.value = "61";
        button.click()
        expect(div.innerText).equal("please enter a number between 1 and 60");

        //check to see if the number is in fact a number
        input.value = "test";
        button.click()
        expect(div.innerText).equal("please enter a number between 1 and 60");
      });
    });

    describe("These Are The Droids", () => {
      // beforeEach(() => {
      //   window.fecth.withArgs()
      // })
      it("When the page loads, fetch the data for the characters", () => {
        expect(myFunction(9001)).to.be.true;
      });

      it("When the promise resolves, display each droid's name, height, and mass on the screen in the appropriate divs", () => {
        expect(myFunction(42)).to.be.false;
      });

      it("When the promise resolves, each droid div should have a button to 'Show Homeworld Details'", () => {
        expect(myFunction(42)).to.be.false;
      });

      it('When the user clicks the button "Show Homeworld Details" for either droid, you should fetch the homeworld planet data from the correct URL', () => {
        expect(myVariable).to.eq(42);
      });

      it("When the promise resolves, each droid's div should display the homeworld name in a span", () => {
        expect(myFunction(42)).to.be.false;
      });
    });
  });

  describe("numbers.js", () => {
    beforeEach(() => {
      sinon.stub(window, "fetch");
    });

    afterEach(() => {
      window.fetch.restore();
    });

    describe("Number One", () => {
      it("When a user clicks on the button 'Facts About 1', fetch a random fact about the number 1", () => {
        expect(myVariable).to.eq(42);
      });
      it("When the promise is resolved, a random fact about the number 1 should be displayed in the `#one-facts` div", () => {
        expect(myVariable).to.eq(42);
      });
    });

    describe("Pick a Number", () => {
      let input = document.querySelector('#pick-a-number')
      let event = new Event('change')

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ json: () => Promise.resolve(fakeData) })
        );
      })

      it("On change of the number input, fetch a math fact about that number", () => {
        input.value = 4
        input.dispatchEvent(event)
        expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/4/trivia")
      });
      it("When the promise is resolved, show the math fact on the screen in the `#random-math-fact` div", () => {
        expect(myFunction(42)).to.be.false;
      });
      it("Validates that the input is a number", () => {
        expect(myFunction(42)).to.be.false;
      });
    });
    // we aren't quite sure how to do this?
    describe("Those who fail to study history", () => {

      it("When the page loads, fetch a fact about this year", () => {
        expect(myFunction(9001)).to.be.true;
      });
      it("When the promise is resolved, the fact should be displayed in the `#year-history` div", () => {
        expect(myFunction(9001)).to.be.true;
      });
      // how do we test setInterval callback functions?
      it("Every five seconds, the previous year`s fact should be fetched", done => {
        console.log("about to test setInterval");
        setTimeout(() => {
          console.log("testing setInterval");
          expect(window.setInterval).to.have.been.calledWith(sinon.match.func, 5000)
          done()
        }, 0)

      });
    });

    describe("All the Numbers", () => {
      let button = document.querySelector('#all-numbers-button')
      let div = document.querySelector('#all-the-numbers')
      let fakeData = {"one": "test fact 1", two: "test fact 2"}

      beforeEach(() => {
        window.fetch.callsFake(() =>
          Promise.resolve({ json: () => Promise.resolve(fakeData) })
        );
        button.click();
      });

      it("When a user clicks the button, fetch facts for one hundred random numbers", () => {
        expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/1..100")
      });
      it("When the promise is resolved, all facts should be displayed in the `#all-the-numbers` div", done => {
        setTimeout(() => {
          let div = document.querySelector('#all-the-numbers');
          expect(div.innerHTML).equal(`<ul><li>test fact 1</li><li>test fact 2</li></ul>`);
          done();
        }, 0)
      });
    });
  });
})
