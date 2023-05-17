
let mongoose = require("mongoose");
let movie = require('../models/movieModel');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('..');
let should = chai.should();


chai.use(chaiHttp);

describe('Movies', () => {
    beforeEach((done) => {
        Movie.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET movies', () => {
      it('it should GET all movies', (done) => {
        chai.request(server)
            .get('/movies')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST moview', () => {
      it('it should not add a movie without fields', (done) => {
          let movie = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954
          }
        chai.request(server)
            .post('/movies')
            .send(movie)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });
});