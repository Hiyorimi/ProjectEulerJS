'use strict'

let fs = require('fs');
let Problem = require('./problem').Problem;

function Problem102 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem102.prototype = Object.create(Problem.prototype);
Problem102.prototype.constructor = Problem102;

Problem102.prototype.getLineLength = function (p1, p2) {
  return Math.sqrt( Math.pow(p2[0]-p1[0], 2) + Math.pow(p2[1]-p1[1], 2) );
}

Problem102.prototype.getTriangleArea  = function (point_A, point_B, point_C) {
  let AB = this.getLineLength(point_A, point_B),
      BC = this.getLineLength(point_B, point_C),
      CA = this.getLineLength(point_C, point_A);
  console.log(AB, BC, CA);
  let s = (AB + BC + CA) / 2; // semiperimeter
  

  // Heron's formula
  let area =  Math.sqrt(s*((s-AB)*(s-BC)*(s-CA)));
  return area;
}

Problem102.prototype.triangleContainsPoint  = function (point_A, point_B, point_C, point_X) {
  let area_ABX = this.getTriangleArea(point_A, point_B, point_X),
      area_BCX = this.getTriangleArea(point_B, point_C, point_X),
      area_CAX = this.getTriangleArea(point_C, point_A, point_X),
      area_ABC = this.getTriangleArea(point_A, point_B, point_C);

  return (Math.abs(area_ABC - (area_ABX + area_BCX + area_CAX)) < 0.1);
}


Problem102.prototype.getSolution = function () {
    
  let file = fs.readFileSync(__dirname + '/p102_triangles.txt');
  let result = 0;
  let point_X = [0,0];

  let strings = file.toString().split('\n');

  console.time("Bruteforce");

  for (let i = 0; i < strings.length-1; i++) {
    let triangle = strings[i];
    let coordinates = triangle.split(',').map((elem) => {return +elem});
    let point_A = [coordinates[0],coordinates[1]];
    let point_B = [coordinates[2],coordinates[3]];
    let point_C = [coordinates[4],coordinates[5]];
    if (this.triangleContainsPoint(point_A, point_B, point_C, point_X))
      result++;
  }




  console.timeEnd("Bruteforce");

  return result;
}

var problem_text = ``;

var problem = new Problem102(problem_text);

problem.solve();
