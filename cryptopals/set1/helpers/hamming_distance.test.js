#!/usr/bin/env node
const assert = require('assert')
const hammingDistance = require('./hamming_distance')

const input1 = 'this is a test'
const input2 = 'wokka wokka!!!'
const expected = 37
const output = hammingDistance({ encoding: 'utf8' })(input1)(input2)

assert.strictEqual(output, expected)
console.info('shiny')
