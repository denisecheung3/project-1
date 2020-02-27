
# Human Invaders


## Overview 


My task was to create a grid-based game rendered in the browser using HTML, CSS and JavaScript. I completed the project individually within one week during the Software Engineering Bootcamp at General Assembly ('GA'). 

GA gave us a selection of arcade games to choose from. I decided to take on _Space Invaders_. I came up with a light hearted and funny theme during my planning process. The user will control a Monkey. The objective is to kill the humans who are on their way to invade the Monkey Kingdom by firing poop at them.

The project was an opportunity to put together the knowledge I learnt on JavaScript and manipulating the DOM while recreating a classic game.


## Brief 

- **Render a game in the browser**
- **Design logic for winning & visually display which player won**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)

## The Technologies Used 
- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts
- QuickTime Player and GarageBand


## The Approach 

### The Grid and the starting position of Monkey and Humans

The game is built using a grid. JavaScript is responsible for building a 10 x 10 grid for level 1 and 16 x 16 grid for level 2 by creating HTML divs using a for loop and appending the divs as children of the grid. 


``` js
  const width = getWidth()
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = monkeyStartPosition()
  let humans = getHumans()

    for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    if (levelCompleted === 1) {
      cell.classList.add('cellstyleforlevel2')
    } else {
      cell.classList.add('cellstyle')
    }
    if (i === currentMonkey) {
      cell.classList.add('monkeystyle')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

``` 

The size of the grid varies depending on the level. Functions are used to determine the width for the given level to ensure the right grid is rendered. Other variables also change to increase the difficuly of the game:

``` js
function getWidth() {
  if (levelCompleted === 1) {
    return 16
  } else {
    return 10
  }
}

function getHumans() {
  if (levelCompleted === 1) {
    return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
  } else {
    return [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  }
}

``` 

A snapshot of the grid for level 1 and 2 (it isn't visible during gameplay):
 ![](/assets/screenshots/gridlevel1screenshot.jpg)
  ![](/assets/screenshots/gridlevel2screenshot.jpg)

### Starting position of Humans 
Humans are defined as an array of numbers which corresponds to their position on the grid: 

``` js
function getHumans() {
  if (levelCompleted === 1) {
    return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
  } else {
    return [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  }
}
``` 

They are then displayed on the grid using a for loop to add the 'humanstyle' class (with CSS styling).
 
``` js

    for (let i = 0; i < humans.length; i++) {
      cells[humans[i]].classList.add('humanstyle')
    }
``` 

### Humans Movement: humanMovingInterval
This interval is responsible for updating the humans array. Humans move every 1000 milliseconds in level 1 and 500 milliseconds in level 2.

I wrote functions to determine whether there is one or more humans at the leftest or rightest column. This is important because if there is, the humans have to move down a row. The modulo operator was particularly handy for this.

``` js
    function isAnyHumanAtRightestColumn() {
      return humans.some((elem) => {
        return elem % width === width - 1 
      })
    }

    function isAnyHumanAtLeftestColumn() {
      return humans.some((elem) => {
        return elem % width === 0
      })
    }

``` 
Using the functions above as conditions, the below if statements decides how to update the humans array (to reflect the cell positions they will next be at). I also utilised variables to decide whether the humans should move left or right after moving down. Here is a snippet:

``` js
if (isAnyHumanAtRightestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = true
        humans = UpdateHumanGoOneCellLeft()
        hasJustCollided = false
      } else {
        humans = UpdateHumanGoOneRowDown()
        hasJustCollided = true
        if (humanReachedLastRow()) { 
          playerLost()
        }
      }
``` 


### Humans Shooting Net: NetDroppingInterval



### renderGame() 
humanMovingInterval, X and Y are all set intervals that are responsible for updating the variables, hence the state of my game.

The renderGame function is responsible for displaying the (now updated variables) to the DOM. 

This structure 




### Local Storage 
I utilised localStorage to keep track of the uers's progress. 

When a user succesfully completes level 1, a data item 'levelcompleted' with the value 1 is stored inside localStorage and the variable levelCompleted's value would be reassigned.

``` js
function playerWon() {
    if (localStorage) {
      localStorage.setItem('levelcompleted', 1)
  }

let levelCompleted = 0
if (localStorage) {
  levelCompleted = Number(localStorage.getItem('levelcompleted'))
}

``` 

This brings in the level 2 modifications. For example the speed at which the humans are moving will increase to make the game more difficult:

``` js
function getHumanSpeed() {
  if (levelCompleted === 1) {
    return 500
  } else {
    return 1000
  }

}
``` 

### Challenges 
- I was very eager to get going at the beginning and overlooked the importance of detailed planning especially on the logic. I had to write the human movement logic over and over again before I got it right!

- Before I refactored my code I found it challenging to debug because the code was not organised 

### Victories 
- I had my minimal viable product earlier than planned and decided to refactor my code, This was more difficult than expected but it was one of the biggest learning curve in this project. It gave me the opportunity to rethink and refine the logic of my game. More importantly, it taught me to separate the game state, setIntervals, functions and the rendering of the game. As a result of this, I have code that is shorter, cleaner and much more scalable and easier to understand. 
