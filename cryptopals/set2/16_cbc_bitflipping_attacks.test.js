#!/usr/bin/env node
const assert = require('assert')
const {
	encrypt_cbc_with_padding,
	find_admin,
} = require('./16_cbc_bitflipping_attacks')

const encrypted = encrypt_cbc_with_padding('some text;admin=true;that goes over 16 characters')
assert.ok(encrypted)
assert.strictEqual(find_admin(encrypted), false)

console.info('16: shiny')
