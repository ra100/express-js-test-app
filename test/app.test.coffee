chai = require 'chai'
chai.should()

describe 'express', ->

  describe '#dummy()', ->
    it 'dummy test', ->
      test = 'test'
      test.should.be.an 'string'
