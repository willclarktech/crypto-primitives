#!/usr/bin/env node
const assert = require('assert')
const crypto = require('crypto')
const fs = require('fs')

const key = Buffer.from(fs.readFileSync('./test-data/key_hex.txt', 'utf8'), 'hex')
const iv = Buffer.alloc(0)

const parse_key_value = str =>
	str
		.split('&')
		.map(substr => substr.split('='))
		.reduce((obj, [k, v]) => Object.assign({}, obj, {
			[k]: v,
		})
		, {})

const encode_key_value = obj =>
  Object.entries(obj)
    .map(([k, v]) => `${k}${v == undefined ? '' : `=${v}`}`)
    .join('&')

const create_user = email => ({
	email: email.match(/[^&=]/g).join(''),
	uid: parseInt(Math.random().toString().slice(2), 10),
	role: 'user',
})

const profile_for = email => {
  const user = create_user(email)
  return encode_key_value(user)
}

const profile_for_ecb = email => {
  const profile = Buffer.from(profile_for(email))
  const cipher = crypto.createCipheriv('aes-128-ecb', key, iv)
  return Buffer.concat([cipher.update(profile), cipher.final()])
}

const decrypt_user = ciphertext => {
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return parse_key_value(decrypted.toString())
}

module.exports = {
	parse_key_value,
	create_user,
  profile_for,
  profile_for_ecb,
  decrypt_user,
}
