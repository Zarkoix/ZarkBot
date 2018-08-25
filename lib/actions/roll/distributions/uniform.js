"use strict";

module.exports = rand;

// returns a random number [0, 1) with uniform distribution
function uniformRand() {
  return Math.random();
}

// returns a random number between [start, end] with gaussian distribution
function rand(start, end) {
  return Math.floor(start + uniformRand() * (end - start + 1));
}