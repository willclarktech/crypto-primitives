#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const fixed_xor = require('./2_fixed_xor')
const repeating_key_xor = require('./5_implement_repeating_key_xor')
const {
  get_hamming_distance,
  get_normalized_hamming_distance_for_key_size,
  rank_key_sizes_by_hamming_distance,
  divide_text_by_key_size,
  break_array_of_single_xor,
  get_key_for_repeating_key_xor,
  break_repeating_key_xor,
} = require('./6_break_repeating_key_xor')

const provided_inputs = ['this is a test', 'wokka wokka!!!']
const provided_hamming_distance = 37
const default_message_string = 'This is a message that should be readable. There could be unusual characters such as X and Y and Z, but anyway there will not be any non-human-readable sections.'

const test_get_hamming_distance = () => {
	const distance = provided_hamming_distance
	const inputs = provided_inputs
    .map(s => Buffer.from(s))

	const output = get_hamming_distance(inputs[0])(inputs[1])

	assert.strictEqual(output, distance)
}

const test_get_normalized_hamming_distance_for_key_size = () => {
	const key_size = provided_inputs[0].length
	const message = `${provided_inputs.join('')}some extra stuff that is irrelevant`
	const message_buffer = Buffer.from(message)
	const normalized_distance = provided_hamming_distance / key_size

	const output = get_normalized_hamming_distance_for_key_size(message_buffer)(key_size)

	assert.strictEqual(output, normalized_distance)
}

const test_rank_key_sizes_by_hamming_distance = () => {
	const key = Buffer.from([
		1, 99, 43, 250, 187, 188, 12,
	])
	const message_string = Array(50)
    .fill(default_message_string)
    .join(' ')
	const message = Buffer.from(message_string)
	const xored_message = repeating_key_xor(key)(message)
	const key_size_range = [2, 50]
	const correct_key_size = key.length

	const output = rank_key_sizes_by_hamming_distance(xored_message)(key_size_range)

	assert.ok(output.slice(0, 5).includes(correct_key_size))
}

const test_divide_text_by_key_size = () => {
	const message_string = 'This is a message to divide'
	const message = Buffer.from(message_string)
	const key_size = 4
	const first_block = Buffer.from('T ase i')
	const output = divide_text_by_key_size(message)(key_size)

	assert.ok(output[0].equals(first_block))
}

const test_break_array_of_single_xor = () => {
	const message = Buffer.from(default_message_string)
	const curried_fixed_xor = fixed_xor(message)
	const characters = [1, 120, 207]
	const xored_array = characters
    .map(c => curried_fixed_xor(Buffer.alloc(message.length, c)))
	const output = break_array_of_single_xor(xored_array)

	output.map((c, i) => assert.strictEqual(c, characters[i]))
}

const test_get_key_for_repeating_key_xor = () => {
	const key = Buffer.from('secret key')
	const message = Buffer.from(Array(30).fill(default_message_string).join(' '))
	const xored = repeating_key_xor(key)(message)
	const key_size_range = [2, 50]
	const output = get_key_for_repeating_key_xor(xored)(key_size_range)

	assert.ok(output.equals(key))
}

const test_break_repeating_key_xor = () => {
	const message_string = Array(50)
      .fill('This is a message that should be readable. There could be unusual characters such as X and Y and Z, but anyway there will not be any non-human-readable sections.')
      .join(' ')
	const message = Buffer.from(message_string)
	const key = Buffer.from('Some secret key')
	const xored_message = repeating_key_xor(key)(message)
	const test_data_path = './test-data/6.txt'

	const create_test_data = () => {
		const base64_string = Buffer.from(xored_message).toString('base64')
		fs.writeFileSync(test_data_path, base64_string)
	}
	if (!fs.existsSync(test_data_path)) {
		create_test_data()
	}

	const file = fs.readFileSync(test_data_path, 'utf8')
	const input = Buffer.from(file, 'base64')

	const key_size_range = [2, 50]
	const output_array = break_repeating_key_xor(input)(key_size_range)

	assert.ok(
    output_array
      .some(output => output.toString() === message_string),
  )
}

const break_challenge_text = () => {
	const challenge_data_path = './challenge-data/6.txt'
	const file = fs.readFileSync(challenge_data_path, 'utf8')
	const input = Buffer.from(file, 'base64')
	const key_size_range = [2, 60]
	const output = break_repeating_key_xor(input)(key_size_range)
	console.info(output[0].toString())
}

test_get_hamming_distance()
test_get_normalized_hamming_distance_for_key_size()
test_rank_key_sizes_by_hamming_distance()
test_divide_text_by_key_size()
test_break_array_of_single_xor()
test_get_key_for_repeating_key_xor()
test_break_repeating_key_xor()
break_challenge_text()
console.info('6: shiny')
