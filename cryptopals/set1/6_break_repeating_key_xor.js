#!/usr/bin/env node
const score_text = require('./helpers/score_text')
const fixed_xor = require('./2_fixed_xor')
const decipher_single_byte_xor = require('./3_single_byte_xor_cipher')
const repeating_key_xor = require('./5_implement_repeating_key_xor')

const get_hamming_distance = input_1 => input_2 =>
  (fixed_xor(input_1)(input_2)
    .reduce((s, byte) => s + byte.toString(2), '')
    .match(/1/g) || [])
    .length

const get_normalized_hamming_distance_for_key_size = message =>
  key_size =>
  get_hamming_distance(message.slice(0, key_size))(message.slice(key_size, key_size * 2))
    / key_size

const rank_key_sizes_by_hamming_distance = message =>
  ([start_key_size, end_key_size]) =>
  Array(1 + end_key_size - start_key_size)
    .fill()
    .map((_, i) => start_key_size + i)
    .map(key_size => [
	key_size,
	get_normalized_hamming_distance_for_key_size(message)(key_size),
	get_normalized_hamming_distance_for_key_size(message.slice(key_size))(key_size),
])
    .map(([l, score_1, score_2]) => [l, (score_1 + score_2) / 2])
    .sort((a, b) => a[1] - b[1])
    .map(tuple => tuple[0])

const divide_text_by_key_size = message => key_size =>
  message
    .reduce((a, next, i) => {
	const index = i % key_size
	const buffer_to_merge = Buffer.alloc(1, next)
	a[index] = a[index]
        ? Buffer.concat([a[index], buffer_to_merge])
        : buffer_to_merge
	return a
}, [])

const break_array_of_single_xor = xored_messages =>
  xored_messages
    .map(decipher_single_byte_xor)
    .map(({ xor }) => xor)

const get_keys_for_repeating_key_xor = message => key_size_range =>
  rank_key_sizes_by_hamming_distance(message)(key_size_range)
    .slice(0, 5)
    .map(divide_text_by_key_size(message))
    .map(break_array_of_single_xor)
    .map(Buffer.from)

const get_key_for_repeating_key_xor = message => key_size_range =>
  get_keys_for_repeating_key_xor(message)(key_size_range)[0]

const break_repeating_key_xor = message => key_size_range =>
  get_keys_for_repeating_key_xor(message)(key_size_range)
    .map(repeating_key_xor)
    .map(fn => fn(message))
    .map(score_text)
    .sort((a, b) => b.score - a.score)
    .map(({ text }) => text)

module.exports = {
	get_hamming_distance,
	get_normalized_hamming_distance_for_key_size,
	rank_key_sizes_by_hamming_distance,
	divide_text_by_key_size,
	break_array_of_single_xor,
	get_key_for_repeating_key_xor,
	break_repeating_key_xor,
}
