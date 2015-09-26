var HashModel = require('../../../api/models/HashModel')
var request = require('supertest')
var chai = require("chai")
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should

describe('Request hash', function () { 
	it('should get a hash string', function (done) {
		var result = HashModel.getRandomHash(5)
		expect(result).to.be.a('string')
		done()
	}),
	it('should get error if size is < 0', function (done) {
		try {
			var result = HashModel.getRandomHash(-5)
		} catch(err) {
			done()
		}
	}),
	it('should get true if hash exists', function (done) { 
		var redis = require('redis')
	    var redisClient = redis.createClient(sails.config.redis.port, sails.config.redis.host)
	    redisClient.auth(sails.config.redis.password)

		redisClient.set('tje23', 1)
		var result = HashModel.checkHash('tje23', function (result) {
			expect(result).to.be.true
			done()
		})
	}),
	it('should get false if hash not exists', function (done) { 
		var result = HashModel.checkHash('aaaaa', function (result) {
			expect(result).to.be.false
			done()
		})
	})
})