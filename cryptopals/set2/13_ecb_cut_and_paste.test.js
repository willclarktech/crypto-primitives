#!/usr/bin/env node
const assert = require('assert')
const {
	parse_key_value,
} = require('./13_ecb_cut_and_paste')

const input = 'foo=bar&baz=qux&zap=zazzle'
const parsed = parse_key_value(input)
const expected = {
	foo: 'bar',
	baz: 'qux',
	zap: 'zazzle',
}
assert.deepStrictEqual(parsed, expected)

console.info('13: shiny')
