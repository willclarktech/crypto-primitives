#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const {
	create_random_aes_key,
	add_random_bytes,
	encryption_oracle,
	detect_block_cipher_mode,
} = require('./11_ecb_cbc_detection_oracle')

assert.strictEqual(create_random_aes_key().length, 16)

const add_random_bytes_result = add_random_bytes(Buffer.from('YELLOW SUBMARINE'))
assert.ok(add_random_bytes_result.length >= 26 && add_random_bytes_result.length <= 36)

const message = fs.readFileSync('./test-data/10.txt')
const encryption_oracle_result = encryption_oracle(message)(true)
assert.strictEqual(encryption_oracle_result.equals(message), false)

const detect_block_cipher_modeResult = detect_block_cipher_mode(encryption_oracle_result)
console.info(detect_block_cipher_modeResult, '<== this should match the result above')
assert.ok(['aes-128-ecb', 'aes-128-cbc'].includes(detect_block_cipher_modeResult))

console.info('11: shiny')
