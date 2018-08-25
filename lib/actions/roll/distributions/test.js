'use strict';

var roll = require('./gaussian.js');

var x = {};
for (var i = 0; i < 10000000; i++) {
  var value = roll(1, 20);
  if (!x[value]) x[value] = 0;
  x[value] += 1;
}
console.log(x);