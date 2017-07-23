const decipher_single_byte_xor = require('./3_single_byte_xor_cipher')

const detect_single_character_xor = input => {
	const highest_scoring_texts = input.map(decipher_single_byte_xor)
	const sorted = highest_scoring_texts.sort((a, b) => b.score - a.score)
	return sorted[0].text
}

module.exports = detect_single_character_xor
