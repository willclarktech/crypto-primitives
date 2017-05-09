const char_scores = require('./char_scores')

const score_text = text => {
  const score = Array.from(text.toString())
    .reduce((current_score, next_char) =>
      current_score + (char_scores[next_char] || -1000)
    , 0)
  return {
    text: new Buffer.from(text, 'utf8'),
    score,
  }
}

module.exports = score_text
