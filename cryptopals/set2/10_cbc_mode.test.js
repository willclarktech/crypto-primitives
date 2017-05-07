#!/usr/bin/env node
const fs = require('fs')
const assert = require('assert')
const { decrypt_cbc_mode, encrypt_cbc_mode } = require('./10_cbc_mode')

const iv = Buffer.alloc(16, 0)
const key = 'YELLOW SUBMARINE'

//const message = Buffer.from('This is a really long message that exceeds the block size, so that means it\'s longer than a block, which has the size of one block, so this must have a size of more than one block. Does that make sense?')
//const encrypted = encrypt_cbc_mode(key)(iv)(message)

const message = fs.readFileSync('./test-data/10.txt')
const challenge_file = fs.readFileSync('./challenge-data/10.txt', 'utf8')
const encrypted = Buffer.from(challenge_file, 'base64')

const output = decrypt_cbc_mode(key)(iv)(encrypted)

assert.ok(output.equals(message))
console.info('10: shiny')
