/* eslint-env mocha, es6 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/server');

chai.should();
chai.use(chaiHttp);
chai.use(require('chai-things'));

process.env.NODE_ENV = 'test';

const validId = 1234;
const validIdOfCarWithTwoDoors = 1235;
const invalidId = 'xxx';
const unknownId = -999;

describe('GM Vehicles API', () => {
  describe('GET /vehicles/:id', () => {
    it('should GET a single vehicle object by id', (done) => {
      const url = `/vehicles/${validId.toString()}`;
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
      const url = `/vehicles/${unknownId.toString()}`;
      chai.request(server)
        .get(url)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.empty;
          done();
        });
    });

    it('should return empty, when using an invalid id', (done) => {
      const url = `/vehicles/${invalidId.toString()}`;
      chai.request(server)
        .get(url)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.to.have.empty;
          done();
        });
    });
  });

  describe('GET /vehicles/:id/doors', () => {
    describe('vehicles with two doors', () => {
      it('should return array of size 2', (done) => {
        const url = `/vehicles/${validIdOfCarWithTwoDoors.toString()}/doors`;
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
        const url = `/vehicles/${validId.toString()}/doors`;
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
      const url = `/vehicles/${validIdOfCarWithTwoDoors.toString()}/doors`;
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
    const url = `/vehicles/${validIdOfCarWithTwoDoors.toString()}/fuel`;
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
    const url = `/vehicles/${validIdOfCarWithTwoDoors.toString()}/battery`;
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
      const url = `/vehicles/${validIdOfCarWithTwoDoors.toString()}/engine`;
      const data = { action: 'START' };
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
      const url = `/vehicles/${validId.toString()}/engine`;
      const data = { action: 'STOP' };
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
