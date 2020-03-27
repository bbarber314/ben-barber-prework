let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const gameState = {
    wordToBeGuessed : ["d","o","c","t","o","r"],
    correctGuesses : [],
    wins : 0,
    games : 0,
    incorrectGuesses : [],
    guessesRemaining : 13,

    makeBlank : function(){
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
            winsH3.innerText = `${this.wins} (${100*this.wins/this.games}%)`;
        }else{
            winsH3.innerText = `${this.wins}`;
        }
    },
    
    guess : function(event){
        const key = event.key;
        if(alphabet.includes(key)) {
            console.log(`You pressed ${key}`);
            console.log(gameState.wordToBeGuessed.includes(key));
            if (gameState.wordToBeGuessed.includes(key)){
                console.log(gameState.wordToBeGuessed.indexOf(key))
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
    }
}

gameState.makeBlank();
gameState.updateDisplay();

document.addEventListener('keyup', gameState.guess);