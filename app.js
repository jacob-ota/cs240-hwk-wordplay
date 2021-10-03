/**
 * Fuction that creates a list of all the 6 letter words in the dictionary
 * and then from there it finds a random word out of that list and returns
 * an array of the letters of that chosen word.
 * 
 * @returns an array of the letters of a random six letter word
 */
function random_word() {
    let six_letter_arr = [];
    //find all words that have a length of 6 letters and add them to six_letter_arr
    for(let i = 0; i < dictionary.length; i++) {
        if(dictionary[i].length == 6) {
        six_letter_arr.push(dictionary[i]);
        }
    }
    //get a random number to use as an index for the random word and array the word
    let random_num = Math.floor(Math.random() * six_letter_arr.length);
    let random_word = six_letter_arr[random_num];
    let letters = random_word.split("");
    return letters;
}

/**
 * Function that takes in a word and for every letter it is replaced with
 * a underscore and then the return would be the string of underscores.
 * 
 * @param {*} str a word to be changed to all underscores
 * @returns a string of underscores with the length of the param word
 */
function hide_words(str) {
    let blank_word = str
    let blank = "";
    //for loop that takes every letter in a word and replace them with underscores
    for(let i = 0; i < str.length; i++) {
        blank = blank_word.replace(str[i], "_ ");
        blank_word = blank
    }
    return blank;
}

const word = random_word();

console.log("word:" + word.join(""));
console.log(hide_words(word.join("")))