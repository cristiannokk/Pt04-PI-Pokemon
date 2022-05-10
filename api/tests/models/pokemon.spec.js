const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
//   describe('Validators', () => {
//     beforeEach(() => Pokemon.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Pokemon.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Pokemon.create({ name: 'Pikachu' });
//       });
//     });
//   });
// });

describe('Validacion numero', () => {
  beforeEach(() => Pokemon.sync({ force: true }));
  describe('number', () => {
    it('should throw an error if healthPoints is not a number', (done) => {
      Pokemon.create({})
      .then(() => done(new Error('It requires a number')))
      .catch(() => done());
    });
    it('should work when its a valid number', () => {
      Pokemon.create({  hp: 45 });
    });
  });
});

describe('Validacion POST', function () {
  it('missing data from the body', function(done) {
     Pokemon.create({
      content: 'Hello',
     })
      .then(() => done('should not have been created'))
      .catch(() => done());
    });
  });
});