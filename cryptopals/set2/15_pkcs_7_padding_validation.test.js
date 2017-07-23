#!/usr/bin/env node
const assert = require('assert')
const validate_pkcs_7_padding = require('./15_pkcs_7_padding_validation')

const valid = Buffer.from('ICE ICE BABY\x04\x04\x04\x04')
assert.ok(validate_pkcs_7_padding(16)(valid).equals(Buffer.from('ICE ICE BABY')))

const invalid_1 = Buffer.from('ICE ICE BABY\x05\x05\x05\x05')
assert.throws(() => validate_pkcs_7_padding(16)(invalid_1))

const invalid_2 = Buffer.from('ICE ICE BABY\x01\x02\x03\x04')
assert.throws(() => validate_pkcs_7_padding(16)(invalid_2))

console.info('15: shiny')
