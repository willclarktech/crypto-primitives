#!/usr/bin/env node
const fs = require('fs')
const detect_aes_in_ecb_mode = require('./8_detect_aes_in_ecb_mode')

const test_detect_aes_in_ecb_mode = () => {
	const file_string = fs.readFileSync('./challenge-data/8.txt', 'utf8')
	const inputs = file_string
    .split('\n')
    .filter(Boolean)
    .map(string => Buffer.from(string, 'hex'))

	const output = detect_aes_in_ecb_mode(inputs)
	console.info('string using ecb mode:', inputs[output].toString('hex'))
}

test_detect_aes_in_ecb_mode()
console.info('8: shiny')
