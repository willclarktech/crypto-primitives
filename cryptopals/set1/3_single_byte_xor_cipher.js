#!/usr/bin/env node
const fixedXor = require('./2_fixed_xor')

// https://en.wikipedia.org/wiki/Letter_frequency#Relative_frequencies_of_letters_in_the_English_language
const charScores = {
	' ': 20,
	E: 12.7,
	e: 12.7,
	T: 9.1,
	t: 9.1,
	A: 8.2,
	a: 8.2,
	O: 7.5,
	o: 7.5,
	I: 7.0,
	i: 7.0,
	N: 6.7,
	n: 6.7,
	S: 6.3,
	s: 6.3,
	H: 6.1,
	h: 6.1,
	R: 6.0,
	r: 6.0,
	D: 4.3,
	d: 4.3,
	L: 4.0,
	l: 4.0,
	C: 2.9,
	c: 2.9,
	U: 2.8,
	u: 2.8,
	M: 2.4,
	m: 2.4,
	W: 2.4,
	w: 2.4,
	F: 2.2,
	f: 2.2,
	G: 2.0,
	g: 2.0,
	Y: 2.0,
	y: 2.0,
	p: 1.9,
	b: 1.5,
	v: 1.0,
	k: 0.8,
	j: 0.2,
	x: 0.2,
	q: 0.1,
	z: 0.1,
}

const createSingleByteBuffers = (len, byteSize=128) =>
	Array(byteSize)
		.fill(null)
		.map((_, i) => Buffer.alloc(len, i))

const scoreTexts = text => {
	const score = Array.from(text)
		.reduce((currentScore, nextChar) =>
			currentScore + (charScores[nextChar] || -100)
		, 0)
	return { text, score }
}

const decipherSingleByteXor = (input, encoding='hex') => {
	const inputBuffer = Buffer.from(input, encoding)
	const xored = createSingleByteBuffers(inputBuffer.length)
		.map(buffer => fixedXor([inputBuffer, buffer], true))
	const scored = xored
		.map(buffer => buffer.toString('ascii'))
		.map(scoreTexts)
	const sortedByScore = scored.sort((a, b) => b.score - a.score)
	return sortedByScore[0].text
}

module.exports = decipherSingleByteXor

