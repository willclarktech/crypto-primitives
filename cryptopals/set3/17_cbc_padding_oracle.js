const crypto= require('crypto')
const {
	encrypt_cbc_mode,
	decrypt_cbc_mode,
	decrypt_cbc_mode_raw,
} = require('../set2/10_cbc_mode')

const BLOCK_SIZE = 16
const SECRET_STRINGS = [
	'MDAwMDAwTm93IHRoYXQgdGhlIHBhcnR5IGlzIGp1bXBpbmc=',
	'MDAwMDAxV2l0aCB0aGUgYmFzcyBraWNrZWQgaW4gYW5kIHRoZSBWZWdhJ3MgYXJlIHB1bXBpbic=',
	'MDAwMDAyUXVpY2sgdG8gdGhlIHBvaW50LCB0byB0aGUgcG9pbnQsIG5vIGZha2luZw==',
	'MDAwMDAzQ29va2luZyBNQydzIGxpa2UgYSBwb3VuZCBvZiBiYWNvbg==',
	'MDAwMDA0QnVybmluZyAnZW0sIGlmIHlvdSBhaW4ndCBxdWljayBhbmQgbmltYmxl',
	'MDAwMDA1SSBnbyBjcmF6eSB3aGVuIEkgaGVhciBhIGN5bWJhbA==',
	'MDAwMDA2QW5kIGEgaGlnaCBoYXQgd2l0aCBhIHNvdXBlZCB1cCB0ZW1wbw==',
	'MDAwMDA3SSdtIG9uIGEgcm9sbCwgaXQncyB0aW1lIHRvIGdvIHNvbG8=',
	'MDAwMDA4b2xsaW4nIGluIG15IGZpdmUgcG9pbnQgb2g=',
	'MDAwMDA5aXRoIG15IHJhZy10b3AgZG93biBzbyBteSBoYWlyIGNhbiBibG93',
]
const secret_buffers = SECRET_STRINGS.map(s => Buffer.from(s, 'base64'))
const final_second_blocks = secret_buffers.map(b => b[31])
console.log(final_second_blocks)

const key = crypto.randomBytes(16)

const encrypt = () => {
	const secret_string = SECRET_STRINGS[Math.floor(Math.random() * SECRET_STRINGS.length)]
	const plaintext = Buffer.from(secret_string, 'base64')
	const iv = crypto.randomBytes(16)
	const ciphertext = encrypt_cbc_mode(key)(iv)(plaintext)
	return {
		iv,
		ciphertext,
	}
}

const has_valid_padding = iv => ciphertext => {
	const decrypted = decrypt_cbc_mode_raw(key)(iv)(ciphertext)
	const last_byte = decrypted[decrypted.length - 1]
	const padding_is_valid = decrypted
		.slice(decrypted.length - last_byte)
		.every(byte => byte === last_byte)
	console.log(decrypted.slice(decrypted.length - last_byte))
	return padding_is_valid
}

const get_last_byte_with_validation = validate => ([first_block, second_block]) => {
	for (let i = 0; i < 256; ++i) {
		const last_byte = first_block[BLOCK_SIZE - 1] ^ i ^ 1
		const block_0 = Buffer.concat([first_block.slice(0, 15), Buffer.from([last_byte])])
		const attempt = Buffer.concat([block_0, second_block])
		const valid = validate(attempt)
		if (valid) {
			return i ^ first_block[BLOCK_SIZE - 1]
		}
	}
	throw new Error('Could not find valid last byte.')
}

const decrypt = ({ iv, ciphertext }) => {
	const validate = has_valid_padding(iv)
	const blocks = new Array(ciphertext.length / BLOCK_SIZE)
		.fill()
		.map((_, i) => {
			const start_index = i * BLOCK_SIZE
			return ciphertext.slice(start_index, start_index + BLOCK_SIZE)
		})

	const last_byte = get_last_byte_with_validation(validate)(blocks.slice(0, 2))
	console.log(last_byte, Buffer.from([last_byte]).toString(), final_second_blocks.includes(last_byte))

	return Buffer.from('hello you')
}

module.exports = {
	SECRET_STRINGS,
	encrypt,
	has_valid_padding,
	decrypt,
}
