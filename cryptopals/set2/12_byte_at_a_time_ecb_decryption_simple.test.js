#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const {
	encryption_oracle,
	get_block_size,
	detect_ecb,
	get_first_byte,
} = require('./12_byte_at_a_time_ecb_decryption_simple')

const unknown = Buffer.from('Um9sbGluJyBpbiBteSA1LjAKV2l0aCBteSByYWctdG9wIGRvd24gc28gbXkgaGFpciBjYW4gYmxvdwpUaGUgZ2lybGllcyBvbiBzdGFuZGJ5IHdhdmluZyBqdXN0IHRvIHNheSBoaQpEaWQgeW91IHN0b3A/IE5vLCBJIGp1c3QgZHJvdmUgYnkK', 'base64')
const oracle_function = encryption_oracle(unknown)

const block_size = get_block_size(oracle_function)
assert.strictEqual(block_size, 16)

const is_ecb = detect_ecb(oracle_function)(block_size)
assert.ok(is_ecb)

const first_byte = get_first_byte(oracle_function)(block_size)
console.log('first byte of cipher text:', first_byte)

console.info('12: shiny')
