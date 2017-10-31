'use strict'

let Problem = require('./problem').Problem;

function Problem75 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem75.prototype = Object.create(Problem.prototype);
Problem75.prototype.constructor = Problem75;



Problem75.prototype.getSolution = function () {

  let limit = 1500000,
      triangles = [],
      result = 0,
      m_limit = Math.sqrt( limit/2 );
    
  console.time("Bruteforce");
  for (let i = 0; i <= limit; i++)
    triangles[i] = 0;

  for (let m = 2; m < m_limit; m++) {
    for (let n = 1; n < m; n++) {
      if ( ((n+m) % 2 == 1) && (this.gcd(n,m) == 1)) {
        let a = m * m + n * n;
        let b = m * m - n * n;
        let c = 2 * m * n;
        let p = a + b + c;
        while (p <= limit) {
          triangles[p]++;
          if (triangles[p] == 1) {
            result++;
          }
          if (triangles[p] == 2)
            result --;
          p += a + b + c;
        }
      }
    }
  };
  

  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = `
It turns out that 12 cm is the smallest length of wire that can 
be bent to form an integer sided right angle triangle in exactly 
one way, but there are many more examples.
\n
12 cm: (3,4,5)
24 cm: (6,8,10)
30 cm: (5,12,13)
36 cm: (9,12,15)
40 cm: (8,15,17)
48 cm: (12,16,20)
\n
In contrast, some lengths of wire, like 20 cm, cannot be bent to 
form an integer sided right angle triangle, and other lengths 
allow more than one solution to be found; for example, using 120 
cm it is possible to form exactly three different integer sided 
right angle triangles.

120 cm: (30,40,50), (20,48,52), (24,45,51)

Given that L is the length of the wire, for how many values of L ≤ 1,500,000 can exactly one integer sided right angle triangle be formed?
`;

var problem = new Problem75(problem_text);

console.log (problem.solve());
