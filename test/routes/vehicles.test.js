//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server/server');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;


chai.use(chaiHttp);
chai.use(require('chai-things'));


describe('Vehicles', () => {

  /**
   * Test the /GET route
   */
  describe('GET /vehicles/:id', () => {
    it('should GET a vehicle by id, when using a valid id', (done) => {
      let id = 1234;
      let url = '/vehicles/' + id.toString();
      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('vin');
            res.body.should.have.property('color');
            res.body.should.have.property('doorCount');
            res.body.should.have.property('driveTrain');
          done();
        });
    });

    it('should return error, when using an unknown id', (done) => {
      let unknownId = -999;
      let url = '/vehicles/' + unknownId.toString();
      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.empty;
          done();
        });
    });
  
    it('should return error, when using an invalid id', (done) => {
      let invalidId = "xxx";
      let url = '/vehicles/' + invalidId.toString();
      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.empty;
          done();
        });
    });

  });


  describe('GET /vehicles/:id/doors', () => {

    it('should return array of size 2 for two door coupes', (done) => {
      let id = 1235;
      let url = '/vehicles/' + id.toString() +'/doors';

      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array').that.has.lengthOf(2);

          done();
        });
    });

    it('should return array of size 4 for four door sedans', (done) => {
      let id = 1234;
      let url = '/vehicles/' + id.toString() +'/doors';

      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array').that.has.lengthOf(4);
          done();
        });
    });

    it('should return an array of doors with locked and location values', (done) => {
      let id = 1235;
      let url = '/vehicles/' + id.toString() +'/doors';

      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.should.all.have.property('locked');
            res.body.should.all.have.property('location');
          done();
        });
    });


  });


  describe('GET /vehicles/:id/fuel', () => {
    xit('should GET all the books', (done) => {
      chai.request(server)
        .get('//vehicles/:id/fuel')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  });


  describe('GET /vehicles/:id/battery', () => {
    xit('should GET all the books', (done) => {
      chai.request(server)
        .post('/book')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  });

  describe('POST /vehicles/:id/engine', () => {
    xit('should GET all the books', (done) => {
      chai.request(server)
        .post('/book')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
    });
  });

});