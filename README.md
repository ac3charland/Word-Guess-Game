# Word-Guess-Game

The following is a hangman-style game built in Javascript and based around the theme of U.S. presidents. It utilizes Bootstrap to allow for mobile responsiveness as well as some neat logic for a solid-feeling user experience. You can try out the deployed version at https://ac3charland.github.io/Word-Guess-Game/.

The game's HTML core can be found in *index.html*. Bootstrap's default styles and colors are further customized in *assets/css/style.css*. The game's logic is contained in *assets/javascript/game.js*, and the game's sounds and images are stored in *assets/sounds* and *assets/images*, respectively.

Here are some of the highlights of *logic.js*:

* The order of presidents shown to the user is randomly generated each playthrough. A recursive function prevents the user from being shown the same president more than once per game.

* The user isn't penalized for pressing the same incorrect key twice.

* Keys such as ENTER and TAB do not penalize the user.