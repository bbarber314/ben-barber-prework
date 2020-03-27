let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let possibleWords = ["doctor","dalek","cyberman","tardis","companion","rose","martha","donna","amy","rory","pond","clara","bill","nardole","river","song","regeneration"];
const gameState = {
    word : "doctor",
    wordToBeGuessed : [],
    correctGuesses : [],
    wins : 0,
    games : 0,
    incorrectGuesses : [],
    guessesRemaining : 13,

    pickWord : function(listOfWords){
        let randomNumber = Math.floor(Math.random()*listOfWords.length);
        console.log(randomNumber);
        this.word = listOfWords[randomNumber];
    },

    makeBlank : function(){
        this.wordToBeGuessed=this.word.split("");
        let blank = [];
        for (i=0; i<this.wordToBeGuessed.length; i++) {
            blank.push("_ ");
        }
        this.correctGuesses = blank;
    },

    updateDisplay : function(){
        let correctGuessesH3 = document.querySelector('#wordToBeGuessed');
        let winsH3 = document.querySelector('#wins');
        let guessesLeftH3 = document.querySelector('#guessesLeft');
        let wrongGuessesH3 = document.querySelector('#wrongGuesses');

        let currentGuess = ""
        for (i=0;i<this.correctGuesses.length;i++){
            currentGuess += this.correctGuesses[i];
        }

        let wrongGuess = ""
        if(this.incorrectGuesses.length>1){
            for (i=0;i<this.incorrectGuesses.length-1;i++){
                wrongGuess += this.incorrectGuesses[i]+", ";
            }
            wrongGuess +=this.incorrectGuesses[this.incorrectGuesses.length-1]
        } else if (this.incorrectGuesses.length===1){
            wrongGuess +=this.incorrectGuesses[0];
        }

        correctGuessesH3.innerText = currentGuess;
        guessesLeftH3.innerText = this.guessesRemaining;
        wrongGuessesH3.innerText = wrongGuess;

        if(this.games>0){
            winsH3.innerText = `${this.wins} (${(100*this.wins/this.games).toFixed(2)}%)`;
        }else{
            winsH3.innerText = `${this.wins}`;
        }
    },

    reset : function (){
        this.games += 1;
        this.pickWord(possibleWords);
        this.incorrectGuesses = [];
        this.guessesRemaining = 13;
        this.makeBlank();
        this.updateDisplay();
    },

    checkState : function(){
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
    
    guess : function(event){
        const key = event.key;
        if(alphabet.includes(key)) {
            console.log(`You pressed ${key}`);
            console.log(gameState.wordToBeGuessed.includes(key));
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
                console.log(positions)
            } else {
                if(gameState.incorrectGuesses.includes(key)){
                    console.log(`You've already guessed ${key}`)
                } else {
                    gameState.incorrectGuesses.push(key);
                    gameState.guessesRemaining -=1;
                }
            }
        } else {
            console.log(`That's not a letter!`);
        }
        gameState.updateDisplay();
        gameState.checkState();
    }
}

gameState.pickWord(possibleWords);
gameState.makeBlank();
gameState.updateDisplay();

document.addEventListener('keyup', gameState.guess);