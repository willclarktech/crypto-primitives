#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor.js')

const repeatingKeyXor = key => input => {
	const repeatedKey = new Buffer.alloc(input.length, key)
	return fixedXor([repeatedKey, input])
}

if (require.main === module) {
	if (process.argv.length < 4) throw new Error('Must provide a key and text')
	const [key, text, encoding] = [2, 3]
		.map(i => new Buffer.from(process.argv[i], 'utf8'))
	console.info(repeatingKeyXor(key)(text))
}

module.exports = repeatingKeyXor

