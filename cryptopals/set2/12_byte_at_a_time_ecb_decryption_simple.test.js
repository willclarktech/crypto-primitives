#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const {
	encryption_oracle,
	get_block_size,
} = require('./12_byte_at_a_time_ecb_decryption_simple')

const unknown = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'base64')
const oracle_function = encryption_oracle(unknown)

const block_size = get_block_size(oracle_function)
assert.strictEqual(block_size, 16)

console.info('12: shiny')
