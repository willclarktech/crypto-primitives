#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const detectSingleCharacterXor = require('./4_detect_single_character_xor')

const file = fs.readFileSync('./challenge-data/4.txt')
const input = file.toString().split('\n')
const expected = 'Now that the party is jumping\n'
const output = detectSingleCharacterXor(input)

assert.equal(output, expected)
console.info('shiny')

