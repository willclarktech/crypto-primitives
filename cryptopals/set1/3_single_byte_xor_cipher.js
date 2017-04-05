#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor')
const charScores = require('./helpers/char_scores')

const createSingleByteBuffers = (len, byteSize=128) =>
	Array(byteSize)
		.fill(null)
		.map((_, i) => Buffer.alloc(len, i))

const scoreTexts = text => {
	const score = Array.from(text)
		.reduce((currentScore, nextChar) =>
			currentScore + (charScores[nextChar] || -100)
		, 0)
	return { text, score }
}

const decipherSingleByteXor = (input, encoding='hex') => {
	const inputBuffer = Buffer.from(input, encoding)
	const xored = createSingleByteBuffers(inputBuffer.length)
		.map(buffer => fixedXor([inputBuffer, buffer], true))
	const scored = xored
		.map(buffer => buffer.toString('ascii'))
		.map(scoreTexts)
	const sortedByScore = scored.sort((a, b) => b.score - a.score)
	return sortedByScore[0].text
}

module.exports = decipherSingleByteXor

