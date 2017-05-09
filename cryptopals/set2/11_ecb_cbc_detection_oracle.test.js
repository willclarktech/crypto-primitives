#!/usr/bin/env node
const assert = require('assert')
const {
	createRandomAesKey,
} = require('./11_ecb_cbc_detection_oracle')

assert.strictEqual(createRandomAesKey().length, 16)

console.info('11: shiny')
