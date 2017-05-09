#!/usr/bin/env node
const assert = require('assert')
const repeating_key_xor = require('./5_implement_repeating_key_xor')

const key = new Buffer.from('ICE', 'utf8')
const input = new Buffer.from('Burning \'em, if you ain\'t quick and nimble\nI go crazy when I hear a cymbal', 'utf8')
const expected = '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
const output = repeating_key_xor(key)(input)

assert.strictEqual(output.toString('hex'), expected)
console.info('5: shiny')
