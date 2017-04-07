#!/usr/bin/env node
const fixedXor = require('../2_fixed_xor')

const hammingDistance = ({ encoding='hex' }) => input1 => input2 => {
	const xor = fixedXor([input1, input2], true, encoding)
	return Array
		.from(xor)
		.map(n => n.toString(2))
		.reduce((total, next) => {
			const ones = next.match(/1/g) || []
			return total + ones.length
		}, 0)
}

module.exports = hammingDistance

