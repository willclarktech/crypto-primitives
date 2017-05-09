#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const {
	createRandomAesKey,
	addRandomBytes,
	encryption_oracle,
	detectBlockCipherMode,
} = require('./11_ecb_cbc_detection_oracle')

assert.strictEqual(createRandomAesKey().length, 16)

const addRandomBytesResult = addRandomBytes(Buffer.from('YELLOW SUBMARINE'))
assert.ok(addRandomBytesResult.length >= 26 && addRandomBytesResult.length <= 36)

const message = fs.readFileSync('./test-data/10.txt')
const encryptionOracleResult = encryption_oracle(message)(true)
assert.strictEqual(encryptionOracleResult.equals(message), false)

const detectBlockCipherModeResult = detectBlockCipherMode(encryptionOracleResult)
console.log(detectBlockCipherModeResult, '<== this should match the result above')
assert.ok(['aes-128-ecb', 'aes-128-cbc'].includes(detectBlockCipherModeResult))

console.info('11: shiny')
