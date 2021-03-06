const fixed_xor = require('./2_fixed_xor.js')

const repeating_key_xor = key => input => {
	const repeated_key = Buffer.alloc(input.length, key)
	return fixed_xor(repeated_key)(input)
}

if (require.main === module) {
	if (process.argv.length < 4) throw new Error('Must provide a key and text')
	const [key, text] = [2, 3]
		.map(i => Buffer.from(process.argv[i], 'utf8'))
	console.info(repeating_key_xor(key)(text))
}

module.exports = repeating_key_xor
