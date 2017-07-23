#!/usr/bin/env node
const assert = require('assert')
const pkcs_7_pad = require('./9_pkcs_7_pad')

const block_length = 20

const message = Buffer.from('YELLOW SUBMARINE')
const output = pkcs_7_pad(block_length)(message)
const expected = Buffer.concat([message, Buffer.from(new Array(4).fill(4))])
assert.ok(output.equals(expected))

const longer_message = Buffer.from(new Array(32).fill('YELLOW SUBMARINE').join(' '))
const longer_output = pkcs_7_pad(block_length)(longer_message)
const longer_expected = Buffer.concat([longer_message, Buffer.alloc(17, 17)])
assert.ok(longer_output.equals(longer_expected))

console.info('9: shiny')
