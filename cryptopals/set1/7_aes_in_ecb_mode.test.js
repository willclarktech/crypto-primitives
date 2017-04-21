#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const decryptAes = require('./7_aes_in_ecb_mode')

const testDecryptAes = () => {
  const fileString = fs.readFileSync('./challenge-data/7.txt', 'utf8')
  const input = Buffer.from(fileString, 'base64')
  const key = Buffer.from('YELLOW SUBMARINE')

  const output = decryptAes(input)(key)
  console.info(output.toString())
}

testDecryptAes()
console.info('shiny')
