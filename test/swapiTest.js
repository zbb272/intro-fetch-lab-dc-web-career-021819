var expect = chai.expect;

//Avoid any infinite loops triggered by click
document.addEventListener("submit", (e) => e.preventDefault())

describe("swapi.js", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch")
  })

  afterEach(() => {
    window.fetch.restore()
  })

  describe("Opening Crawl", () => {
    let fakeCrawl = {opening_crawl: 'Test opening crawl'}

    beforeEach(() => {
      window.fetch.callsFake(() => Promise.resolve({json: () => Promise.resolve(fakeCrawl)}))
      getOpeningCrawl()
    })

    it('When the user clicks the button "Get Opening Crawl", you should fetch the data from the correct URL', () => {
      expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/films/1")
    });

    it("When the promise is resolved, the opening crawl should appear on the page", done => {
      setTimeout(() => {
        let div = document.getElementById("crawlDiv")
        expect(div.innerText).equal(fakeCrawl.opening_crawl)
        done();
      }, 0)
    });
  })

  describe("Get Planet", () => {
    let input = document.querySelector('#planetInput')
    let div = document.querySelector('#planetData')
    let button = document.querySelector('#findPlanet')
    let fakePlanet = {name: 'Test Planet Name', climate: 'Test Planet Climate' }

    beforeEach(() => {
      window.fetch.callsFake(() =>
        Promise.resolve({json: () => Promise.resolve(fakePlanet)})
      );
    })

    it("On click of the 'get planet' button, fetch that planet's data from the correct url", () => {
      input.value = 33
      button.click()
      expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/planets/33");
    });

    it("When the promise resolves, display the name and climate of the planet in the `#planetData`", done => {
     button.click()
     setTimeout(() => {
       let div = document.getElementById("planetData");
       expect(div.innerHTML).equal(`<p>Name: ${fakePlanet.name}</p> <p>Climate: ${fakePlanet.climate}</p>`);
       done();
     }, 0);
   })

   it("validates the number is between 1 and 60",() => {
     input.value = -1
     button.click()
     expect(div.innerText).equal("please enter a number between 1 and 60")
   })
  })

  describe("Find the droids", () => {
    let fake3PO = {name: 'Test 3PO name', height:'test 3PO height', mass:'test 3PO mass', homeworld: 'https://swapi.co/api/planets/1'}
    let fakeR2 = {name: 'Test R2 name', height:'test R2 height', mass:'test R2 mass', homeworld: 'https://swapi.co/api/planets/8'}
    let fakeTatooine = {name: 'Test Tatooine'}
    let fakeNaboo = {name: 'Fake Naboo'}

    let div3P0 = document.querySelector("#droid-2")
    let divR2 = document.querySelector("#droid-3")

    beforeEach(() => {
      window.fetch.callsFake((url) => {
        switch (url) {
          case "https://swapi.co/api/people/2":
            return Promise.resolve({json: () => Promise.resolve(fake3PO)})
            break;
          case "https://swapi.co/api/people/3":
            return Promise.resolve({json: () => Promise.resolve(fakeR2)})
            break;
          case "https://swapi.co/api/planets/1":
            debugger
            return Promise.resolve({json: () => Promise.resolve(fakeTatooine)})
            break;
          case "https://swapi.co/api/planets/8":
            return Promise.resolve({json: () => Promise.resolve(fakeNaboo)})
            break;
        }
      })
      getDroids()
    })

    afterEach
    it("Function 'getDroids' fetches the 2 droid's data from the correct urls", () => {
      expect(window.fetch).to.have.been.calledWith('https://swapi.co/api/people/2')
      expect(window.fetch).to.have.been.calledWith('https://swapi.co/api/people/3')
    })

    it("When the promise resolves, displays C-3PO's name, height, and mass in the correct spans", done => {
      setTimeout(() => {
        let nameC3P0 = document.querySelector('#droid-2-name')
        let heightC3PO = document.querySelector('#droid-2-height')
        let massC3PO = document.querySelector('#droid-2-mass')
        expect(nameC3P0.innerText).equal(fake3PO.name)
        expect(heightC3PO.innerText).equal(fake3PO.height)
        expect(massC3PO.innerText).equal(fake3PO.mass)
        done()
      }, 0)
    })

    it("When the promise resolves, displays R2-D2's name, height, and mass in the correct spans", done => {
      setTimeout(() => {
        let nameR2 = document.querySelector('#droid-3-name')
        let heightR2 = document.querySelector('#droid-3-height')
        let massR2 = document.querySelector('#droid-3-mass')
        expect(nameR2.innerText).equal(fakeR2.name)
        expect(heightR2.innerText).equal(fakeR2.height)
        expect(massR2.innerText).equal(fakeR2.mass)
        done()
      }, 0)
    })

    it("When 'Show Homeworld Details' is called for C-3PO, the correct fetch is made for his home planet", () => {
      let button = document.querySelector('#droid-2-btn')
      button.click()
      expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/planets/1")
    })

    it("When the promise resolves, it displays C-3POs home planet in the correct span", done => {
      setTimeout(() => {
        let span = document.querySelector('#droid-2-homeworld')
        expect(span.innerText).equal(fakeTatooine.name)
        done()
      }, 0)
    })

    it("When 'Show Homeworld Details' is called for R2-D2, the correct fetch is made for his home planet", () => {
      let button = document.querySelector('#droid-3-btn')
      button.click()
      expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/planets/8")
    })

    it("When the promise resolves, it displays R2-D2s home planet in the correct span", done => {
      setTimeout(() => {
        let span = document.querySelector('#droid-3-homeworld')
        expect(span.innerText).equal(fakeNaboo.name)
        done()
      }, 0)
    })
  })
});
