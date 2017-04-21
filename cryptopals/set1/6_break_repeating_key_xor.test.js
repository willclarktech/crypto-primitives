#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const fixedXor = require('./2_fixed_xor')
const repeatingKeyXor = require('./5_implement_repeating_key_xor')
const {
  getHammingDistance,
  getNormalizedHammingDistanceForKeySize,
  rankKeySizesByHammingDistance,
  divideTextByKeySize,
  breakArrayOfSingleXor,
  getKeyForRepeatingKeyXor,
  breakRepeatingKeyXor,
} = require('./6_break_repeating_key_xor')

const providedInputs = ['this is a test', 'wokka wokka!!!']
const providedHammingDistance = 37
const defaultMessageString = 'This is a message that should be readable. There could be unusual characters such as X and Y and Z, but anyway there will not be any non-human-readable sections.'

const testGetHammingDistance = () => {
  const distance = providedHammingDistance
  const inputs = providedInputs
    .map(s => Buffer.from(s))

  const output = getHammingDistance(inputs[0])(inputs[1])

  assert.strictEqual(output, distance)
}

const testGetNormalizedHammingDistanceForKeySize = () => {
  const keySize = providedInputs[0].length
  const message = providedInputs.join('') + 'some extra stuff that is irrelevant'
  const messageBuffer = Buffer.from(message)
  const normalizedDistance = providedHammingDistance / keySize

  const output = getNormalizedHammingDistanceForKeySize(messageBuffer)(keySize)

  assert.strictEqual(output, normalizedDistance)
}

const testRankKeySizesByHammingDistance = () => {
  const key = Buffer.from([
    1, 99, 43, 250, 187, 188, 12,
  ])
  const messageString = Array(50)
    .fill(defaultMessageString)
    .join(' ')
  const message = Buffer.from(messageString)
  const xoredMessage = repeatingKeyXor(key)(message)
  const keySizeRange = [2, 50]
  const correctKeySize = key.length

  const output = rankKeySizesByHammingDistance(xoredMessage)(keySizeRange)

  assert.ok(output.slice(0, 5).includes(correctKeySize))
}

const testDivideTextByKeySize = () => {
  const messageString = 'This is a message to divide'
  const message = Buffer.from(messageString)
  const keySize = 4
  const firstBlock = Buffer.from('T ase i')
  const output = divideTextByKeySize(message)(keySize)

  assert.ok(output[0].equals(firstBlock))
}

const testBreakArrayOfSingleXor = () => {
  const message = Buffer.from(defaultMessageString)
  const curriedFixedXor = fixedXor(message)
  const characters = [01, 120, 207]
  const xoredArray = characters
    .map(c => curriedFixedXor(Buffer.alloc(message.length, c)))
  const output = breakArrayOfSingleXor(xoredArray)

  output.map((c, i) => assert.strictEqual(c, characters[i]))
}

const testGetKeyForRepeatingKeyXor = () => {
  const key = Buffer.from('secret key')
  const message = Buffer.from(Array(30).fill(defaultMessageString).join(' '))
  const xored = repeatingKeyXor(key)(message)
  const keySizeRange = [2, 50]
  const output = getKeyForRepeatingKeyXor(xored)(keySizeRange)

  assert.ok(output.equals(key))
}

const testBreakRepeatingKeyXor = () => {
  const messageString = Array(50)
      .fill('This is a message that should be readable. There could be unusual characters such as X and Y and Z, but anyway there will not be any non-human-readable sections.')
      .join(' ')
  const message = Buffer.from(messageString)
  const key = Buffer.from('Some secret key')
  const xoredMessage = repeatingKeyXor(key)(message)
  const testDataPath = './test-data/6.txt'

  const createTestData = () => {
    const base64String = Buffer.from(xoredMessage).toString('base64')
    fs.writeFileSync(testDataPath, base64String)
  }
  fs.existsSync(testDataPath) || createTestData()

  const file = fs.readFileSync(testDataPath, 'utf8')
  const input = Buffer.from(file, 'base64')

  const keySizeRange = [2, 50]
  const outputArray = breakRepeatingKeyXor(input)(keySizeRange)

  assert.ok(
    outputArray
      .some(output => output.toString() === messageString)
  )
}

const breakChallengeText = () => {
  const challengeDataPath = './challenge-data/6.txt'
  const file = fs.readFileSync(challengeDataPath, 'utf8')
  const input = Buffer.from(file, 'base64')
  const keySizeRange = [2, 60]
  const output = breakRepeatingKeyXor(input)(keySizeRange)
  console.info(output[0].toString())
}

testGetHammingDistance()
testGetNormalizedHammingDistanceForKeySize()
testRankKeySizesByHammingDistance()
testDivideTextByKeySize()
testBreakArrayOfSingleXor()
testGetKeyForRepeatingKeyXor()
testBreakRepeatingKeyXor()
breakChallengeText()
console.info('6: shiny')
