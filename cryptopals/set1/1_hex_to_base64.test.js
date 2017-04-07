#!/usr/bin/env node
const assert = require('assert')
const hexToBase64 = require('./1_hex_to_base64')

const input = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
const expected = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
const output = hexToBase64(input)

assert.strictEqual(output, expected)
console.info('shiny')

