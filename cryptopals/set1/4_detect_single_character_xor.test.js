#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const detectSingleCharacterXor = require('./4_detect_single_character_xor')

const file = fs.readFileSync('./challenge-data/4.txt')
const lines = file.toString().split('\n')
const input = lines.map(l => Buffer.from(l, 'hex'))
const expected = 'Now that the party is jumping\n'
const output = detectSingleCharacterXor(input)

assert.strictEqual(output.toString('utf8'), expected)
console.info('4: shiny')
