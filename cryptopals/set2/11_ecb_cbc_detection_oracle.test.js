#!/usr/bin/env node
const assert = require('assert')
const {
	createRandomAesKey,
	addRandomBytes,
} = require('./11_ecb_cbc_detection_oracle')

assert.strictEqual(createRandomAesKey().length, 16)

const addRandomBytesResult = addRandomBytes(Buffer.from('YELLOW SUBMARINE'))
assert.ok(addRandomBytesResult.length >= 26 && addRandomBytesResult.length <= 36)

console.info('11: shiny')
