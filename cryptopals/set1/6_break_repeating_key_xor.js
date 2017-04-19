#!/usr/bin/env node
const scoreText = require('./helpers/score_text')
const fixedXor = require('./2_fixed_xor')
const decipherSingleByteXor = require('./3_single_byte_xor_cipher')
const repeatingKeyXor = require('./5_implement_repeating_key_xor')

const getHammingDistance = input1 => input2 =>
  (fixedXor(input1)(input2)
    .reduce((s, byte) => s + byte.toString(2), '')
    .match(/1/g) || '')
    .length

const getNormalizedHammingDistanceForKeySize = message =>
  keySize =>
  getHammingDistance
    (message.slice(0, keySize))
    (message.slice(keySize, keySize * 2))
    / keySize

const rankKeySizesByHammingDistance = message =>
  ([startKeySize, endKeySize]) =>
  Array(1 + endKeySize - startKeySize)
    .fill()
    .map((_, i) => startKeySize + i)
    .map(keySize => [
      keySize,
      getNormalizedHammingDistanceForKeySize(message)(keySize),
      getNormalizedHammingDistanceForKeySize(message.slice(keySize))(keySize),
    ])
    .map(([l, score1, score2]) => [l, (score1 + score2) / 2])
    .sort((a, b) => a[1] - b[1])
    .map(tuple => tuple[0])

const divideTextByKeySize = message => keySize =>
  message
    .reduce((a, next, i) => {
      const index = i % keySize
      const bufferToMerge = Buffer.alloc(1, next)
      a[index] = a[index]
        ? Buffer.concat([a[index], bufferToMerge])
        : bufferToMerge
      return a
    }, [])

const breakArrayOfSingleXor = xoredMessages =>
  xoredMessages
    .map(decipherSingleByteXor)
    .map(({ xor }) => xor)

const getKeysForRepeatingKeyXor = message => keySizeRange =>
  rankKeySizesByHammingDistance(message)(keySizeRange)
    .slice(0, 5)
    .map(divideTextByKeySize(message))
    .map(breakArrayOfSingleXor)
    .map(Buffer.from)

const getKeyForRepeatingKeyXor = message => keySizeRange =>
  getKeysForRepeatingKeyXor(message)(keySizeRange)[0]

const breakRepeatingKeyXor = message => keySizeRange =>
  getKeysForRepeatingKeyXor(message)(keySizeRange)
    .map(repeatingKeyXor)
    .map(fn => fn(message))
    .map(scoreText)
    .sort((a, b) => b.score - a.score)
    .map(({text}) => text)

module.exports = {
  getHammingDistance,
  getNormalizedHammingDistanceForKeySize,
  rankKeySizesByHammingDistance,
  divideTextByKeySize,
  breakArrayOfSingleXor,
  getKeyForRepeatingKeyXor,
  breakRepeatingKeyXor,
}
