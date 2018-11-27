class Hangman {
  constructor(word) {
    this.word = word.toLowerCase();
    this.hiddenWord = word.replace(/[а-яa-z]/gi, "_").trim();
  }

  guessLetter(letter) {
    if (this.containsLetter(letter)) {
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter)
          this.hiddenWord = this.replaceLetterAt(
            this.hiddenWord,
            i,
            this.word[i]
          );
      }
    }
  }

  containsLetter(letter) {
    if (this.word.indexOf(letter) !== -1) return true;
    return false;
  }

  replaceLetterAt(string, index, newLetter) {
    return (
      string.substr(0, index) +
      newLetter +
      string.substr(index + newLetter.length)
    );
  }

  get getHiddenWord() {
    return this.hiddenWord.split("").join(" ");
  }
}

class Game {
  constructor(word) {
    this.fails = 0;
    this.maxFails = 6;
    this.steps = 0;
    this.hangman = new Hangman(word);
    this.promptedLetters = [];
    this.hangFrames = [
      `
    _____
    |   
    |   
    |  
    `,
      `
    _____
    |   😕
    |
    |
    `,
      `
    _____
    |   😕
    |   |
    |
    `,
      `
    _____
    |   😕
    |  /|
    |
    `,
      `
    _____
    |   😕
    |  /|\\
    |
    `,
      `
    _____
    |   😕
    |  /|\\
    |  /
    `,
      `
    _____
    |   😕
    |  /|\\
    |  / \\
    `
    ];
  }

  start() {
    console.log(`Загаданное слово: \n ${this.hangman.getHiddenWord}`);
    while (this.fails < this.maxFails && !this.isWordGuessed()) {
      let letter = prompt("Угадай букву!");
      this.hangman.guessLetter(letter);
      if (!this.promptedLetters.includes(letter)) {
        this.promptedLetters.push(letter);
        if (!this.hangman.containsLetter(letter)) {
          this.fails++;
          console.log(this.hangFrames[this.fails]);
          console.log(
            `Не угадал, буквы "${letter}" здесь нет! Осталось ${this.maxFails -
              this.fails} попыток.`
          );
        } else console.log(this.hangman.getHiddenWord);
        this.steps++;
      } else console.log(`Буква "${letter}" уже была!`);
    }

    this.isWordGuessed()
      ? console.log(this.successEndGame())
      : console.log(this.failEndGame());
  }

  isWordGuessed() {
    if (this.hangman.hiddenWord.indexOf("_") === -1) return true;
    return false;
  }

  successEndGame() {
    return `Поздравляю, ты победил всего за ${this.steps} шага(ов)!`;
  }

  failEndGame() {
    return `Прости, ты сделал ${this.fails} ошибок и проиграл :(\nА слово было таким: ${this.hangman.word}`;
  }
}

let words = [
  "аддикция",
  "амбивалентность",
  "декадентство",
  "конгруэнтность",
  "эвфемизм",
  "эскалация",
  "катарсис",
  "фрустрация",
  "цугцванг"
];

let game = new Game(words[Math.floor(Math.random() * words.length)]);
game.start();
