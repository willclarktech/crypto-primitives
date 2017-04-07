#!/usr/bin/env node

const fixedXor = inputs => {
	const [buffer1, buffer2] = inputs
	return buffer1.map((b, i) => b ^ buffer2[i])
}

module.exports = fixedXor

