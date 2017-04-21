#!/usr/bin/env node
// const crypto = require('crypto')

const divideInputIntoBlocks = blockSize => input =>
  Array(Math.ceil(input.length / blockSize))
    .fill()
    .map((_, i) => input.slice(i * blockSize, (i + 1) * blockSize))

const detectIfDuplicate = blocks =>
  blocks
    .some((block, i) =>
      blocks
        .slice(i + 1)
        .some(b => b.equals(block))
    )

const detectAesInEcbMode = inputs =>
  inputs
    .map(divideInputIntoBlocks(16))
    .map(detectIfDuplicate)
    .indexOf(true)

module.exports = detectAesInEcbMode
