#!/usr/bin/env node
const crypto = require('crypto')

const create_random_aes_key = () => crypto.randomBytes(16)
const add_random_bytes = message => {
	const five_to_ten = () => Math.floor(Math.random() * 6) + 5
	const before = crypto.randomBytes(five_to_ten())
	const after = crypto.randomBytes(five_to_ten())
	return Buffer.concat([before, message, after])
}

const encryption_oracle = plaintext => reveal => {
	const key = create_random_aes_key()
	const padded = add_random_bytes(plaintext)
	const mode = Math.floor(Math.random() * 2)
		? 'aes-128-cbc'
		: 'aes-128-ecb'
	reveal && console.info(mode)
	const iv = mode === 'aes-128-cbc'
		? create_random_aes_key()
		: Buffer.alloc(0)
	const cipher = crypto.createCipheriv(mode, key, iv)
	return Buffer.concat([cipher.update(padded), cipher.final()])
}

const detect_block_cipher_mode = ciphertext => {
	const block_size = 16
	const blocks = new Array(Math.ceil(ciphertext.length / block_size))
		.fill()
		.map((_, i) => ciphertext.slice(i * block_size, (i + 1) * block_size))
	return blocks
		.some((block, i) =>
			blocks
				.slice(i + 1)
				.some(b => b.equals(block))
		)
		? 'aes-128-ecb'
		: 'aes-128-cbc'
}

module.exports = {
	create_random_aes_key,
	add_random_bytes,
	encryption_oracle,
	detect_block_cipher_mode,
}
