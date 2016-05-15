'use strict'
var problem = `A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
\n
a2 + b2 = c2
For example, 32 + 42 = 9 + 16 = 25 = 52.
\n
There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.`
console.log(problem);

function getProduct (str){
	var product = 1;
	for (var i=0;i<str.length;i++) {
		product *= +str[i];
	}
	console.log(str,product);
	return product;
}

function solution () {
	var a=0, b=0, c=0;
	for (;a<998;a++) {
		for (b=a+1;b<998; b++) {
			c = 1000 - a - b;
			if ((c!=a) && (c!=b)) {
				if (Math.pow(a,2)+Math.pow(b,2)==Math.pow(c,2)) return a*b*c;
			}
		}
	}
}

function solve () {
  return "Answer: " + solution();
}

console.log (solve());
