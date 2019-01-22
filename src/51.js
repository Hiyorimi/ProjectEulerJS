'use strict'

let Problem = require('./problem').Problem

/**
 * Sets Problem51
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem51 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
  this._primes = this.sieveOfEratosthenes(1000000);
}

Problem51.prototype = Object.create(Problem.prototype);
Problem51.prototype.constructor = Problem51;

Problem51.prototype.get5digitPatterns = function () {
    let patterns = [];
    patterns.push([1,0,0,0,1]);
    patterns.push([0,1,0,0,1]);
    patterns.push([0,0,1,0,1]);
    patterns.push([0,0,0,1,1]);

    return patterns;
}

Problem51.prototype.get6digitPatterns = function () {
    let patterns = [];
    patterns.push([1, 1, 0, 0, 0, 1]);
    patterns.push([1, 0, 1, 0, 0, 1]);
    patterns.push([1, 0, 0, 1, 0, 1]);
    patterns.push([1, 0, 0, 0, 1, 1]);
    patterns.push([0, 1, 1, 0, 0, 1]);
    patterns.push([0, 1, 0, 1, 0, 1]);
    patterns.push([0, 1, 0, 0, 1, 1]);
    patterns.push([0, 0, 1, 1, 0, 1]);
    patterns.push([0, 0, 1, 0, 1, 1]);
    patterns.push([0, 0, 0, 1, 1, 1]);

    return patterns;
}


Problem51.prototype.generateNumber = function (pattern, number, digit) {
    let result = 0;
    let temp = number;
    let power = 1;
    let multiplier = 1;
    for (let i = pattern.length-1; i >= 0; i--) {
        if (pattern[i] == 1) {
            multiplier = temp % 10;
        }
        else multiplier = digit;
        result += multiplier * power;
        power *= 10;
        //without round we will get floats
        temp = Math.floor(temp / 10);
    }
    return result;
}

Problem51.prototype.isPrime = function (num) {
  for (var i=0;i<this._primes.length;i++){
    if (num==this._primes[i])
      return true;
  }
  return false;
}


Problem51.prototype.getFamilyLength = function (family) {
    let family_length = 0;
    for (let i = 0; i < family.length; i++) {
        if ((this.isPrime(family[i])) && family[i].toString().length > 4)
            family_length++;
    }
    return family_length;
}

Problem51.prototype.getSolution = function () {
    let starting_index = 20;
    for (; starting_index < this._primes.length; starting_index++) {
        if (this._primes[starting_index] == 56003)
            break;
    }



    console.time("Bruteforce");

    let candidate_starting_number = 0;
    let patterns = [];
    let pattern_family = []
    for (let i = starting_index; i < this._primes.length; i++) {
        candidate_starting_number = this._primes[i];
        if (candidate_starting_number.toString().length < 6) 
            patterns = this.get5digitPatterns();
        else
            patterns = this.get6digitPatterns();
        let family_length = 0;
        for (let p_i = 0; p_i < patterns.length; p_i++) {
            //Generate all numbers for current pattern
            pattern_family = [];
            for (let digit = 0; digit < 10; digit++) {
                pattern_family.push(this.generateNumber(patterns[p_i], 
                candidate_starting_number, digit));
            }
            family_length = this.getFamilyLength(pattern_family);
            if (family_length == 8) {
                break;
            }
        }
        if (family_length == 8) {
            break;
        }
    }

    console.timeEnd("Bruteforce");

    //pattern_family[0] will be a number with leading 0, so, we 
    //return pattern_family[1]
    return pattern_family[1];
}

let problem_text = `
By replacing the 1st digit of *3, it turns out that six of the nine possible 
values: 13, 23, 43, 53, 73, and 83, are all prime.
\n
By replacing the 3rd and 4th digits of 56**3 with the same digit, this 
5-digit number is the first example having seven primes among the ten 
generated numbers, yielding the family: 56003, 56113, 56333, 56443, 
56663, 56773, and 56993. Consequently 56003, being the first member 
of this family, is the smallest prime with this property.
\n
Find the smallest prime which, by replacing part of the number (not 
necessarily adjacent digits) with the same digit, is part of an eight 
prime value family.`;


let problem = new Problem51(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
