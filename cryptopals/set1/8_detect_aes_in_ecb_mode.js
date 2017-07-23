const divide_input_into_blocks = block_size => input =>
  Array(Math.ceil(input.length / block_size))
    .fill()
    .map((_, i) => input.slice(i * block_size, (i + 1) * block_size))

const detect_if_duplicate = blocks =>
  blocks
    .some((block, i) =>
      blocks
        .slice(i + 1)
        .some(b => b.equals(block)),
    )

const detect_aes_in_ecb_mode = inputs =>
  inputs
    .map(divide_input_into_blocks(16))
    .map(detect_if_duplicate)
    .indexOf(true)

module.exports = detect_aes_in_ecb_mode
