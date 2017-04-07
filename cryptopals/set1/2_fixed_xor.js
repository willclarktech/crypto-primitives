#!/usr/bin/env node
const maybeConvertStringToBuffer = require('./helpers/maybe_convert_string_to_buffer')

const fixedXor = (inputs, returnBuffer=false, encoding='hex') => {
	const [buffer1, buffer2] = inputs.map(input => maybeConvertStringToBuffer(input, encoding))
	const xored = buffer1.map((b, i) => b ^ buffer2[i])
	return returnBuffer
		? xored
		: xored.toString(encoding)
}

module.exports = fixedXor

