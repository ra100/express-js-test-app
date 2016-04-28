chai = require 'chai'
chaiAsPromised = require 'chai-as-promised';
app = require '../app/index.js'

chai.use chaiAsPromised;
chai.should()

before ->
  app.boot()

describe 'server', ->

  describe 'database', ->
    it 'increment value in database with no numeric value', ->
      return app.database.increment 'a'
        .should.eventually.throw.error

    it 'increment value in database', ->
      return app.database.increment 1
        .should.eventually.have.property 'name'

after ->
  app.shutdown()
