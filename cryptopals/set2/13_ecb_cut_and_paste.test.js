#!/usr/bin/env node
const assert = require('assert')
const {
	parse_key_value,
	create_user,
  profile_for,
} = require('./13_ecb_cut_and_paste')

const test_parse_key_value = () => {
	const input = 'foo=bar&baz=qux&zap=zazzle'
	const parsed = parse_key_value(input)
	const expected = {
		foo: 'bar',
		baz: 'qux',
		zap: 'zazzle',
	}
	assert.deepStrictEqual(parsed, expected)
}

const test_create_user = () => {
	const normal_input = 'foo@bar.com'
	const normal_output = create_user(normal_input)
	assert.strictEqual(normal_output.email, normal_input)
	assert.ok(typeof normal_output.uid === 'number')
	assert.strictEqual(normal_output.role, 'user')

	const sneaky_input = 'foo@bar.com&role=admin'
	const sneaky_output = create_user(sneaky_input)
	assert.strictEqual(sneaky_output.email, 'foo@bar.comroleadmin')
	assert.strictEqual(sneaky_output.role, 'user')
}

const test_profile_for = () => {
  const input = 'foo@bar.com'
  const output = profile_for(input)
  assert.ok(output.match(/^email=foo@bar.com&uid=[\d]+&role=user$/))
}

test_parse_key_value()
test_create_user()
test_profile_for()

console.info('13: shiny')
