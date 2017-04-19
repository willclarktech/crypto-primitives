#!/usr/bin/env node

const fixedXor = buffer1 => buffer2 =>
	buffer1
		.map((b, i) => b ^ buffer2[i])

module.exports = fixedXor
