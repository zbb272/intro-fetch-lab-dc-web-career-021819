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

    it("on submit of the planet form, calls the getPlanet function", () => {

    })

    it("On submit of the planet form, fetch that planet's data from the correct url", () => {
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
    let fake3PO = {name: 'Test 3PO', height:'test 3PO height', mass:'test 3PO mass', homeworld: 'https://swapi.co/api/planets/1'}
    let fakeR2 = {name: 'Test R2', height:'test R2 height', mass:'test R2 mass', homeworld: 'https://swapi.co/api/planets/8'}
    let fakeTatooine = {name: 'Test Tatooine'}
    let fakeNaboo = {name: 'Fake Naboo'}

    let div3P0 = document.querySelector("#droid-2")
    let divR2 = document.querySelector("#droid-3")

    beforeEach(() => {
      window.fetch.withArgs("https://swapi.co/api/people/2").returns(Promise.resolve({json: () => Promise.resolve(fake3PO)}))
      window.fetch.withArgs("https://swapi.co/api/people/3").returns(Promise.resolve({json: () => Promise.resolve(fakeR2)}))
      window.fetch.withArgs("https://swapi.co/api/planets/1").returns(Promise.resolve({json: () => Promise.resolve(fakeTatooine)}))
      window.fetch.withArgs("https://swapi.co/api/planets/8").returns(Promise.resolve({json: () => Promise.resolve(fakeNaboo)}))
      getDroids()
    })

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


//
//       beforeEach(() => {
//         window.fetch.withArgs("https://swapi.co/api/people/2").returns(Promise.resolve({ json: () => Promise.resolve(fake3PO) }))
//         window.fetch.withArgs("https://swapi.co/api/people/3").returns(Promise.resolve({ json: () => Promise.resolve(fakeR2) }))
//         window.fetch.withArgs("https://swapi.co/api/planets/1/").returns(Promise.resolve({ json: () => Promise.resolve(fakeTatooine) }))
//         window.fetch.withArgs("https://swapi.co/api/planets/8/").returns(Promise.resolve({ json: () => Promise.resolve(fakeNaboo) }))
//       })
//       it("When the page loads, fetch the data for the characters", () => {
//         console.log("inside droid it block, about to test setTimeout");
//         setTimeout(()=>{
//           console.log('about to test fetches');
//           expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/people/2");
//           expect(window.fetch).to.have.been.calledWith("https://swapi.co/api/people/3");
//           done();
//         }, 0)
//       });
//
//       it("When the promise resolves, display each droid's name, height, and mass on the screen in the appropriate divs", () => {
//         expect(myFunction(42)).to.be.false;
//       });
//
//       it("When the promise resolves, each droid div should have a button to 'Show Homeworld Details'", () => {
//         expect(myFunction(42)).to.be.false;
//       });
//
//       it('When the user clicks the button "Show Homeworld Details" for either droid, you should fetch the homeworld planet data from the correct URL', () => {
//         expect(myVariable).to.eq(42);
//       });
//
//       it("When the promise resolves, each droid's div should display the homeworld name in a span", () => {
//         expect(myFunction(42)).to.be.false;
//       });
//     });
//   });
//
//
//
//
//   describe("numbers.js", () => {
//     // beforeEach(() => {
//     //   console.log('before stub');
//     //   sinon.stub(window, "fetch");
//     // });
//     //
//     // afterEach(() => {
//     //   window.fetch.restore();
//     //   console.log('after stub restored');
//     // });
//
//     describe("Number One", () => {
//       let fakeData = 'test fact about the number 1'
//
//       beforeEach(() => {
//         window.fetch.callsFake(() =>
//           Promise.resolve({ text: () => Promise.resolve(fakeData) })
//         );
//         const button = document.querySelector("#number-one");
//         button.click();
//       });
//
//       it("When a user clicks on the button 'Facts About 1', fetch a random fact about the number 1", () => {
//         expect(window.fetch).to.have.been.calledWith(`http://numbersapi.com/1/trivia`);
//       });
//
//       it("When the promise is resolved, a random fact about the number 1 should be displayed in the `#one-facts` div", (done) => {
//         setTimeout(() => {
//           const div = document.querySelector('#one-facts');
//           expect(div.innerText).equal(fakeData)
//           //reset values
//           div.innerText = ''
//           done();
//         }, 0)
//       });
//     });
//
//     describe("Pick a Number", () => {
//       const div = document.querySelector('#random-math-fact');
//       const input = document.querySelector('#pick-a-number');
//       const event = new Event('input');
//
//       const fakeData = 'test random math fact';
//
//       beforeEach(() => {
//         window.fetch.callsFake(() =>
//           Promise.resolve({ text: () => Promise.resolve(fakeData) })
//         );
//       })
//
//       it("On change of the number input, fetch a math fact about that number", () => {
//         input.value = 4;
//         input.dispatchEvent(event);
//         input.value = ''
//
//         expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/4/trivia");
//       });
//       it("When the promise is resolved, show the math fact on the screen in the `#random-math-fact` div", (done) => {
//         setTimeout(() => {
//           expect(div.innerText).equal(fakeData);
//           done();
//         }, 0)
//       });
//       it("Validates that the input is a number", () => {
//         input.value = "test";
//         input.dispatchEvent(event);
//
//         expect(div.innerText).equal('please enter a valid number');
//         //reset values
//         input.value = ''
//         div.innerText = ''
//       });
//     });
//     // we aren't quite sure how to do this?
//     describe("Those who fail to study history", () => {
//       const div = document.getElementById('year-history');
//       let fakeData = 'test fact about a year'
//
//       // beforeEach(() => {
//       //   console.log('before callsFake');
//       //   window.fetch.callsFake(() =>
//       //     Promise.resolve({ text: () => Promise.resolve(fakeData) })
//       //   );
//       // });
//
//       it("When the page loads, fetch a fact about this year", (done) => {
//         const year = new Date().getFullYear();
//         // console.log('about to test fetch');
//         setTimeout(()=>{
//           // console.log('testing fetch');
//           expect(window.fetch).to.have.been.calledWith(`http://numbersapi.com/${year}/year`);
//           done();
//         }, 0)
//       });
//
//       it("When the promise is resolved, the fact should be displayed in the `#year-history` div", (done) => {
//         console.log('before testing div innerText');
//         setTimeout(()=> {
//           console.log('after testing div innerText');
//           expect(div.innerText).equal(fakeData);
//           done();
//         }, 0)
//       });
//
//       // how do we test setInterval callback functions?
//       it("Every five seconds, the previous year`s fact should be fetched", done => {
//         console.log("about to test setInterval");
//         setTimeout(() => {
//           console.log("testing setInterval");
//           expect(window.setInterval).to.have.been.calledWith(sinon.match.func, 5000)
//           let every5SecsFn = window.setInterval.getCall(0).args[0]
//           expect(every5SecsFn).to.change(window.fetch, 'callCount').by(1);
//           done();
//         }, 0)
//
//       });
//     });
//
//     describe("All the Numbers", () => {
//       let button = document.querySelector('#all-numbers-button')
//       let div = document.querySelector('#all-the-numbers')
//       let fakeData = {"one": "test fact 1", two: "test fact 2"}
//
//       beforeEach(() => {
//         window.fetch.callsFake(() =>
//           Promise.resolve({ json: () => Promise.resolve(fakeData) })
//         );
//         button.click();
//       });
//
//       it("When a user clicks the button, fetch facts for one hundred random numbers", () => {
//         expect(window.fetch).to.have.been.calledWith("http://numbersapi.com/1..100")
//       });
//       it("When the promise is resolved, all facts should be displayed in the `#all-the-numbers` div", done => {
//         setTimeout(() => {
//           let div = document.querySelector('#all-the-numbers');
//           expect(div.innerHTML).equal(`<ul><li>test fact 1</li><li>test fact 2</li></ul>`);
//           done();
//         }, 0)
//       });
//     });
//   });
// })
