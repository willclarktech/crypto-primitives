#!/usr/bin/env node
const crypto = require('crypto')

const createRandomAesKey = () => crypto.randomBytes(16)

module.exports = {
	createRandomAesKey,
}
