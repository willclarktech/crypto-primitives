#!/usr/bin/env node
const assert = require('assert')
const decipherSingleByteXor = require('./3_single_byte_xor_cipher')

const input = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
const expected = 'Cooking MC\'s like a pound of bacon'
const output = decipherSingleByteXor(input)

assert.equal(output, expected)
console.info('shiny')

