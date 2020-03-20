const userInput = prompt(`Please provide a name:`);
if (userInput.length>4){
    alert(`Your name, ${userInput}, is greater than 4 characters in length.`)
} else {
    alert(`Your name, ${userInput}, is at most 4 characters in length.`) //I know the instructions say to alert that it's less than 4 characters. But say it's 'Rand'. That means the length will return 4, and that's not less than 4 or greater than 4. The else message is properly 'is at most 4', not 'less than 4'.
}