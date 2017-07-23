const validate_pkcs_7_padding = block_length => message => {
	const final_byte = message[message.length - 1]
	const pad = Buffer.alloc(final_byte, final_byte)
	const pad_start = message.length - final_byte

	if (!message.slice(pad_start).equals(pad)) {
		throw new Error('bad pad')
	}

	return message.slice(0, pad_start)
}

module.exports = validate_pkcs_7_padding

