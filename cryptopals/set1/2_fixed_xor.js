#!/usr/bin/env node

const maybeConvertStringToBuffer = (stringOrBuffer, encoding='hex') =>
	Buffer.isBuffer(stringOrBuffer)
		? stringOrBuffer
		: Buffer.from(stringOrBuffer, encoding)

const fixedXor = (inputs, returnBuffer=false) => {
	const [buffer1, buffer2] = inputs.map(input => maybeConvertStringToBuffer(input))
	const xored = buffer1.map((b, i) => b ^ buffer2[i])
	return returnBuffer
		? xored
		: xored.toString('hex')
}

module.exports = fixedXor

