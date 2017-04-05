#!/usr/bin/env node

const hexToBase64 = hexString => {
	const buffer = new Buffer.from(hexString, 'hex')
	return buffer.toString('base64')
}

module.exports = hexToBase64

