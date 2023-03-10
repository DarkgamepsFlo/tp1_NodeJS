const { result } = require("lodash");

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne la somme de a et b
 */
function addition(a, b) {
  if(!(typeof(a) == typeof(1)) || !(typeof(b) == typeof(1)))
    throw new Error("Mauvais type!");
  res = a + b;
  return res;
}

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne le quotient de a et b
 */
function quotient(a, b) {
  if(!(typeof(a) == typeof(1)) || !(typeof(b) == typeof(1)))
    throw new Error("Mauvais type!");
  if(b == 0)
    throw ("Il est impossible de diviser par 0!");
  res = a / b;
  return res;
}

module.exports = {
  addition,
  quotient,
};
