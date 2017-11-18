'use strict'

let Problem = require('./problem').Problem    
//big-integer is better than BigInt 
let bigInt = require("big-integer");

// From http://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

/**
 * Sets Problem54
 * @class Class for solviong projecteuler 51th problem
 * @param {String} problem_text - Task as text
 * @param {Object} arguments - Arguments array 
 */
function Problem54 (problem_text, input_arguments) {
  Problem.apply(this, arguments);
}

Problem54.prototype = Object.create(Problem.prototype);
Problem54.prototype.constructor = Problem54;
let values = '2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A';
Problem54.prototype.values = values.toString().replace(/ /g, "").trim(' ').split(',');

/**
 * score_card(card) scores single card
 *
 * @param {Char} a
 * @return {Int} score of a card
 */
Problem54.prototype.score_card = function (a) {
    return Problem54.prototype.values.indexOf(a);
}

/**
 * compare_cards(sequence) scores a hand as sequence of strings
 *
 * @param {Char} a
 * @param {Char} b
 * @return {Int} 1 if a > b, -1 otherwise
 */
Problem54.prototype.compare_cards = function (a,b) {
    if (Problem54.prototype.values.indexOf(a) > Problem54.prototype.values.indexOf(b)) return 1;
    if (Problem54.prototype.values.indexOf(a) < Problem54.prototype.values.indexOf(b)) return -1;
}

/**
 * get_tied_score(sequence) scores a hand as sequence of strings
 *
 * @param {Array} cards
 * @param {Int} score
 * @param {Array} pattern
 * @return {Array} true_score
 */
Problem54.prototype.get_tied_score = function (cards, score, pattern) {
    let true_score = [score];
    let cards_count = {};
    let card_value = '';
    let key = '';
    let sorted_by_pattern = {};
    cards.forEach(function(x) { cards_count[x] = (cards_count[x] || 0)+1; });

    let score_card = Problem54.prototype.score_card;
    let compare_cards = Problem54.prototype.compare_cards;

    if (pattern.equals([1,1,1,1,1])) {
        for (let i = cards.length; i >= 0; i--)
            true_score.push(score_card(cards[i]));
    }
    if (pattern.equals([4,1])) {
        for (key in cards_count) {
            if (cards_count==4) 
                true_score.push(score_card(key))
        }
        for (key in cards_count) {
            if (cards_count==1) 
                true_score.push(score_card(key))
        }
    }
    if (pattern.equals([3,2])) {
        for (key in cards_count) {
            if (cards_count==3) 
                true_score.push(score_card(key))
        }
        for (key in cards_count) {
            if (cards_count==2) 
                true_score.push(score_card(key))
        }
    }
    if (pattern.equals([3,1,1])) {
        let two_remaining_cards = [];
        for (key in cards_count) {
            if (cards_count==3) 
                true_score.push(score_card(key));
            else
                two_remaining_cards.push(key);
        }
        true_score = true_score.concat(two_remaining_cards.sort(compare_cards));
    }
    if (pattern.equals([2,2,1])) {
        let two_pairs_scores = [];
        for (key in cards_count) {
            if (cards_count==2) 
                two_pairs.push(score_card(key))
        }
        true_score = true_score.concat(two_pairs_scores.sort().reverse());
        for (key in cards_count) {
            if (cards_count==1) 
                true_score.push(score_card(key))
        }
    }
    if (pattern.equals([2,1,1,1])) {
        let remaining_scores = [];
        for (key in cards_count) {
            if (cards_count==2) 
                true_score.push(score_card(key))
            else
                remaining_scores.push(score_card(key));
        }
        true_score = true_score.concat(remaining_scores.sort().reverse());
    }


    return true_score;
}



/**
 * score_hand(sequence) scores a hand as sequence of strings
 *
 * @param {Array} sequence
 * @return {Int} returns score as number
 */
Problem54.prototype.score_hand = function (sequence) {

    let cards = [];
    let suits = [];
    try {
        for (var i = 0; i<5; i++) {
                cards.push(sequence[i][0]);
                suits.push(sequence[i][1]);
        }
    }
    catch (TypeError) {
        console.log('Empty sequence');
    }
    cards = cards.sort(this.compare_cards);

    let cards_count = {};
    cards.forEach(function(x) { cards_count[x] = (cards_count[x] || 0)+1; });

    // Returns true, if all cards are of the same suit
    var is_same_suit = function (suits) {
        let counts = {};
        suits.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        //console.log(counts);
        return (Object.keys(counts).length==1);
    }

    let same_suits = is_same_suit(suits);

    // Ten, Jack, Queen, King, Ace, in same suit.
    var is_royal_flush = function (cards) {
        let royal_flush_cards = ['T', 'J', 'Q', 'K', 'A'];
        let royal_flush = true;
        for (let i = 0; i < 5; i++) {
            if (royal_flush_cards[i] != cards[i]) {
                royal_flush = false;
                break;
            }
        }

        return royal_flush;
    };

    // Four cards of the same value.
    var is_four_of_a_kind = function (cards) {
        for (var key in cards_count) {
            if (cards_count[key] >= 4)
                return true;
        }
        return false;
    };

    // Three of a kind and a pair.
    var is_full_house = function (cards) {
        let keys = Object.keys(cards_count);
        if (((cards_count[keys[0]] == 2) && (cards_count[keys[1]] == 3)) ||
            ((cards_count[keys[1]] == 2) && (cards_count[keys[0]] == 3))
            )
            return true;
        else
            return false;
    };

    // All cards of the same suit.
    var is_flush = function (suits) {
        return is_same_suit(suits);
    };

    // All cards are consecutive values.
    var is_straight = function (cards) {
        for (let i = 0; i < 8; i++) {
            let is_subsequence = true;
            for (let j = 0; j < 5; j++) {
                if (Problem54.prototype.values[i+j] != cards[j]) {
                    is_subsequence = false;
                    break;
                }
            }
            if (is_subsequence)
                return true;
        }
        return false;
    };

    // Three cards of the same value.
    var is_three_of_a_kind = function (cards) {
        for (var key in cards_count) {
            if (cards_count[key] >= 3)
                return true;
        }
        return false;
    };

    // Count pairs
    var count_pairs = function (cards) {
        var counter = 0;
        for (var key in cards_count) {
            if (cards_count[key] >= 2)
                counter++;
        }
        return counter;
    }

    // Two different pairs.
    var is_two_pairs = function (cards) {
        if (count_pairs(cards) == 2)
            return true;
        return false;
    };
    // Two cards of the same value.
    var is_one_pair = function (cards) {
        if (count_pairs(cards) == 1)
            return true;
        return false;
    };

    // Returns highest value card.
    var score_highest_card = function (cards) {
        if (count_pairs(cards) == 0)
            return Problem54.prototype.values.indexOf(cards[4]);
        throw new DOMException();
    };

    // *****************
    // Starting to count
    // *****************

    let get_tied_score = this.get_tied_score;

    if (is_royal_flush(cards)) {
        if (same_suits)             
            return [21];
    }
    // Straight flush
    if (same_suits) {
        // All cards are consecutive values of same suit.
        if (is_straight(cards)) {
            return get_tied_score(cards, 20,[1,1,1,1,1]);
        }
    }
    if (is_four_of_a_kind(cards)) {
            return get_tied_score(cards, 19,[4,1]);
    }
    if (is_full_house(cards)) {
            return get_tied_score(cards, 18,[3,2]);
    }
    // If we have same suits and we got here, it is a flush
    if (same_suits) {
        return get_tied_score(cards, 17,[1,1,1,1,1]);
    }
    else {
        if (is_straight(cards)) {
            return get_tied_score(cards, 16,[1,1,1,1,1]);
        }
        if (is_three_of_a_kind(cards)) {
            return get_tied_score(cards, 15, [3,1,1]);
        }
        if (is_two_pairs(cards)) {
            return get_tied_score(cards, 14, [2,2,1]);
        }
        if (is_one_pair(cards)) {
            return get_tied_score(cards, 13, [2,1,1,1]);
        }
        else 
            return get_tied_score(cards, score_highest_card(cards), [1,1,1,1,1]);
    }

}



/**
 * first_player_wins(sequence) returns true if first players
 *  score is greater than second player score
 *
 * @param {Array} sequence
 * @return {Boolean} result
 */
Problem54.prototype.first_player_wins = function (sequence) {
    let first_player_hand = sequence.slice(0,5);
    let second_player_hand = sequence.slice(5);
    let first_player_score = this.score_hand(first_player_hand);
    let second_player_score = this.score_hand(second_player_hand);

    
    for (let i = 0; i < first_player_score.length; i++) {
        if (first_player_score[i] != second_player_score[i])
            return (first_player_score[i] > second_player_score[i])
    }
    return true;
}

Problem54.prototype.getSolution = function () {
    
    

    let fs = require('fs');
    let file_contents = fs.readFileSync(__dirname + '/p054_poker.txt');

    console.time("Bruteforce");
    let strings = file_contents.toString().split('\n');
    let hands = [];
    let counter = 0;
    for (let i = 0; i < strings.length; i++) {
        hands = strings[i].toString().split(' ');
        if (this.first_player_wins(hands)) 
            counter++;
    }

    console.timeEnd("Bruteforce");

    return counter;
}

let problem_text = `
In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:
\n
High Card: Highest value card.
One Pair: Two cards of the same value.
Two Pairs: Two different pairs.
Three of a Kind: Three cards of the same value.
Straight: All cards are consecutive values.
Flush: All cards of the same suit.
Full House: Three of a kind and a pair.
Four of a Kind: Four cards of the same value.
Straight Flush: All cards are consecutive values of same suit.
Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
The cards are valued in the order:
2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
\n
If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives (see example 1 below). But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared (see example 4 below); if the highest cards tie then the next highest cards are compared, and so on.
\n
Consider the following five hands dealt to two players:
\n
Hand	 	Player 1	 	Player 2	 	Winner
1	 	5H 5C 6S 7S KD
Pair of Fives
 	2C 3S 8S 8D TD
Pair of Eights
 	Player 2
2	 	5D 8C 9S JS AC
Highest card Ace
 	2C 5C 7D 8S QH
Highest card Queen
 	Player 1
3	 	2D 9C AS AH AC
Three Aces
 	3D 6D 7D TD QD
Flush with Diamonds
 	Player 2
4	 	4D 6S 9H QH QC
Pair of Queens
Highest card Nine
 	3D 6D 7H QD QS
Pair of Queens
Highest card Seven
 	Player 1
5	 	2H 2D 4C 4D 4S
Full House
With Three Fours
 	3C 3D 3S 9S 9D
Full House
with Three Threes
 	Player 1
The file, poker.txt, contains one-thousand random hands dealt to two players. Each line of the file contains ten cards (separated by a single space): the first five are Player 1's cards and the last five are Player 2's cards. You can assume that all hands are valid (no invalid characters or repeated cards), each player's hand is in no specific order, and in each hand there is a clear winner.
\n
How many hands does Player 1 win?`;

let problem = new Problem54(problem_text, process.argv.splice(2,process.argv.length-1));

problem.solve();
