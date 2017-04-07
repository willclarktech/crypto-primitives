#!/usr/bin/env node

const maybeConvertStringToBuffer = (stringOrBuffer, encoding) =>
	Buffer.isBuffer(stringOrBuffer)
		? stringOrBuffer
		: Buffer.from(stringOrBuffer, encoding)

module.exports = maybeConvertStringToBuffer

