#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor')
const charScores = require('./helpers/char_scores')

const createSingleByteBuffers = (len, byteSize=8) =>
	Array(2**byteSize)
		.fill(null)
		.map((_, i) => Buffer.alloc(len, i))

const scoreTexts = (text, i) => {
	const score = Array.from(text)
		.reduce((currentScore, nextChar) =>
			currentScore + (charScores[nextChar] || -100)
		, 0)
	return {
		text: new Buffer.from(text, 'utf8'),
		score,
		xor: i,
	}
}

const decipherSingleByteXor = input => {
	const xored = createSingleByteBuffers(input.length)
		.map(buffer => fixedXor(input)(buffer))
	const scored = xored
		.map(buffer => buffer.toString('utf8'))
		.map(scoreTexts)
	const sortedByScore = scored.sort((a, b) => b.score - a.score)
	const winner = sortedByScore[0]
	return winner
}

module.exports = decipherSingleByteXor
