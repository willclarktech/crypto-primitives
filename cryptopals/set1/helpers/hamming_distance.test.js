#!/usr/bin/env node
const assert = require('assert')
const hamming_distance = require('./hamming_distance')

const input_1 = 'this is a test'
const input_2 = 'wokka wokka!!!'
const expected = 37
const output = hamming_distance({ encoding: 'utf8' })(input_1)(input_2)

assert.strictEqual(output, expected)
console.info('shiny')
