'use strict'

let Problem = require('./problem').Problem;

function Problem88 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem88.prototype = Object.create(Problem.prototype);
Problem88.prototype.constructor = Problem88;

function unique(array) {
    return array.reduce((uniqueArray, number) => {
        if (uniqueArray.indexOf(number) === -1) {
            uniqueArray.push(number);
        }
        return uniqueArray;
    }, []);
}

Problem88.prototype.getSolution = function () {
    
  console.time("Bruteforce");

  let max_k = 12000;
  let max_number = 2 * max_k;

  let num_factors = Math.round(Math.log10(max_number) / Math.log10(2));
  let factors = Array();
  let k = Array();

  for (let i = 0; i < max_k + 1; i++) {
    k.push(i*2);
  }

  k[1] = 0;

  factors[0] = 1;
  let cur_max_factor = 1;
  let j = 0;

    while (true) {
        if (j ==0 ) {
            if (cur_max_factor == num_factors) {
                break;
            }
            if (factors[0] < factors[1]) {
                factors[0]++;
            } else {
                cur_max_factor++;
                factors[cur_max_factor - 1] = Number.MAX_VALUE;
                factors[0] = 2;
            }

            j++;
            factors[1] = factors[0] - 1;
        } else if (j == cur_max_factor - 1) {
            factors[j]++;
            let sum = 0;
            let prod = 1;
            for (let i=0; i < cur_max_factor; i++) {
                prod *= factors[i];
                sum += factors[i];
            }

            if (prod > max_number) {
                j--;
            } else {
                let pk = prod - sum + cur_max_factor;
                if ( (pk <= max_k) && (prod < k[pk]) ) {
                    k[pk] = prod;
                }
            }
        } else if (factors[j] < factors[j + 1]) {
            factors[j]++;
            factors[j+1] = factors[j] - 1;
            j++;
        } else if (factors[j] >= factors[j + 1]) {
            j--;
        }
    }

    let k_unique = unique(k);

  console.timeEnd("Bruteforce");

  return k_unique.reduce(function (a, b) {
    return a + b;
  }, 0);;
}

var problem_text = `
A natural number, N, that can be written as the sum and product of a given set of at least two natural numbers, {a1, a2, ... , ak} is called a product-sum number: N = a1 + a2 + ... + ak = a1 × a2 × ... × ak.

For example, 6 = 1 + 2 + 3 = 1 × 2 × 3.

For a given set of size, k, we shall call the smallest N with this property a minimal product-sum number. The minimal product-sum numbers for sets of size, k = 2, 3, 4, 5, and 6 are as follows.

k=2: 4 = 2 × 2 = 2 + 2
k=3: 6 = 1 × 2 × 3 = 1 + 2 + 3
k=4: 8 = 1 × 1 × 2 × 4 = 1 + 1 + 2 + 4
k=5: 8 = 1 × 1 × 2 × 2 × 2 = 1 + 1 + 2 + 2 + 2
k=6: 12 = 1 × 1 × 1 × 1 × 2 × 6 = 1 + 1 + 1 + 1 + 2 + 6

Hence for 2≤k≤6, the sum of all the minimal product-sum numbers is 4+6+8+12 = 30; note that 8 is only counted once in the sum.

In fact, as the complete set of minimal product-sum numbers for 2≤k≤12 is {4, 6, 8, 12, 15, 16}, the sum is 61.

What is the sum of all the minimal product-sum numbers for 2≤k≤12000?`;

var problem = new Problem88(problem_text);

console.log (problem.solve());
