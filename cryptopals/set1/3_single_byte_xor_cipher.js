#!/usr/bin/env node
const fixed_xor = require('./2_fixed_xor')
const score_text = require('./helpers/score_text')

const create_single_byte_buffers = (len, byte_size=8) =>
	Array(2**byte_size)
		.fill(null)
		.map((_, i) => Buffer.alloc(len, i))

const decipher_single_byte_xor = input => {
	const xored = create_single_byte_buffers(input.length)
		.map(buffer => fixed_xor(input)(buffer))
	const scored = xored
		.map((text, i) => Object.assign({ xor: i }, score_text(text)))
	const sorted_by_score = scored.sort((a, b) => b.score - a.score)
	const winner = sorted_by_score[0]
	return winner
}

module.exports = decipher_single_byte_xor
