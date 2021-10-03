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
 * Function that takes in a key word and finds words that start with every
 * letter, and is between a length of 3 and 6. From there it checks to see 
 * if the word is a true subset of the key word and then pushes that to a
 * array to be returned. Credit: Set mdn for removing duplicates
 * 
 * @param {*} arr takes in the random key word as an array
 * @returns an array of words that is a subset of the random key word
 */
function all_words(arr) {
    const correct_word_arr = [];
    //gets every letter from the key word and checks to see if any entries
    //in the dictionary start with that letter and is a length of 3-6
    for(let i = 0; i < arr.length; i++) {
        let check_letter = arr[i];
        for(let j = 0; j < dictionary.length; j++) {
            if(dictionary[j].startsWith(check_letter) == true && dictionary[j].length >= 3 && dictionary[j].length <= 6){
                //uses find_words() below to find out if dictionary[j] is
                //a true subset of the key word
                let checked_word = find_words(dictionary[j]);
                if(checked_word != undefined) {
                    correct_word_arr.push(checked_word);    
                }
            }
            }
        }

    /**
     * Function that creates an array to hold a set of "t"'s and a variable
     * that holds the key word. Checks to see if all letters of the word to 
     * be checked is inluded in the key word, and if the letter exists it 
     * will replace that letter with a underscore so it cannot be checked more 
     * than once. It also adds a "t" to the array of "t"'s and after that it 
     * checks to see if the array of "t"'s is equal to the lenth of the word. 
     * If it is then that word is a true subset of the key word.
     * 
     * @param {*} try_word a word that sees if it is a true subset
     * @returns the word if it is a true subset or undefined if it isn't
     */
    function find_words(try_word) {
        let check_arr = [];
        let splice_word = word.join("");
        for(let i = 0; i < try_word.length; i++) {
            //checks to see if all letters are in the key word
            if(splice_word.includes(try_word[i])) {
                let to_splice = try_word[i];
                //add an element to check_arr to check length
                check_arr.push("t");
                //replaces the just checked letter with a _ so it cannot
                //checked more than once
                splice_word = splice_word.replace(to_splice, "_");
            }
        }
        //if the check_arr is as long as the length of the word it is a subset
        if(check_arr.length == try_word.length) {
            return try_word;
        }
        else {
            return undefined;
        }
    }
    //used Set mdn for a way to remove duplicates
    let no_dups_arr = [...new Set(correct_word_arr)];
    return no_dups_arr;
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

let good_words = all_words(word)

good_words.sort()

console.log(good_words)
console.log("word:" + word.join(""));
for(let i = 0; i < good_words.length; i++) {
    console.log(hide_words(good_words[i]))
}