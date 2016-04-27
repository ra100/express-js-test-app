chai = require 'chai'
chai.should()
app = require '../app/index.js'

before ->
  app.boot()

describe 'server', ->

  describe '#dummy()', ->
    it 'dummy test', ->
      test = 'test'
      test.should.be.an 'string'

  describe 'database', ->
    it 'increment value in database with no numeric value', ->
      app.database.increment 'a', (log) ->
        log.should.be.a 'string'

    it 'increment value in database', ->
      app.database.increment 10, (log) ->
        log.should.be.an 'object'

after ->
  app.shutdown()
