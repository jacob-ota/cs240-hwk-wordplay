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
    //gets every letter from the key word and checks to see if any dictionary entries begin with those letters
    for(let i = 0; i < arr.length; i++) {
        let check_letter = arr[i];
        for(let j = 0; j < dictionary.length; j++) {
            if(dictionary[j].startsWith(check_letter) == true && dictionary[j].length >= 3 && dictionary[j].length <= 6){
                //uses find_words() below to find out if dictionary[j] is a true subset of the key word
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
                //add an arbitrary element to check_arr to check length
                check_arr.push("t");
                //replaces the just checked letter with a _ so it cannot be checked more than once
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

/**
 * Function that handles all the conditionals for user input, alerts user and updates the words list as 
 * appropriate for correctly guessed words, alerts user if other wise. Ends the game if all words are 
 * guessed or the user presses cancel and displays the end results.
 */
 function user_inp() {
    //create a array of all the subsets of a random word, array to hold guessed words, counter for correct guesses
    let good_words = all_words(word)
    let guessed_words = [];
    let correct_counter = 0;
    let shuffle_word = shuffler(word);
    //starting screen with scrammbled word and hidden words
    console.log("Scrambled Key Word: " + shuffle_word.join(""));
    console.log('\n');
    for(let i = 0; i < good_words.length; i++) {
        console.log(hide_words(good_words[i]))
    }
    //while loop that goes till all words are guessed
    while(correct_counter != good_words.length) {
        let input = prompt("Enter a guess:" );
        //shuffle letters
        if(input == '*') {
            shuffle_word = shuffler(shuffle_word);
            alert("SHUFFLING LETTERS \n Press OK to continue")
            //clear old console output and changes it using the newly shuffled word
            console.clear();
            console.log("Scrambled Key Word: " + shuffle_word.join(""));
            console.log('\n');
            for(let i = 0; i < good_words.length; i++) {
                if(guessed_words.includes(good_words[i])) {
                    console.log(good_words[i]);
                }
                else{
                    console.log(hide_words(good_words[i]))
                }
            }
        }
        //already guessed
        else if(guessed_words.includes(input)) {
            alert("Already chose this word, try again")
        }
        //cancel button
        else if(input == null) {
            break;
        }
        //not a english word, too small/big
        else if(!dictionary.includes(input) && (input.length < 3 || input.length > 6)) {
            alert("Not an english word!")
        }
        else if(input.length < 3) {
            alert("Word is too small")
        }
        else if(input.length > 6) {
            alert("Word is too big")
        }
        //guessed the right word, prints updated hidden words
        else if(good_words.includes(input)) {
            alert("Correct! " + input + " is one of the words!")
            //adds input to guessed_word array, updates correct_counter
            console.clear();
            guessed_words.push(input)
            correct_counter++;
            console.log("Scrambled Key Word: " + shuffle_word.join(""));
            console.log('\n');
            //update hidden words board to show correct word
            for(let i = 0; i < good_words.length; i++) {
                if(guessed_words.includes(good_words[i])) {
                    console.log(good_words[i]);
                }
                else{
                    console.log(hide_words(good_words[i]))
                }
            }
        }
        //incorrect guess
        else{
            alert("Incorrect! " + input + " is not a word!")
        }
    }
    //if all words are guessed
    if(correct_counter == good_words.length) {
        alert("CONGRATULATION!!! YOU GUESSED ALL THE WORDS! \n Press OK to show your results")
    }
    //finishing screen with correct guesses, and reveals the hidden words
    console.clear();
    console.log("You got: " + correct_counter + " out of " + good_words.length + " correct");
    console.log('\n');
    for(let i = 0; i < good_words.length; i++) {
        console.log(good_words[i])
    }

    /**
     * Function that takes an array of letters and shuffles them around to
     * produce a shuffled result of the original array of letters
     * 
     * @param {*} arr array of letters to be shuffled
     * @returns array of letters that have been shuffled from the original
     */
    function shuffler(arr) {
        for(let i = 0; i < arr.length; i++) {
            //chooses a random number out of the length of the array and the element at that index
            let random_idx = Math.floor(Math.random() * arr.length);
            let random_pick = arr[random_idx];
            //uses splice to switch the two indexs
            arr.splice(random_idx, 1, arr[i]);
            arr.splice(i, 1, random_pick);
        }
        return arr;
    }
}

const word = random_word();

user_inp();