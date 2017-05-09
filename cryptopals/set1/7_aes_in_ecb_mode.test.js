#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const decrypt_aes = require('./7_aes_in_ecb_mode')

const test_decrypt_aes = () => {
  const file_string = fs.readFileSync('./challenge-data/7.txt', 'utf8')
  const input = Buffer.from(file_string, 'base64')
  const key = Buffer.from('YELLOW SUBMARINE')
  const expected = fs.readFileSync('./challenge-data/7.decrypted.txt')

  const output = decrypt_aes(input)(key)
  assert.ok(output.equals(expected))
}

test_decrypt_aes()
console.info('7: shiny')
