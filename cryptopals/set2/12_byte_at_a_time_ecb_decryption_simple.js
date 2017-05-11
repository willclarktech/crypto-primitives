#!/usr/bin/env node
const fs = require('fs')
const crypto = require('crypto')
const { add_random_bytes } = require('./11_ecb_cbc_detection_oracle')

const encryption_oracle = unknown => known => {
	const key = Buffer.from(fs.readFileSync('./test-data/key_hex.txt', 'utf8'), 'hex')
	const padded = add_random_bytes(unknown)
	const plaintext = Buffer.concat([known, padded])
	const iv = Buffer.alloc(0)
	const cipher = crypto.createCipher('aes-128-ecb', key, iv)
	return Buffer.concat([cipher.update(plaintext), cipher.final()])
}

const get_block_size = oracle_function => {
	const max_block_size = 24
	return new Array(max_block_size)
		.fill()
		.map((_, i) => i + 1)
		.reduce(({ previous_block, result }, i) => {
			if (result) return { result }
			const known = Buffer.from(new Array(i).fill('A').join(''))
			const ciphertext = oracle_function(known)
			return previous_block && ciphertext.slice(0, previous_block.length).equals(previous_block)
				? { result: previous_block.length }
				: { previous_block: ciphertext.slice(0, i) }
		}, {})
		.result
}

const detect_ecb = oracle_function => block_size => {
	const block = Buffer.from(new Array(block_size)
		.fill('A')
		.join('')
	)
	const known = Buffer.concat([block, block])
	const ciphertext = oracle_function(known)
	return ciphertext.slice(0, block_size).equals(ciphertext.slice(block_size, 2 * block_size))
}

module.exports = {
	encryption_oracle,
	get_block_size,
	detect_ecb,
}
