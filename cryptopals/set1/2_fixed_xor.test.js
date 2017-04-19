#!/usr/bin/env node
const assert = require('assert')
const fixedXor = require('./2_fixed_xor')

const input1 = new Buffer.from('1c0111001f010100061a024b53535009181c', 'hex')
const input2 = new Buffer.from('686974207468652062756c6c277320657965', 'hex')
const expected = '746865206b696420646f6e277420706c6179'
const output = fixedXor(input1)(input2)

assert.strictEqual(output.toString('hex'), expected)
console.info('shiny')
