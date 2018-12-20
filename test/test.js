const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/app.js');
const should = chai.should();
const errors = require('../server/routes/errors.js');
const User = require('../server/database/models/user.js').User;
const Search = require('../server/database/models/search.js').Search;
const fs = require('fs');
const request = require('supertest');

chai.use(chaiHttp);

const login = {
  userName: 'test',
  password: 'password'
}
const authUser = request.agent(server);
const newUser = {
  userName: 'test',
  password: 'password',
  email: 'test@test.com'
}
let userId;
let file;
let file2;
let newPic;
// testLat & testLng produces a latitude and longitude for search purposes
// that is roughly within the United States.
let testLat = Math.ceil((Math.random() * 1508 + 3140)) / 100;
let testLng = Math.ceil((Math.random() * 3586 + 8186)) * -1 / 100;
const update = {
  userName: '',
  originalPassword: '',
  newPassword: '',
  email: '',
  lat: '',
  lng: '',
  zoom: '10',
  imageURL: ''
}
const invalidUpdate = {
  userName: '',
  originalPassword: '',
  newPassword: '',
  email: '',
  lat: '75',
  lng: '-200',
  zoom: '20',
  imageURL: ''
}

describe('Errors Route', function() {
  describe('Registration Error', function() {
    const result = errors.registrationError();
    it('should return a status of 409', function() {
      result.status.should.equal('409');
    });
    it('should return a message', function() {
      result.message.should.equal('It looks like you already have an account set up with this username.');
    });
  });
  describe('Server Error', function() {
    const result = errors.serverError();
    it('should return a status of 500', function() {
      result.status.should.equal('500');
    });
    it('should return a message', function() {
      result.message.should.equal('Internal Server Error. Please try again at a later time.');
    });
  });
  describe('Login Error', function() {
    const result = errors.loginError();
    it('should return a status of 401', function() {
      result.status.should.equal('401');
    });
    it('should return a message', function() {
      result.message.should.equal('This username and/or password is invalid.');
    });
  });
  describe('Pic Error', function() {
    const result = errors.picError();
    it('should return a status of 400', function() {
      result.status.should.equal('400');
    });
    it('should return a message', function() {
      result.message.should.equal('Only .jpg & .png files can be uploaded.');
    });
  });
});

describe('API Routes', function() {
  describe('/users POST', function() {
    this.timeout(5000);
    beforeEach(function(done) {
      User.deleteMany({}, function() {
        done();
      });
    });
    afterEach(function(done) {
      User.deleteMany({}, function() {
        done();
      });
    });

    it('should return a status of 201 upon success', function(done) {
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .then(res => {
          res.should.have.status('201');
          done();
        });
    });
    it('should return an object with correct fields and hashed password', function(done) {
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .then(res => {
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.userName.should.equal('test');
          res.body.email.should.equal('test@test.com');
          res.body.password.should.have.lengthOf(60);
          res.body.userImageURL.should.equal('uploads/default.png');
          res.body.userCoordinates.lat.should.equal(38);
          res.body.userCoordinates.lng.should.equal(-97);
          res.body.userZoom.should.equal(5);
          done();
        });
    });
    it('should return an error when provided invalid username', function(done) {
      const newInvalidUser = {
        userName: 'a',
        password: 'password',
        email: 'test@test.com'
      }
      chai.request(server)
        .post('/api/v1/users')
        .send(newInvalidUser)
        .then((err, res) => {
          err.should.be.json;
          done();
        });
    });
    it('should return an error when provided invalid password', function(done) {
      const newInvalidUser = {
        userName: 'test',
        password: 'pass',
        email: 'test@test.com'
      }
      chai.request(server)
        .post('/api/v1/users')
        .send(newInvalidUser)
        .then((err, res) => {
          err.should.be.json;
          done();
        });
    });
    it('should return an error when provided invalid email', function(done) {
      const newInvalidUser = {
        userName: 'test',
        password: 'password',
        email: 'test@test'
      }
      chai.request(server)
        .post('/api/v1/users')
        .send(newInvalidUser)
        .then((err, res) => {
          err.should.be.json;
          done();
        });
    });
  });

  describe('/users/login POST', function() {
    this.timeout(10000);
    before(function(done) {
      chai.request(server)
        .post('/api/v1/users')
        .send(newUser)
        .then((err, res) => {
          done();
        });
    });
    it('should return an error when logging in with invalid credentials', function(done) {
      const invalidLogin = {
        userName: 'test',
        password: 'pass'
      }
      chai.request(server)
        .post('/api/v1/users/login')
        .send(invalidLogin)
        .then((err, res) => {
          err.should.be.json;
          done();
        });
    });
    it('should login a valid user with valid credentials', function(done) {
      authUser
        .post('/api/v1/users/login')
        .send(login)
        .then(res => {
          res.should.be.json;
          res.should.have.status('200');
          res.body.should.have.property('id');
          userId = res.body.id;
          done();
        });
    });
  });

  describe('/users/userpic POST', function() {
    this.timeout(10000);
    before(function(done) {
      fs.readFile('./uploads/default.png', (err, imageData) => {
        file = imageData;
      });
      fs.readFile('./uploads/giphy.gif', (err, imageData2) => {
        file2 = imageData2;
        done();
      })
    });
    after(function(done) {
      fs.unlink(newPic, (err) => {
        done();
      });
    });
    it('should save a new valid image', function(done) {
      authUser
        .post('/api/v1/users/userpic')
        .set('Content-Type', 'multipart/form-data')
        .attach('userImage', file, 'default.png')
        .then(res => {
          res.should.be.json;
          res.should.have.status('201');
          res.body.should.have.property('imageURL');
          newPic = res.body.imageURL;
          done();
        });
    });
    it('should return an error when saving an invalid image', function(done) {
      authUser
        .post('/api/v1/users/userpic')
        .set('Content-Type', 'multipart/form-data')
        .attach('userImage', file2, 'giphy.gif')
        .then((err, res) => {
          err.should.be.json;
          err.should.have.status('400');
          done();
        });
    });
  });

  describe('/users/:id PUT', function() {
    this.timeout(10000);
    it('should respond with a status of 200 when update succeeds', function(done) {
      authUser
        .put(`/api/v1/users/${userId}`)
        .send(update)
        .then(res => {
          res.should.be.json;
          res.should.have.status('200');
          res.body.should.have.property('success');
          res.body.success.should.equal('Green');
          done();
        });
    });
    it('should respond with no green success property when update is invalid', function(done) {
      authUser
        .put(`/api/v1/users/${userId}`)
        .send(invalidUpdate)
        .then((err, res) => {
          err.should.be.json;
          err.should.have.status('500');
          done();
        });
    });
  });

  describe('/users/:id/searches POST', function() {
    this.timeout(10000);
    it('should respond with status of 200 and correct properties with a valid search', function(done) {
      authUser
        .post(`/api/v1/users/${userId}/searches`)
        .send({lat: `${testLat}`, lng: `${testLng}`})
        .then(res => {
          res.should.be.json;
          res.should.have.status('200');
          res.body.should.have.property('user');
          res.body.should.have.property('postedOn');
          res.body.should.have.property('city');
          res.body.should.have.property('coordinates');
          res.body.should.have.property('weather');
          res.body.should.have.property('temperature');
          res.body.should.have.property('wind');
          res.body.should.have.property('gifURL');
          done();
        });
    });
  });

  describe('/users/:id/searches GET', function() {
    this.timeout(10000);
    after(function(done) {
      Search.deleteMany({}, function() {
        done();
      });
    });
    it('should respond with status of 200 and an array of searches', function(done) {
      authUser
        .get(`/api/v1/users/${userId}/searches`)
        .then(res => {
          res.should.be.json;
          res.should.have.status('200');
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/users/logout POST', function() {
    it('should respond with a status code of 200 if there is a user', function(done) {
      authUser
        .post('/api/v1/users/logout')
        .then(res => {
          res.should.be.json;
          res.should.have.status('200');
          done();
        });
    });
    it('should respond with an error if there is no user to logout', function(done) {
      authUser
        .post('/api/v1/users/logout')
        .then((err, res) => {
          err.should.be.json;
          done();
        });
    });
  });
});
