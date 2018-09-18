const expect = chai.expect;

// TODO: Write tests!

describe('index.js', () => {
  describe('myVariable', () => {
    it('description of what the variable should contain', () => {
      expect(myVariable).to.eq(42);
    });
  });

  describe('myFunction()', () => {
    it("description of behavior when the function is invoked in a certain situation", () => {
      expect(myFunction(9001)).to.be.true;
    });

    it("description of behavior when the function is invoked in a different situation", () => {
      expect(myFunction(42)).to.be.false;
    });
  });
});
