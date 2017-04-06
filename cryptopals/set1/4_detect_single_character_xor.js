#!/usr/bin/env node
const decipherSingleByteXor = require('./3_single_byte_xor_cipher')
const charScores = require('./helpers/char_scores')

const detectSingleCharacterXor = (inputStrings, encoding='hex') => {
	const highestScoringTexts = inputStrings.map(s => decipherSingleByteXor(s, encoding, true))
	const sorted = highestScoringTexts.sort((a, b) => b.score - a.score)
	return sorted[0].text
}

module.exports = detectSingleCharacterXor

