#!/usr/bin/env node
const assert = require('assert')
const crypto = require('crypto')
const pkcs_7_pad = require('./9_pkcs_7_pad')
const xor = require('../set1/2_fixed_xor')

const block_size = 16
const split_blocks = size => message => (_, i) =>
	message.slice(i * size, (i + 1) * size)
const trim_block = (block) => {
	const l = block.length
	const pad_char = block[l - 1]
	const padded = block
		.slice(l - pad_char)
		.every(char => char === pad_char)
	return padded
		? block.slice(0, l - pad_char)
		: block
}

const chain_blocks = iv => cipher => (ciphered_blocks, block, i) => {
	const pad = i
		? ciphered_blocks[ciphered_blocks.length - 1]
		: iv
	const xored = xor(block)(pad)
	return [...ciphered_blocks, cipher.update(xored)]
}

const decrypt_cbc_mode = key => iv => (message) => {
	const decipher = crypto.createDecipheriv('aes-128-ecb', key, '')
	assert.strictEqual(message.length % block_size, 0, 'Message is irregular length')

	const num_blocks = message.length / block_size
	const blocks = new Array(num_blocks)
		.fill()
		.map(split_blocks(block_size)(message))
		.map(block => ({
			ciphered: block,
			deciphered: decipher.update(block),
		}))
	const ciphers = blocks.map(b => b.ciphered)
	const deciphers = [...blocks.map(b => b.deciphered).slice(1), decipher.update(Buffer.alloc(16))]
	const xored = deciphers
		.map((block, i) => (i
			? xor(block)(ciphers[i - 1])
			: xor(block)(iv)),
		)
	const joined = Buffer.concat(xored)
	return trim_block(joined)
}

const encrypt_cbc_mode = key => iv => (message) => {
	const cipher = crypto.createCipher('aes-128-ecb', key)
	const num_blocks = Math.ceil(message.length / block_size)
	const blocks = new Array(num_blocks)
		.fill()
		.map(split_blocks(block_size)(message))
		.map((block, i) => (i === num_blocks - 1
			? pkcs_7_pad(block_size)(block)
			: block),
		)
		.reduce(chain_blocks(iv)(cipher), [])
	return Buffer.concat([...blocks, cipher.final()])
}

module.exports = {
	decrypt_cbc_mode,
	encrypt_cbc_mode,
}
