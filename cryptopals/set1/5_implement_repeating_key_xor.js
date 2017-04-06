#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor.js')

const repeatingKeyXor = (key, input, encoding='utf8') => {
	const repeatedKey = new Array(input.length)
		.fill(null)
		.map((_, i) => key[i % key.length])
		.join('')
	const buffers = [input, repeatedKey].map(s => new Buffer.from(s, encoding))
	return fixedXor(buffers)
}

if (require.main === module) {
	if (process.argv.length < 4) throw new Error('Must provide a key and text')
	const key = process.argv[2]
	const text = process.argv[3]
	const encoding = process.argv[4]
	console.info(repeatingKeyXor(key, text, encoding))
}

module.exports = repeatingKeyXor

