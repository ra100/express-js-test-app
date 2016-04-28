chai = require 'chai'
chaiAsPromised = require 'chai-as-promised'
chaiHttp = require 'chai-http'
fs = require 'fs'
app = require '../app/index.js'
file = require '../app/file.js'

chai.use chaiAsPromised
chai.use chaiHttp
chai.should()

before ->
  app.env = 'test'
  app.boot()

describe 'server', ->

  describe 'database', ->
    it 'increment value in database with no numeric value', ->
      return app.database.increment 'a'
        .should.eventually.throw.error

    it 'increment value in database', ->
      return app.database.increment 1
        .should.eventually.have.property 'name'

  describe 'file', ->
    it 'create file', ->
      return file.init '.tmp', 'test'
        .should.eventually.be.an 'array'

  describe 'request', ->
    it 'GET request', ->
      chai.request app.app
      .get '/track'
      .query {data: 'get test', count: 1}
      .then (res) ->
        res.should.have.status 200

    it 'POST request', ->
      chai.request app.app
      .get '/track'
      .query {data: 'post test', count: 1}
      .then (res) ->
        res.should.have.status 200

    it '404 request', ->
      chai.request app.app
      .get '/test'
      .catch (err) ->
        err.should.be.error

after ->
  app.shutdown()
  fs.unlink '.tmp/test'
