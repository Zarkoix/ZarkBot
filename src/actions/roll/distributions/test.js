let roll = require('./gaussian.js')

let x = {}
for (let i = 0; i < 10000000; i++) {
  let value = roll(1, 20)
  if (!x[value]) x[value] = 0
  x[value] += 1
}
console.log(x)
