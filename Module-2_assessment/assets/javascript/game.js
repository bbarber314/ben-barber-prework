let alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); //list of the alphabet, to check if the key pressed is a letter
let possibleWords = ["doctor","dalek","cyberman","tardis","companion","rose","martha","donna","amy","rory","pond","clara","bill","nardole","river","song","regeneration"]; //my themed words
const gameState = {
    word : "doctor", //just supplying a default word here, in case it fails to initialize somehow
    wordToBeGuessed : [], //array holding the correct answer
    correctGuesses : [], //array holding the current guesses
    wins : 0, //number of wins by the user
    games : 0, //number of games played by the user
    incorrectGuesses : [], //array holding the incorrect guesses of the user
    guessesRemaining : 13, //total number of wrong guesses allowed

    pickWord : function(listOfWords){ //This function does what's on the sticker: it takes a random word from the possibleWords list, and saves it to gameState word
        let randomNumber = Math.floor(Math.random()*listOfWords.length);
        console.log(randomNumber);
        this.word = listOfWords[randomNumber];
    },

    makeBlank : function(){ //This populates the wordToBeGuessed array based on the current word and it populates the correctGuesses array based on the length of the wordToBeGuessed array
        this.wordToBeGuessed=this.word.split("");
        let blank = [];
        for (i=0; i<this.wordToBeGuessed.length; i++) {
            blank.push("_ ");
        }
        this.correctGuesses = blank;
    },

    updateDisplay : function(){//This one updates the commonly occurring fields on the HTML page: what the current guess is, how many guesses are left, and what the wrong guesses were
        let correctGuessesH3 = document.querySelector('#wordToBeGuessed');
        let guessesLeftH3 = document.querySelector('#guessesLeft');
        let wrongGuessesH3 = document.querySelector('#wrongGuesses');

        let currentGuess = "" //make the string of the current state of the guess
        for (i=0;i<this.correctGuesses.length;i++){
            currentGuess += this.correctGuesses[i];
        }

        let wrongGuess = "" //make a string of the current state of incorrect guesses. Be clever about it so the last letter guessed doesn't have a trailing comma
        if(this.incorrectGuesses.length>1){
            for (i=0;i<this.incorrectGuesses.length-1;i++){
                wrongGuess += this.incorrectGuesses[i]+", ";
            }
            wrongGuess +=this.incorrectGuesses[this.incorrectGuesses.length-1]
        } else if (this.incorrectGuesses.length===1){
            wrongGuess +=this.incorrectGuesses[0];
        }

        //populate all the H3 headers! All of them! (except the ones that only changes on win/loss)
        correctGuessesH3.innerText = currentGuess;
        guessesLeftH3.innerText = this.guessesRemaining;
        wrongGuessesH3.innerText = wrongGuess;
    },

    winUpdate : function(){ //updates the win and win percentage field
        let winsH3 = document.querySelector('#wins');
        
        if(this.games>0){
            winsH3.innerText = `${this.wins} (${(100*this.wins/this.games).toFixed(2)}%)`;
        }else{
            winsH3.innerText = `${this.wins}`;
        }
    },

    reset : function (){// This resets a lot of the gameState back to it's initial state. We pick a new word, update the win record, reset the incorrectGuesses array, reset the number of guessesRemaining, and then re-generate the wordToBeGuessed and correctGuesses arrays
        this.games += 1;
        this.winUpdate();
        this.pickWord(possibleWords);
        this.incorrectGuesses = [];
        this.guessesRemaining = 13;
        this.makeBlank();
        this.updateDisplay();
    },

    checkState : function(){//Check to see if the game is over, either because the correctGuesses array is out of blanks or the remainingGuesses has hit 0
        console.log(`Checking State`)
        let gameStateH3 = document.querySelector('#gameState');
        if (this.correctGuesses.includes("_ ") === false){
            gameStateH3.innerText=`You win! The word was ${this.word}!`;
            this.wins += 1;
            this.reset();
        } else if (this.guessesRemaining === 0){
            gameStateH3.innerText=`You lost... The word was ${this.word}.`;
            this.reset();
        }
    },
    
    guess : function(event){ //The workhorse: on keystroke, check if a letter. If a letter, check if it's in the wordToBeGuessed array, and if it is, check where in the array it is, and replace those blanks with the keystroke. If a letter and not in the wordToBeGuessed, check if it's in the incorrectGuesses array. If it is, do nothing, it it isn't, add it to that array, and subtract a guess. If it's not a letter, ignore it.
        const key = event.key;
        if(alphabet.includes(key)) {
            console.log(`You pressed ${key}`);//console debug
            console.log(`Is ${key} in the word being guessed?: ${gameState.wordToBeGuessed.includes(key)}`);//console debug
            if (gameState.wordToBeGuessed.includes(key)){
                let positions = [];
                for(i=0;i<gameState.wordToBeGuessed.length;i++){
                    if (gameState.wordToBeGuessed[i]===key){
                        positions.push(i);
                    }
                }
                for(i=0;i<positions.length;i++){
                    gameState.correctGuesses[positions[i]] = gameState.wordToBeGuessed[positions[i]];
                }
                console.log(`The letter ${key} is at positions ${positions}.`)// Console debug
            } else {
                if(gameState.incorrectGuesses.includes(key)){
                    console.log(`You've already guessed ${key}`)// Console debug
                } else {
                    gameState.incorrectGuesses.push(key);
                    gameState.guessesRemaining -=1;
                    console.log(`${key} has been added to the incorrect guesses. Guesses Remaining: ${gameState.guessesRemaining}`);//console debug
                }
            }
        } else {
            console.log(`That's not a letter!`);//console debug;
        }
        gameState.updateDisplay();
        gameState.checkState();
    }
}

gameState.pickWord(possibleWords);
gameState.winUpdate();
gameState.makeBlank();
gameState.updateDisplay();

document.addEventListener('keyup', gameState.guess);