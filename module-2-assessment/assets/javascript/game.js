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
        if(this.incorrectGuesses.length>0){
            for (i=0;i<this.incorrectGuesses.length;i++){
                wrongGuess += this.incorrectGuesses[i];
            }
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
            alert(`You pressed the letter ${key}`);
        }
    }
}

gameState.makeBlank();
gameState.updateDisplay();

document.addEventListener('keyup', gameState.guess);