#!/usr/bin/env node
const assert = require('assert')
const pkcs_7_pad = require('./9_pkcs_7_pad')

const message = Buffer.from('YELLOW SUBMARINE')
const block_length = 20
const output = pkcs_7_pad(block_length)(message)
const expected = Buffer.concat([message, Buffer.from(new Array(4).fill(4))])

assert.ok(output.equals(expected))
console.info('9: shiny')
