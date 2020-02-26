function start() {
  const startButton = document.querySelector('#startbutton')
  startButton.addEventListener('click', () => {
    newHumanInvaders()
    startButton.disabled = true
  })
}

function newHumanInvaders() {
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95
  let humans = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  let poop = null
  let currentNet = null
  let lives = 3
  let hasJustCollided = false
  let isGoingLeft = false
  let play
  let doesNetExist = false

  //creating the cells inside the grid 
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cellstyle')
    if (i === currentMonkey) {
      cell.classList.add('monkeystyle')
    }
    grid.appendChild(cell)
    cells.push(cell)
  }

  // //UNSURE - human starting position 
  // for (let i = 0; i < humans.length; i++) {
  //   cells[humans[i]].classList.add('humanstyle')
  // }

  // function renderGame 
  function renderGame() {
    /// section to render updated Monkey position
    cells.forEach(cell => { //i think need for each instead of specific cell because by this time the monkey's value would have updated
      cell.classList.remove('monkeystyle')
    })
    cells[currentMonkey].classList.add('monkeystyle') //relying on the new updated monkey's value 
    ///section to render humans/updated humans UNSURE 
    cells.forEach(cell => {
      cell.classList.remove('humanstyle')
    })

    for (let i = 0; i < humans.length; i++) {
      cells[humans[i]].classList.add('humanstyle')
    }
    /// section to render net dropping 
    cells.forEach(cell => {
      cell.classList.remove('net')
    })
    cells[currentNet].classList.add('net')
  }

  // function playLost 
  function playerLost() {
    console.log('player lost')
    clearInterval(humanMovingIntervalId) //humans stopped moving but the humans are still displayed 
    setTimeout(function () {
      console.log('monkey dies because human collided with monkey')
      play = confirm('You lose! The humans got to the Monkey Kongdom! Would you like to play again?')
      console.log(play, 'monkey dued cuz human collided with monkey')
      if (play) {
        window.location.reload()
      }
    }, 300)
  }

  //moving monkey 
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (currentMonkey === cells.length - 1) {
        return
      }
      currentMonkey += 1
    } else if (event.key === 'ArrowLeft') {
      if (currentMonkey === 90) {
        return
      }
      currentMonkey -= 1
    }
    renderGame()
  })

  // Set Interval - Humans Moving 
  const humanMovingIntervalId = setInterval(() => {
    ///functions needed for humans moving interval 
    function isAnyHumanAtRightestColumn() {
      return humans.some((elem) => { //returns true if at least one elem is at rightest row or false if not
        return elem % width === width - 1 //check each elem whether the elem is at rightest row, if yes human.some is true
      })
    }

    function isAnyHumanAtLeftestColumn() {
      return humans.some((elem) => {
        return elem % width === 0
      })
    }

    function humanReachedLastRow() {
      return humans.some((elem) => {
        return elem + width > width * width - 1
      })
    }

    //updating the variables 
    if (isAnyHumanAtRightestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = true
        humans = humans.map((elem) => {
          return elem - 1
        })
        hasJustCollided = false
      } else {
        humans = humans.map((elem) => {
          return elem + width
        })
        console.log('I collided right and moved down')
        hasJustCollided = true
        if (humanReachedLastRow()) { //UNSURE 
          playerLost()
        }
      }
    } else if (isAnyHumanAtLeftestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = false
        humans = humans.map((elem) => {
          return elem + 1
        })
        hasJustCollided = false
      } else {
        humans = humans.map((elem) => {
          return elem + width
        })
        console.log('I just collided left and moved down')
        hasJustCollided = true
        isGoingLeft = false
        if (humanReachedLastRow()) { //UNSURE 
          playerLost()
        }
      }
    } else {
      if (isGoingLeft) {
        console.log('Im going left')
        humans = humans.map((elem) => {
          return elem - 1
        })
      } else {
        console.log('Im going right')
        humans = humans.map((elem) => {
          return elem + 1
        })
        console.log(humans)
      }
    }

    renderGame()

  }, 1000)

  //Set Interval - Net Moving Down 
  const NetDroppingIntervalId = setInterval(() => {
    //functions needed for net moving down interval
    function didNetCollidewithMonkey() {
      return currentNet === currentMonkey
    }

    function isNetAtBottomRow() {
      console.log(currentNet >= width * width - width) 
      return currentNet >= width * width - width  //UNSURE 
    }

    //updating the variables 
    if (doesNetExist) {
      console.log('net Exists')
      if (didNetCollidewithMonkey()) {
        console.log('net collided with Monkey')
        currentNet = null
        doesNetExist = false
        //play audio 
        lives -= 1
        if (lives === 0) {
          playerLost()
        }
      } else {
        console.log('net does not exist')
        if (isNetAtBottomRow()) {
          console.log('net is at bottom row')
          currentNet = null 
          doesNetExist = false 
        } else {
          currentNet += width
          console.log('net goes down one row')
        }

      }
    } else {
      currentNet = humans[humans.length - 1] + width //UNSURE
      doesNetExist = true 
    }
    renderGame()
  }, 450)


} //end of newHumanInvaders function 


window.addEventListener('DOMContentLoaded', start)
window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)