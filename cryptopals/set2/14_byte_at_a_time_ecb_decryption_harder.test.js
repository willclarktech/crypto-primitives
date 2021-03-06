#!/usr/bin/env node
const assert = require('assert')
const {
	encryption_oracle,
	get_first_byte,
	decrypt_ecb,
} = require('./14_byte_at_a_time_ecb_decryption_harder')

const block_size = 16
const unknown = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'base64')
const oracle_function = encryption_oracle(unknown)

const first_byte = get_first_byte(oracle_function)
assert.strictEqual(first_byte, unknown[0])

const plaintext = decrypt_ecb(oracle_function)(block_size)
assert.ok(plaintext.slice(0, unknown.length).equals(unknown))

console.info('14: shiny')
