const assert = require('assert')

const pkcs_7_pad = block_length => message => {
	const pad_length = block_length - (message.length % block_length)
	const pad = Buffer.alloc(pad_length, pad_length)
	return Buffer.concat([message, pad])
}

module.exports = pkcs_7_pad

