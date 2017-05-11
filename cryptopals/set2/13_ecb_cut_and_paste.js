#!/usr/bin/env node
const assert = require('assert')

const parse_key_value = str =>
	str
		.split('&')
		.map(substr => substr.split('='))
		.reduce((obj, [k, v]) => Object.assign({}, obj, {
			[k]: v,
		})
		, {})

module.exports = {
	parse_key_value,
}
