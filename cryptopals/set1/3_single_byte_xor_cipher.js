#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor')
const scoreText = require('./helpers/score_text')

const createSingleByteBuffers = (len, byteSize=8) =>
	Array(2**byteSize)
		.fill(null)
		.map((_, i) => Buffer.alloc(len, i))

const decipherSingleByteXor = input => {
	const xored = createSingleByteBuffers(input.length)
		.map(buffer => fixedXor(input)(buffer))
	const scored = xored
		.map((text, i) => Object.assign({ xor: i }, scoreText(text)))
	const sortedByScore = scored.sort((a, b) => b.score - a.score)
	const winner = sortedByScore[0]
	return winner
}

module.exports = decipherSingleByteXor
