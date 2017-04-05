#!/usr/bin/env node
const assert = require('assert')
const fixedXor = require('./2_fixed_xor')

const input1 = '1c0111001f010100061a024b53535009181c'
const input2 = '686974207468652062756c6c277320657965'
const expected = '746865206b696420646f6e277420706c6179'
const output = fixedXor([input1, input2])

assert.equal(output, expected)
console.info('shiny')

