#!/usr/bin/env node
const crypto = require('crypto')

const createRandomAesKey = () => crypto.randomBytes(16)
const addRandomBytes = message => {
	const fiveToTen = () => Math.floor(Math.random() * 6) + 5
	const before = crypto.randomBytes(fiveToTen())
	const after = crypto.randomBytes(fiveToTen())
	return Buffer.concat([before, message, after])
}

const encryption_oracle = plaintext => reveal => {
	const key = createRandomAesKey()
	const padded = addRandomBytes(plaintext)
	const mode = Math.floor(Math.random() * 2)
		? 'aes-128-cbc'
		: 'aes-128-ecb'
	reveal && console.info(mode)
	const iv = mode === 'aes-128-cbc'
		? createRandomAesKey()
		: Buffer.alloc(0)
	const cipher = crypto.createCipheriv(mode, key, iv)
	return Buffer.concat([cipher.update(padded), cipher.final()])
}

const detectBlockCipherMode = ciphertext => {
	const blockSize = 16
	const blocks = new Array(Math.ceil(ciphertext.length / blockSize))
		.fill()
		.map((_, i) => ciphertext.slice(i * blockSize, (i + 1) * blockSize))
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
	createRandomAesKey,
	addRandomBytes,
	encryption_oracle,
	detectBlockCipherMode,
}
