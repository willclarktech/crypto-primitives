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

const create_user = email => ({
	email: email.match(/[^&=]/g).join(''),
	uid: parseInt(Math.random().toString().slice(2), 10),
	role: 'user',
})

module.exports = {
	parse_key_value,
	create_user,
}
