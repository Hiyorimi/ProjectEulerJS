/**
 * Sets Problem
 * @class Class for projecteuler problem. input_arguments
 *
 * @param {String} problem_text - Task as text
 * @param {Object} input_arguments - have default value for backward compatibility
 * @param {Object} arguments - Arguments array
 */
function Problem(problem_text, input_arguments) {
  input_arguments = typeof input_arguments !== 'undefined' ? input_arguments : NaN;
  this._problem_text = problem_text;
  this._arguments = input_arguments; 
  this.cached_factorials = [1,1,2];
  for (var i=3; i < 10; i++)
    this.cached_factorials.push(this.factorial(i));
}


/**
 * getProblemText() returns text of the problem
 *
 * @return {String} this._problem_text
 */
Problem.prototype.getProblemText = function () {
  return this._problem_text;
}

/**
 * getSolution() is an abstract function for calculating the answer
 *
 * @return {Int} 0
 */
Problem.prototype.getSolution = function () {
  return 0;
}

/**
 * solve() prints _problem_text and answer, for which calls this.getSolution()
 * as String. It also return 0 for backward compatibility
 *
 * @return {Int} 0
 */
Problem.prototype.solve = function () {
  console.log(this.getProblemText() + "\nAnswer: " + this.getSolution());
  return 0; 
}


/**
 * isPrime(number) checks if number is a prime
 *
 * @param {Int} number
 * @return {Int} denominator or false
 */
Problem.prototype.isPrime = function (number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

/**
 * factorial(n) returns n!
 *
 * @param {Int} n
 * @return {Int} n!
 */
Problem.prototype.factorial = function (n) {
    var result = 1

    if ( n<=1 ) { 
        return 1; 
    }
    else { 
      while ( n != 1 )
      {
         result = result * n;
         n--;
      }
    }
    return result;
}


/**
 * getDigitsFactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getDigitsFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.Factorial(digits[i]);
  }

  return sum;
}

/**
 * getCachedfactorialSum(digits) sum of factorials of digits
 *
 * @param {Array} digits
 * @return {Int} sum
 */
Problem.prototype.getCachedFactorialSum = function (digits) {
  var sum = 0;
  for (var i in digits) {
    sum += this.cached_factorials[digits[i]];
  }

  return sum;
}


/**
 * getDigits(n) returns digits of input number
 *
 * @param {Int-like} n
 * @return {Array} digits
 */
Problem.prototype.getDigits = function (n) {
    digits = n
    if (parseInt(n) < 0)
        digits = (-1 * parseInt(n)).toString()
    return digits.toString().split('').map(function (elem) {
        return +elem;
    });
}


/**
 * sumDigits(number) returns sum of all digits of the number
 *
 * @param {Int-like} number
 * @return {Int} result
 */
Problem.prototype.sumDigits = function(number) {
    let number_as_array = this.getDigits(number);
    return number_as_array.reduce( (sum, elem) => {return sum+elem; });
}

/**
 * getRandomIntInclusive(n) returns random Int [min, max]
 *
 * @param {Int} min
 * @param {Int} max
 * @return {Int} random
 */
Problem.prototype.getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


/**
 * getPermutations(input_arr) returns all permutations of input_arr elements
 * From: http://stackoverflow.com/questions/9960908/permutations-in-javascript
 * 
 * @param {Int} input_arr - array to permutate
 * @return {Array} permutated
 */
Problem.prototype.getPermutations = function (input_arr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(input_arr);
}

/**
 * isPandigital(arr) returns true if all digits are different and are in range 1-9
 *
 * @param {Object} arr of 9 numbers.
 * @return {Bool} result
 */
Problem.prototype.isPandigital = function (arr) {
    
      if (arr.length != 9)
        return false;
    
      var result = true;
      var s = '';
      var chars = {};
    
      for (var i = 0; i < arr.length; i++) {
        s = arr[i].toString();
        for (var j = 0; j < s.length; j++) {
          if (s[j]=='0') {
            result = false;
            break;
          }
          if (!(s[j] in chars)) {
            chars[s[j]] = 1;
          }
          else {
            result = false;
            break;
          }
        }
      }
    
    
      return result;
}



/**
 * sieveOfEratosthenes(max) returns primes below max
 * From http://stackoverflow.com/questions/15491291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-number
 *
 * @param {Int} max
 * @return {Array} output
 */
Problem.prototype.sieveOfEratosthenes = function (max) {
    // Eratosthenes algorithm to find all primes under max
    let array = [], upperLimit = Math.sqrt(max), output = [];

    // Make an array from 2 to (n - 1)
    for (let i = 0; i < max; i++) {
        array.push(true);
    }

    // Remove multiples of primes starting from 2, 3, 5,...
    for (let i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (let j = i * i; j < max; j += i) {
                array[j] = false;
            }
        }
    }

    // All array[i] set to true are primes
    for (let i = 2; i < max; i++) {
        if(array[i]) {
            output.push(i);
        }
    }

    return output;
}



/**
 * getSortedKeys(onj) returns dictionary sorted by values
 *
 * @param {Dict} obj
 * @return {Array} sorted array of keys (desc)
 */
Problem.prototype.getSortedKeys = function (obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}


/**
 * getDivisors(number) returns number divisors
 * from http://jsfiddle.net/r8wh715t/
 * 
 * @param {Int} number
 * @return {Array} divisors
 */
Problem.prototype.getDivisors = function (num, exclude_self) {
    var exclude_self = typeof exclude_self !== 'undefined' ? exclude_self : false;
    var divisors = [1] // 1 will be a part of every solution.
    var half = Math.floor(num / 2), // Ensures a whole number <= num.
        i, j;

    // Determine out increment value for the loop and starting point.
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? divisors.push(i) : false;
    }

    if (!exclude_self)
      divisors.push(num); // 
    return divisors;
}

//from http://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
function getFactors(num) {
    var factors = [1]; // 1 will be a part of every solution.
    var half = Math.floor(num / 2), // Ensures a whole number <= num.
        i, j;

    // Determine our increment value for the loop and starting point.
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i <= half; i += j) {
        num % i === 0 ? factors.push(i) : false;
    }

    factors.push(num); // Always include the original number.
    return factors.length;
} 



/**
 * gcd(a, b) returns greatest commond divisor
 *
 * @param {Int} a
 * @param {Int} b
 * @return {Int} gcd
 */
Problem.prototype.gcd = function (a, b) {
    if (!b) {
      return a;
    }
  
    return this.gcd(b, a % b);
  }
  

/**
 * getProperDivisors(number) returns number proper divisors.
 * The proper divisors of a number are all the divisors 
 * excluding the number itself.
 * from http://jsfiddle.net/r8wh715t/
 * 
 * @param {Int} number
 * @return {Array} proper_divisors
 */
Problem.prototype.getProperDivisors = function (num) {
    return this.getDivisors(num, true);
}


/**
 * getPolygonalNumber(a,n) returns a corresponding polygonal number P_(a,n)
 *
 * @param {Int} a — arity of polygonal number to generate
 * @param {Int} n — number for which polygonal number is generated
 * @return {Int} P_(a,n)
 */
Problem.prototype.getPolygonalNumber = function (a, n) {
    let result = false;
    switch (a) {
        case 3: {
            result = (n*(n+1))/2;
            break;
        }
        case 4: {
            result = n*n;
            break;
        }
        case 5: {
            result = (n*(3*n-1))/2;
            break;
        }
        case 6: {
            result = n*(2*n-1);
            break;
        }
        case 7: {
            result = (n*(5*n-3))/2;
            break;
        }
        case 8: {
            result = n*(3*n-2);
            break;
        }
        default: {
            throw new Error('a should be in [3,8]');
        }
    }
    return result;
}


/**
 * permute (string) returns an array with all permutations of a
 * given subset size
 * 
 * From: https://stackoverflow.com/questions/7234319/list-permutations
 *
 * @param {String} input — string of elements to be permuted
 * @param {Int} size — length of subset to draw
 * @return {Object} result
 */
Problem.prototype.permute = function (input, size) {

    var chars = input.split('');
    var output = [];
    var used = new Array(chars.length);     

    var results = [];    
    
    function doPermute(input, output, used, size, level) {        
            
        if (size == level) {
            var word = output.join('');
            results.push(word);
            return;
        } 
        
        level++;
        
        for (var i = 0; i < input.length; i++) {
            if (used[i]) {
                continue;
            }            
            used[i] = true;
            output.push(input[i]);
            doPermute(input, output, used, size, level);
            used[i] = false;
            output.pop();
        }
    }

    doPermute(chars, output, used, size, 0);

    return results;   
}



/**
 * getAllSubsetPermutations (string) returns an array with all permutations of a
 * given subset, including that of length N
 *
 * @param {String} input — string of elements to be permuted
 * @return {Object} result
 */
Problem.prototype.getAllSubsetPermutations = function (input) {

    let result = {};
    for (let i = 2; i <= input.length; i++) {
        result[i] = this.permute(input, i);
    }
    
    return result;   
}

/**
 * getUniqueString (string) returns unique chars from input string
 *
 * @param {Object} string — string to check
 * @return {Object} result
 */
Problem.prototype.getUniqueString = function (str) {
    let length = 0;
    let unique = '';
    for (var x = 0; x < str.length; x++) {

        if(unique.indexOf(str.charAt(x))==-1) {
            unique += str[x];
        }
    }
    return unique;  
} 

/**
 * isSquare (square) returns if number is a square of int
 *
 * @param {Int} square — int to check
 * @return {Bool} result
 */
Problem.prototype.isSquare = function (square) {
    if (Math.sqrt(square) % 1 === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * isPalindrom() is a function for checking if input string is palindrom
 *
 * @param {String} str - input string
 * @return {Bool} 
 */
Problem.prototype.isPalindrom = function (str) {
    return str == str.split('').reverse().join('');
}


/**
 * K-combinations from https://gist.github.com/axelpale/3118596
 * 
 * Get k-sized combinations of elements in a set.
 * 
 * Usage:
 *   kCombinations(set, k)
 * 
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 * 
 * Return:
 *   Array of found combinations, size of a combination is k.
 * 
 * Examples:
 * 
 *   kCombinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 * 
 *   kCombinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 * 
 *   kCombinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 * 
 *   kCombinations([1, 2, 3], 4)
 *   -> []
 * 
 *   kCombinations([1, 2, 3], 0)
 *   -> []
 * 
 *   kCombinations([1, 2, 3], -1)
 *   -> []
 * 
 *   kCombinations([], 0)
 *   -> []
 */
Problem.prototype.kCombinations = function (set, k) {
    var i, j, combs, head, tailcombs;
    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
    return [];
        }
    // K-sized set has only one K-sized subset.
    if (k == set.length) {
    return [set];
        }
    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
            combs = [];
    for (i = 0; i < set.length; i++) {
    combs.push([set[i]]);
            }
    return combs;
        }
    // Assert {1 < k < set.length}
    // Algorithm description:
    // To get k-combinations of a set, we want to join each element
    // with all (k-1)-combinations of the other elements. The set of
    // these k-sized sets would be the desired result. However, as we
    // represent sets with lists, we need to take duplicates into
    // account. To avoid producing duplicates and also unnecessary
    // computing, we use the following approach: each element i
    // divides the list into three: the preceding elements, the
    // current element i, and the subsequent elements. For the first
    // element, the list of preceding elements is empty. For element i,
    // we compute the (k-1)-computations of the subsequent elements,
    // join each with the element i, and store the joined to the set of
    // computed k-combinations. We do not need to take the preceding
    // elements into account, because they have already been the i:th
    // element so they are already computed and stored. When the length
    // of the subsequent list drops below (k-1), we cannot find any
    // (k-1)-combs, hence the upper limit for the iteration:
        combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
            head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
            tailcombs = this.kCombinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
    combs.push(head.concat(tailcombs[j]));
            }
        }
    return combs;
    }


/**
 * doesArrayOfArraysContainArray() is a function for 
 * checking if array contains an array
 *
 * @param {Object} arrayOfArrays - bigger array
 * @param {Object} array - array
 * @return {Bool} 
 */
Problem.prototype.doesArrayOfArraysContainArray = 
                                    function (arrayOfArrays, array){
  var aOA = arrayOfArrays.map(function(arr) {
      return arr.slice();
  });
  var a = array.slice(0);
  for(let i=0; i<aOA.length; i++){
    if(aOA[i].sort().join(',') === a.sort().join(',')){
      return true;
    }
  }
  return false;
}


module.exports = new Problem();
module.exports.Problem = Problem;
