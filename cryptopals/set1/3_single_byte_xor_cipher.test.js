#!/usr/bin/env node
const assert = require('assert')
const decipher_single_byte_xor = require('./3_single_byte_xor_cipher')

const input = new Buffer.from('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736', 'hex')
const expected = 'Cooking MC\'s like a pound of bacon'
const output = decipher_single_byte_xor(input).text

assert.strictEqual(output.toString('utf8'), expected)
console.info('3: shiny')
