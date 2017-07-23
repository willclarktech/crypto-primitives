const assert = require('assert')

const pkcs_7_pad = block_length => message => {
	const pad_length = block_length - message.length
	assert.strictEqual(pad_length >= 0, true, 'Cannot pad a message longer than the block size.')
	const pad = Buffer.from(new Array(pad_length).fill(pad_length))
	return Buffer.concat([message, pad])
}

module.exports = pkcs_7_pad

