const charScores = require('./char_scores')

const scoreText = text => {
  const score = Array.from(text.toString())
    .reduce((currentScore, nextChar) =>
      currentScore + (charScores[nextChar] || -1000)
    , 0)
  return {
    text: new Buffer.from(text, 'utf8'),
    score,
  }
}

module.exports = scoreText
