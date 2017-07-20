const fs = require('fs')
const crypto = require('crypto')

const block_size = 16
const byte_size = 2 ** 8
const byte_indices = new Array(byte_size).fill().map((_, i) => i)

const encryption_oracle = unknown => known => {
	const key = Buffer.from(fs.readFileSync('./test-data/key_hex.txt', 'utf8'), 'hex')
	const num_random_bytes = crypto.randomBytes(1)[0] % 16
	const random_bytes = crypto.randomBytes(num_random_bytes)
	const plaintext = Buffer.concat([random_bytes, known, unknown])
	const iv = Buffer.alloc(0)
	const cipher = crypto.createCipher('aes-128-ecb', key, iv)
	return Buffer.concat([cipher.update(plaintext), cipher.final()])
}

const get_ciphertext = oracle_function => pad => candidates => {
	const new_candidate = oracle_function(pad)
	const candidate_found_twice = candidates.some(candidate => candidate.equals(new_candidate) && candidates.slice(candidates.indexOf(candidate) + 1).some(second_candidate => second_candidate.equals(new_candidate)))
	return candidate_found_twice
		? new_candidate
		: get_ciphertext(oracle_function)(pad)([...candidates, new_candidate])
}

const get_first_byte = oracle_function => {
	const pad = Buffer.alloc(block_size - 1, 'A')
	const target_block = get_ciphertext(oracle_function)(pad)([])
		.slice(0, block_size)

	for (const i of byte_indices) {
		const known = Buffer.concat([pad, Buffer.alloc(1, i)])
		const candidate_block = get_ciphertext(oracle_function)(known)([])
			.slice(0, block_size)
		if (candidate_block.equals(target_block)) return i
	}

	return null
}

const get_nth_byte = oracle_function => block_size => preceding_bytes => {
	const pad = Buffer.alloc(block_size - (preceding_bytes.length % block_size) - 1, 'A')
	const block_index = Math.floor(preceding_bytes.length / block_size)
	const target_block = get_ciphertext(oracle_function)(pad)([])
		.slice(block_index * block_size, (block_index + 1) * block_size)

	for (const i of byte_indices) {
		const done_blocks = Buffer.from(preceding_bytes.slice(0, block_index))
		const focus_bytes = Buffer.from(preceding_bytes.slice(block_index))
		const known = Buffer.concat([done_blocks, pad, focus_bytes, Buffer.alloc(1, i)])
		const candidate_block = get_ciphertext(oracle_function)(known)([])
			.slice(block_index * block_size, (block_index + 1) * block_size)
		if (candidate_block.equals(target_block)) return i
	}

	return null
}

const decrypt_ecb = oracle_function => block_size => {
	const l = oracle_function(Buffer.alloc(0)).length
	const byte_array = new Array(l)
		.fill()
		.map((_, i) => i)
		.reduce(accumulator =>
			[...accumulator, get_nth_byte(oracle_function)(block_size)(accumulator)]
		, [])
		.filter(b => b !== null)
	return Buffer.from(byte_array)
}

module.exports = {
	encryption_oracle,
	get_first_byte,
	decrypt_ecb,
}
