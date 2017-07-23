const crypto = require('crypto')
const fs = require('fs')

const key = Buffer.from(fs.readFileSync('./test-data/key_hex.txt', 'utf8'), 'hex')
const iv = Buffer.alloc(0)

const parse_key_value = str =>
	str
		.split('&')
		.map(substr => substr.split('='))
		.reduce((obj, [k, v]) => Object.assign({}, obj, {
			[k]: v,
		})
			, {})

const encode_key_value = obj =>
	Object.entries(obj)
		.map(([k, v]) => `${k}${v === undefined ? '' : `=${v}`}`)
		.join('&')

const pad = number_string =>
	(number_string.length >= 17
		? number_string
		: pad(`0${number_string}`))

const create_uid = () => {
	const random_number = Math.random().toString().slice(2)
	return pad(random_number)
}

const create_user = email => ({
	email: email.match(/[^&=]/g).join(''),
	uid: create_uid(),
	role: 'user',
})

const profile_for = email => {
	const user = create_user(email)
	return encode_key_value(user)
}

const profile_for_ecb = email => {
	const profile = Buffer.from(profile_for(email))
	const cipher = crypto.createCipheriv('aes-128-ecb', key, iv)
	return Buffer.concat([cipher.update(profile), cipher.final()])
}

const decrypt_user = ciphertext => {
	const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
	decipher.setAutoPadding(false)
	const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
	return parse_key_value(decrypted.toString().replace(/[\u000f\u000e]/g, ''))
}

const get_longer = (shorter, i = 2) => {
	const email = new Array(i).fill('A').join('')
	const length = profile_for_ecb(email).length
	return length > shorter
		? {
			block_length: length,
			email_length: i,
		}
		: get_longer(shorter, i + 1)
}

const create_admin = () => {
	const shorter = profile_for_ecb('A').length
	const longer = get_longer(shorter)
	const block_length = longer.block_length - shorter
	const email_length = longer.email_length

	const admin_text = 'admin'
	const admin_email = Array(email_length).fill('A').join('') + admin_text

	const admin_profile = profile_for_ecb(admin_email)
	const admin_slice = admin_profile.slice(block_length, block_length * 2)

	const user_text = 'user'
	const role_email = Array(email_length + user_text.length).fill('A').join('')
	const role_profile = profile_for_ecb(role_email)
	const role_slice = role_profile.slice(0, block_length * 3)
	return Buffer.concat([role_slice, admin_slice])
}

module.exports = {
	parse_key_value,
	create_user,
	profile_for,
	profile_for_ecb,
	decrypt_user,
	create_admin,
}
