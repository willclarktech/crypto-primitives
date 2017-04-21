#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const detectAesInEcbMode = require('./8_detect_aes_in_ecb_mode')

const testDetectAesInEcbMode = () => {
  const fileString = fs.readFileSync('./challenge-data/8.txt', 'utf8')
  const inputs = fileString
    .split('\n')
    .filter(Boolean)
    .map(string => Buffer.from(string, 'hex'))

  const output = detectAesInEcbMode(inputs)
  console.info(inputs[output].toString('hex'))
}

testDetectAesInEcbMode()
console.info('8: shiny')
