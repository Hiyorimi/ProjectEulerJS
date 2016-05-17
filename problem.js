'use strict'

function Problem (problem_text) {
  this._problem_text = problem_text;
}

Problem.prototype = {
    getProblemText: function () {
        return this._problem_text;
    },

    getSolution: function () {
        return 0;
    },

    solve: function () {
        return this.getProblemText() + "\nAnswer: " + this.getSolution();
    }
}

module.exports = new Problem();
module.exports.Problem = Problem;