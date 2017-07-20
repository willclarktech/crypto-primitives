#!/usr/bin/env node

const hex_to_base64 = hex_string => {
	const buffer = Buffer.from(hex_string, 'hex')
	return buffer.toString('base64')
}

module.exports = hex_to_base64
