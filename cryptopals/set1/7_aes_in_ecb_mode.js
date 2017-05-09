#!/usr/bin/env node
const crypto = require('crypto')

const decrypt_aes = message => key => {
  const iv = Buffer.alloc(0)
  const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
  const block_1 = decipher.update(message)
  const block_2 = decipher.final()
  return Buffer.concat([block_1, block_2])
}

module.exports = decrypt_aes
