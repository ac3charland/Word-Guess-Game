// Create array of words for user to guess.
var words = ["washington", "adams", "jefferson", "madison", "jackson", "lincoln", "kennedy", "nixon", "carter", "reagan", "bush", "clinton", "obama", "trump"];

// Create an array of fun facts to display when the user correctly guesses the word.
var funFacts = [
    "George Washington was the first president of the United States and the commander-in-chief of the Continental Army during the Revolutioary War.",
    "John Adams was the second U.S. president and helped draft the Declaration of Independence. He was also the Vice-President of George Washington.",
    "Thomas Jefferson was the third U.S. president. While revered historically, in recent years the hypocrisy of his owning slaves while writing 'All men are created equal' has generated controversy and debate.",
    "James Madison played a key role in drafting the U.S. Constitution and the Bill of Rights.",
    "Andrew Jackson, currently on the $20 bill, was to be replaced by Harriet Tubman under Treasury Secretary Jack Lew. However, current Treasury Secretary Steven Mnuchin makes no promises that the change will occur.",
    "Abraham Lincoln was the president of the United States during the Civil War. He is known for writing the Emancipation Proclamation and ending slavery in the U.S. with the fourteenth amendment.",
    "John F. Kennedy attempted the Bay of Pigs invasion of Cuba and was assassinated in Dallas, Texas in 1963. He is one of four presidents to be assassinted in office.",
    "Richard Nixon's presidency is often remembered by the Watergate Scandal, which forced his resignation from office.",
    "Jimmy Carter was the first president to put solar panels on the White House. His public health work after office has also nearly eliminated Guinea Worm Disease.",
    "Ronald Reagan was known for advocating supply-side economics and drastically expanding the War on Drugs. He is also widely credited for helping wind down the Cold War with Mikhail Gorbachev.",
    "There were two U.S. presidents in the Bush family--George H.W. Bush and George W. Bush. John Adams and John Quincy Adams are the only other father/son pair of U.S. presidents.",
    "Bill Clinton is the only U.S. president who plays the saxophone. He is also only the second president, after Andrew Johnson, to be impreached by the House of Representatives.",
    "Barack Obama is the first African-American president. He is also the only president to be born in Hawaii.",
    "Donald Trump is the current president of the United States, as well as the fifth president to lose the popular vote and still be elected."
]


// Create a store of previously used indices, so the same word isn't used twice.
var previousIndices = [];

// Create a store of previously guessed letters
var previousGuesses = [];

// Create placeholders for the currently selected president and the user's guess so far
var currentWord = "";
var currentGuess = "";

// i is used as an index to pick a random president. It sits outside pickRandomPresident() because that function is recursive.
var i;

// Create variable to track the score and the user's remaining guesses.
var strikesRemaining = 5;
var score = 0;

// Create bools to track the various states of the game.
var gameOver = false;
var wordWon = false;
var gameWon = false;


// Picks a new random President from the list
function pickRandomPresident() {
    // reset the values of currentWord and currentGuess
    currentWord = "";
    currentGuess = "";

    // Pick a random number from 0 to words.length
    i = Math.floor(Math.random() * words.length);

    // If all indices of words.length have already been used, the user has won the game.
    if (previousIndices.length === words.length) {
        // Hide the Incorrect Letters and Strikes Remaining boxes
        document.getElementById("status-box").style.visibility = "hidden";
        
        // Show the button and have it invite the user to play again.
        document.getElementById("refresh").style.visibility = "visible";
        document.getElementById("refresh").textContent = "Play Again";

        // Display congrats message
        document.getElementById("message").textContent = "Congrats! You've gone through all the presidents (that I coded).";
        
        // Play a song
        document.getElementById("gameWon").play();

        // Clear the previously used word indices
        previousIndices = [];

        // Update the game status
        gameWon = true;
        return;
    }

    // Otherwise, make sure that the randomly generated index hasn't been used before:
    if (previousIndices.indexOf(i) != -1) {
        pickRandomPresident();
    }

    // If the randomly generated index (i) hasn't been used before, go ahead and set currentWord to words[i]
    currentWord = words[i];

    // Then, add i to the array of previous indices (the if statement prevents duplicate indices in previousIndices)
    if (previousIndices.indexOf(i) == -1) {
        previousIndices.push(i);

        // Generate a string of underscores which matches the number of characters in currentWord
        for (var j = 0; j < currentWord.length; j++) {
            currentGuess += "_"
        }
    }
}


// Writes the user's current guess to the page
function spellGuess() {
    // Create a temporary string
    var letters = ""

    // Add each letter from the user's current guess to letters, with spaces added between letters
    for (var k=0; k < currentGuess.length; k++) {
        letters += currentGuess[k].toUpperCase();
        if (k < currentGuess.length - 1) {
            letters += " ";
        }
    }

    // Assign the value of letters to the "blanks" element on the page.
    document.getElementById("blanks").textContent = letters
}

// Write the user's remaining strikes to the page.
function printGuessesRemaining() {
    document.getElementById("strikes").textContent = strikesRemaining;
}

// Write the user's current score to the page.
function printScore() {
    document.getElementById("score").textContent = score;
}

// Write the user's previous guesses to the page.
function printPreviousGuesses() {
    var previousGuessesString = "";
    for (var m=0; m < previousGuesses.length; m++) {
        previousGuessesString += previousGuesses[m].toUpperCase();
        previousGuessesString += " "
    }
    
    document.getElementById("previousGuesses").textContent = previousGuessesString;
}

// Resets the page. The button that appears on the page triggers this function.
function reset() {
    // If the user has won or lost the game, reset and refresh their score.
    if (gameWon || gameOver) {
        score = 0;
        printScore();
        gameWon = false;
        gameOver = false;
    }

    // Reset and refresh remaining strikes.
    strikesRemaining = 5;
    printGuessesRemaining();

    // Reset and refresh previously guessed letters.
    previousGuesses = [];
    printPreviousGuesses();

    // Clear any message at the top of the screen.
    document.getElementById("message").textContent = "";

    // Show the previously guessed letters box and the remaining strikes box in case it was hiddden.
    document.getElementById("status-box").style.visibility = "visible";

    // Hide the button & reset its text.
    document.getElementById("refresh").style.visibility = "hidden";
    document.getElementById("refresh").textContent = "Next";

    // Clear the contents of the win-box and hide it.
    document.getElementById("funFact").textContent = "";
    document.getElementById("portrait").src = "#";
    document.getElementById("winBox").style.visibility = "hidden";

    // Update game status
    wordWon = false;
    gameOver = false;

    // Stop playing Yankee Doodle if it was already
    document.getElementById("gameWon").pause();
    document.getElementById("gameWon").load();

    // Pick a new word and write it to the DOM.
    pickRandomPresident();
    spellGuess();
}

// Set up the page on load.
document.onload = reset();



// When the user presses a key, run this code
document.onkeyup = function (event) {
    // Hide the instructions after the first key press
    document.getElementById("instructions").style.display = "none";

    keyPressed = event.key;

    // Don't do anything if the user lost the game or won the round.
    if (gameOver || wordWon) {
        return;
    }

    // Make sure key pressed isn't something like SHIFT or TAB
    if (keyPressed.length == 1) {
        undercaseLetter = keyPressed.toLowerCase();

        // Create a temporary string
        var newCurrentGuess = "";
        // Create a bool variable to track if the user's guess was correct
        var correctlyGuessed = false;

        // Loop through the characters of currentWord
        for (var l = 0; l < currentWord.length; l++) {
            // If the user's guess matches the current character of currentWord, 
            // add that character to newCurrentGuess and switch correctlyGuessed to true.
            if (undercaseLetter === currentWord[l]) {
                newCurrentGuess += undercaseLetter;
                correctlyGuessed = true;
            } else { // Otherwise assign the character in currentGuess at the current position to newCurrentGuess
                newCurrentGuess += currentGuess[l];
            }
        }

        // Trigger the following code block if the user's guess was wrong
        if (!correctlyGuessed) {
            // If the user still has guesses remaining, this code runs
            if (strikesRemaining > 0) {
                // If the user hasn't guessed this wrong letter before...
                if (previousGuesses.indexOf(undercaseLetter) == -1) {
                    // Take off a strike
                    strikesRemaining--;

                    // Add their guess to the previousguesses array
                    previousGuesses.push(undercaseLetter);

                    // Refresh the relevent page displays
                    printGuessesRemaining();
                    printPreviousGuesses();
                }
            } else { // Otherwise, the game is over
                // Display a game over message
                document.getElementById("message").textContent = "Game over! The right answer was:";
                
                // Show the word they were trying to guess
                currentGuess = currentWord;
                spellGuess();
                
                // Show the button and update its text
                document.getElementById("refresh").textContent = "Try Again"
                document.getElementById("refresh").style = "visible";

                // Update the game state & exit the function.
                gameOver = true;
                return;
            }
        }

        // Now newCurrentGuess is updated if the user guessed correctly and 
        // the same as currentGuess if the user didn't. So, assign the value 
        // of newCurrentGuess to currentGuess.
        currentGuess = newCurrentGuess;

        // Print the user's current guess to the page.
        spellGuess();

        // If the user has guessed all the letters (no blank characters in currentGuess), they've guessed the word.
        if (currentGuess.indexOf("_") == -1) {
            // Show a congratulations message
            document.getElementById("message").textContent = "Congrats, you got it!";

            // Play a song
            document.getElementById("winNoise").play();

            // Assign a fun fact to the #funFact box.
            document.getElementById("funFact").textContent = funFacts[i];

            // Load an image to the #portrait box using the URL
            var portraitSrc = "assets/images/presidentialPortraits/"
            portraitSrc += i;
            portraitSrc += ".jpg";
            document.getElementById("portrait").src = portraitSrc;

            // Show the "Next" button, as well as the fun fact and portrait contained in #winBox
            document.getElementById("refresh").style.visibility = "visible";
            document.getElementById("winBox").style.visibility = "visible";
        
            // Update the game status
            wordWon = true;

            // Update the score
            score += (10 - (5 - strikesRemaining))
            printScore();
        }
    }
}

