#!/usr/bin/env node

const fixed_xor = buffer1 => buffer2 =>
	buffer1
		.map((b, i) => b ^ buffer2[i])

module.exports = fixed_xor
