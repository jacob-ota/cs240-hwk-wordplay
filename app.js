function random_word() {
    let six_letter_arr = [];

    for(let i = 0; i < dictionary.length; i++) {
        if(dictionary[i].length == 6) {
        six_letter_arr.push(dictionary[i]);
        }
    }

    let random_num = Math.floor(Math.random() * six_letter_arr.length);

    let random_word = six_letter_arr[random_num];

    let letters = random_word.split("");

    return letters;
}

const word = random_word();

console.log("word:" + word.join(""));