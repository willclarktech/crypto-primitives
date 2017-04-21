#!/usr/bin/env node
const crypto = require('crypto')

const decryptAes = message => key => {
  const iv = Buffer.alloc(0)
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
  const block1 = decipher.update(message)
  const block2 = decipher.final()
  return Buffer.concat([block1, block2])
}

module.exports = decryptAes
