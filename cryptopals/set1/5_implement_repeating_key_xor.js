#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor.js')

const repeatingKeyXor = (key, input) => {
	const repeatedKey = new Array(input.length)
		.fill(null)
		.map((_, i) => key[i % key.length])
		.join('')
	const buffers = [input, repeatedKey].map(s => new Buffer.from(s, 'utf8'))
	return fixedXor(buffers)
}

module.exports = repeatingKeyXor

