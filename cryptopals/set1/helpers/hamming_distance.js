#!/usr/bin/env node
const fixed_xor = require('../2_fixed_xor')

const hamming_distance = input_1 => (input_2) => {
	const xor = fixed_xor([input_1, input_2])
	return Array
		.from(xor)
		.map(n => n.toString(2))
		.reduce((total, next) => {
			const ones = next.match(/1/g) || []
			return total + ones.length
		}, 0)
}

module.exports = hamming_distance

