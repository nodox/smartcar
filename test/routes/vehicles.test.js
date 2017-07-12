//Require the dev-dependencies
process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server/server');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;


chai.use(chaiHttp);
chai.use(require('chai-things'));


describe('GM Vehicles API', () => {

  /**
   * Test the /GET route
   */
  describe('GET /vehicles/:id', () => {
    it('should GET a single vehicle object by id', (done) => {
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

    it('should return empty, when using an unknown id', (done) => {
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
  
    it('should return empty, when using an invalid id', (done) => {
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

    describe('vehicles with two doors', () => {
      it('should return array of size 2', (done) => {
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

    });

    describe('vehicles with four doors', () => {

      it('should return array of size 4', (done) => {
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
    let id = 1235;
    let url = '/vehicles/' + id.toString() + '/fuel';

    it('should return the fuel level', (done) => {
      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('percent').that.is.a('number');
          done();
        });
    });



  });


  describe('GET /vehicles/:id/battery', () => {
    let id = 1235;
    let url = '/vehicles/' + id.toString() + '/battery';

    it('should return the battery level', (done) => {
      chai.request(server)
        .get(url)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('percent').that.is.a('number');
          done();
        });
    });


  });

  describe('POST /vehicles/:id/engine', () => {


    describe('START action', () => {

      let id = 1235;
      let url = '/vehicles/' + id.toString() + '/engine';
      let data = { action: 'START'};

      it('should return status', (done) => {
        chai.request(server)
          .post(url)
          .send(data)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status');
            done();
          });
      });
    });



    describe('STOP action', () => {

      let id = 1234;
      let url = '/vehicles/' + id.toString() + '/engine';
      let data = { action: 'STOP'};

      it('should return status', (done) => {
        chai.request(server)
          .post(url)
          .send(data)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status');
            done();
          });
      });
    });


  });


});