module.exports = rand


// returns a random number [0, 1) with gaussian distribution
// accepts an input of a number that determines how accurate the distribution is
//   to proper gaussian distribution, lower inputs are faster but less precise
function gaussianRand(n = 6) {
  var rand = 0;

  for (var i = 0; i < n; i += 1) {
    rand += Math.random();
  }

  return rand / n;
}

// returns a random number between [start, end] with gaussian distribution
function rand(start, end) {
  return Math.floor(start + gaussianRand() * (end - start + 1));
}
