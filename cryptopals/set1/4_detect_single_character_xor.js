#!/usr/bin/env node
const decipherSingleByteXor = require('./3_single_byte_xor_cipher')
const charScores = require('./helpers/char_scores')

const detectSingleCharacterXor = input => {
	const highestScoringTexts = input.map(decipherSingleByteXor)
	const sorted = highestScoringTexts.sort((a, b) => b.score - a.score)
	return sorted[0].text
}

module.exports = detectSingleCharacterXor

