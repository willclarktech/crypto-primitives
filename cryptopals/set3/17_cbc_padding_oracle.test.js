#!/usr/bin/env node
const assert = require('assert')
const {
	SECRET_STRINGS,
	encrypt,
	has_valid_padding,
	decrypt,
} = require('./17_cbc_padding_oracle')

const test_encrypt_and_validate_functions = () => {
	const { iv, ciphertext } = encrypt()
	const validated = has_valid_padding(iv)(ciphertext)
	assert.strictEqual(validated, true)
}

const test_decrypt_function = () => {
	for (let i = 0; i < 30; ++i) {
		const encrypted = encrypt()
		const decrypted = decrypt(encrypted)
	}
	//assert.strictEqual(SECRET_STRINGS.includes(decrypted.toString('base64')), true)
}

test_encrypt_and_validate_functions()
//test_decrypt_function()
