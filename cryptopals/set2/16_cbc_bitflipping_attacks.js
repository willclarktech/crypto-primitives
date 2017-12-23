const pkcs_7_pad = require('./9_pkcs_7_pad')
const {
	decrypt_cbc_mode,
	encrypt_cbc_mode,
} = require('./10_cbc_mode')
const { create_random_aes_key } = require('./11_ecb_cbc_detection_oracle')

const byte_space = 2 ** 8
const nil = '\x00'
const key = create_random_aes_key()
const iv = create_random_aes_key()

const encrypt_cbc_with_padding = userdata => {
	const sanitized_text = userdata
		.replace(/;/g, encodeURIComponent(';'))
		.replace(/=/g, encodeURIComponent('='))
	const sanitized = Buffer.from(sanitized_text)
	const prefix = Buffer.from('comment1=cooking%20MCs;userdata=')
	const suffix = Buffer.from(';comment2=%20like%20a%20pound%20of%20bacon')
	const plaintext = Buffer.concat([prefix, sanitized, suffix])
	return encrypt_cbc_mode(key)(iv)(plaintext)
}

const parse = unparsed => unparsed
	.toString()
	.split(';')
	.map(pair => pair.split('='))
	.reduce((obj, pair) => Object.assign({}, obj, {
		[pair[0]]: pair[1],
	}), {})

const find_admin = encrypted => {
	const decrypted = decrypt_cbc_mode(key)(iv)(encrypted)
	const parsed = parse(decrypted)
	return parsed.admin === 'true'
}

const create_admin = () => {
	const preIndex = 16;
	const midIndex = 22;
	const postIndex = 27;

	const message = `${nil}admin${nil}true${nil}`
	let cipher = encrypt_cbc_with_padding(message)

	for (let i = 0; i < byte_space; ++i) {
		for (let j = 0; j < byte_space; ++j) {
			for (let k = 0; k < byte_space; ++k) {
				if (find_admin(cipher)) {
					return cipher
				}
				cipher[preIndex] += 1
			}
			cipher[midIndex] += 1
		}
		cipher[postIndex] += 1
	}
}

module.exports = {
	encrypt_cbc_with_padding,
	find_admin,
	create_admin,
}

