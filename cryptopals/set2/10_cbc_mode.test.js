#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const {
	decrypt_cbc_mode,
	encrypt_cbc_mode,
} = require('./10_cbc_mode')

const iv = Buffer.alloc(16, 0)
const key = 'YELLOW SUBMARINE'

const message = fs.readFileSync('./test-data/10.txt')
const challenge_file = fs.readFileSync('./challenge-data/10.txt', 'utf8')
const self_encrypted = encrypt_cbc_mode(key)(iv)(message)
const encrypted = Buffer.from(challenge_file, 'base64')

const self_output = decrypt_cbc_mode(key)(iv)(self_encrypted)
const output = decrypt_cbc_mode(key)(iv)(encrypted)

assert.ok(self_output.equals(message))
assert.ok(output.equals(message))
console.info('10: shiny')
