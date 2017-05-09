#!/usr/bin/env node
const crypto = require('crypto')

const createRandomAesKey = () => crypto.randomBytes(16)
const addRandomBytes = message => {
	const fiveToTen = () => Math.floor(Math.random() * 6) + 5
	const before = crypto.randomBytes(fiveToTen())
	const after = crypto.randomBytes(fiveToTen())
	return Buffer.concat([before, message, after])
}

const encryption_oracle = plaintext => {
	const key = createRandomAesKey()

}

module.exports = {
	createRandomAesKey,
	addRandomBytes,
}
