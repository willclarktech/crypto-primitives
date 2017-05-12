#!/usr/bin/env node
const assert = require('assert')
const {
	parse_key_value,
	create_user,
  profile_for,
  profile_for_ecb,
  decrypt_user,
} = require('./13_ecb_cut_and_paste')

const email_input = 'foo@bar.com'

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
	const normal_output = create_user(email_input)
	assert.strictEqual(normal_output.email, email_input)
	assert.ok(typeof normal_output.uid === 'number')
	assert.strictEqual(normal_output.role, 'user')

	const sneaky_input = `${email_input}&role=admin`
	const sneaky_output = create_user(sneaky_input)
	assert.strictEqual(sneaky_output.email, 'foo@bar.comroleadmin')
	assert.strictEqual(sneaky_output.role, 'user')
}

const test_profile_for = () => {
  const output = profile_for(email_input)
  assert.ok(output.match(/^email=foo@bar.com&uid=[\d]+&role=user$/))
}

const test_profile_for_ecb = () => {
  const plain = Buffer.from(profile_for(email_input))
  const output = profile_for_ecb(email_input)
  assert.ok(!output.equals(plain))
}

const test_decrypt_user = () => {
  const encrypted = profile_for_ecb(email_input)
  const output = decrypt_user(encrypted)
  console.log(output)
  assert.strictEqual(output.email, email_input)
  assert.strictEqual(output.role, 'user')
}

test_parse_key_value()
test_create_user()
test_profile_for()
test_profile_for_ecb()
test_decrypt_user()

console.info('13: shiny')
