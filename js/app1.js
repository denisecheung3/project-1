let levelCompleted = 0
if (localStorage) {
  levelCompleted = Number(localStorage.getItem('levelcompleted'))
}

function start() {
  const startButton = document.querySelector('#startbutton')
  startButton.addEventListener('click', () => {
    newHumanInvaders()
    startButton.disabled = true
  })

}

function getHumans() {
  if (levelCompleted === 1) {
    return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
  } else {
    return [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  }
}

function getWidth() {
  if (levelCompleted === 1) {
    return 16
  } else {
    return 10
  }
}

function monkeyStartPosition() {
  if (levelCompleted === 1) {
    return 248
  } else {
    return 95
  }
}

function getNetSpeed() {
  if (levelCompleted === 1) {
    return 250
  } else {
    return 450
  }
}

function getPoopSpeed() {
  if (levelCompleted === 1) {
    return 100
  } else {
    return 300
  }
}

function getHumanSpeed() {
  if (levelCompleted === 1) {
    return 500
  } else {
    return 1000
  }

}
function newHumanInvaders() {
  const width = getWidth()
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = monkeyStartPosition()
  let humans = getHumans()
  let poop = null
  let currentNet = null
  let lives = 3
  let hasJustCollided = false
  let isGoingLeft = false
  let play
  let doesNetExist = false
  let doesPoopExist = false
  const noOfLives = document.querySelector('#nooflives')
  const netSpeed = getNetSpeed()
  const poopSpeed = getPoopSpeed()
  const humanSpeed = getHumanSpeed()
  const monkeyScream = new Audio('audio/monkeyscream.wav')
  const humanScream = new Audio('audio/poophitshuman1.m4a')
  const themeSong = new Audio('audio/themesong1.m4a')
  let PoopShootingIntervalId
  themeSong.play()


  //creating the cells inside the grid 

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

  function playmonkeyScream() {   //functions to play audio. this one use twice so in function 
    monkeyScream.play()
  }

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
    if (currentNet) {
      cells[currentNet].classList.add('net')
    }
    /// section to render poop
    cells.forEach(cell => {
      cell.classList.remove('poop')
    })
    if (poop) {
      cells[poop].classList.add('poop')
    }
  }

  // functiond playerLost / playerWon 
  function playerLost() {
    clearInterval(humanMovingIntervalId) //humans stopped moving but the humans are still displayed
    clearInterval(NetDroppingIntervalId)
    clearInterval(PoopShootingIntervalId)
    setTimeout(function () {
      play = confirm('You lose! The humans got to the Monkey Kongdom! Would you like to play again?')
      if (play) {
        window.location.reload()
      }
    }, 300)
  }

  function playerWon() {
    if (localStorage) {
      localStorage.setItem('levelcompleted', 1)
    }
    clearInterval(humanMovingIntervalId) //humans stopped moving but the humans are still displayed
    clearInterval(NetDroppingIntervalId)
    clearInterval(PoopShootingIntervalId)
    setTimeout(function () {
      play = confirm('You won! You saved the Monkey Kingdom!')
      if (play) {
        window.location.reload()
      }
    }, 300)
  }

  //function poop colliding with human or human colliding with poop
  function didPoopCollideWithHuman() {
    return humans.includes(poop)
  }

  // function poopKilledHuman() 
  function poopKilledHuman() {
    humans.splice(humans.indexOf(poop), 1)
    poop = null
    doesPoopExist = false
    humanScream.play()
    clearInterval(PoopShootingIntervalId)
    if (humans.length === 0) {
      playerWon()
    }
  }

  //moving monkey 
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (currentMonkey === cells.length - 1) {
        return
      }
      currentMonkey += 1
    } else if (event.key === 'ArrowLeft') {
      if (currentMonkey === width * width - width) {
        return
      }
      currentMonkey -= 1
    }
    if (currentMonkey === currentNet) {
      lives -= 1
      noOfLives.innerHTML = `LIVES: ${lives}`
      playmonkeyScream()
      currentNet = null
      doesNetExist = false
      if (lives === 0) {
        playerLost()
      }
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

    function UpdateHumanGoOneCellRight() {
      return humans.map((elem) => {
        return elem + 1
      })
    }

    function UpdateHumanGoOneCellLeft() {
      return humans.map((elem) => {
        return elem - 1
      })
    }

    function UpdateHumanGoOneRowDown() {
      return humans.map((elem) => {
        return elem + width
      })
    }

    //updating the variables 
    if (didPoopCollideWithHuman()) {
      poopKilledHuman()
    }
    if (isAnyHumanAtRightestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = true
        humans = UpdateHumanGoOneCellLeft()
        hasJustCollided = false
      } else {
        humans = UpdateHumanGoOneRowDown()
        hasJustCollided = true
        if (humanReachedLastRow()) { //UNSURE BUT SEEMS OK NOW 
          playerLost()
        }
      }
    } else if (isAnyHumanAtLeftestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = false
        humans = UpdateHumanGoOneCellRight()
        hasJustCollided = false
      } else {
        humans = UpdateHumanGoOneRowDown()
        hasJustCollided = true
        isGoingLeft = false
        if (humanReachedLastRow()) { //UNSURE BUT SEEMS OK NOW 
          playerLost()
        }
      }
    } else {
      if (isGoingLeft) {
        humans = UpdateHumanGoOneCellLeft()
      } else {
        humans = UpdateHumanGoOneCellRight()
      }
    }
    renderGame()

  }, humanSpeed)

  //Set Interval - Net Moving Down 
  const NetDroppingIntervalId = setInterval(() => {
    //functions needed for net moving down interval
    function didNetCollidewithMonkey() {
      return currentNet === currentMonkey
    }

    function isNetAtBottomRow() {
      return currentNet >= width * width - width  //UNSURE 
    }

    //updating the variables 
    if (doesNetExist) {
      if (didNetCollidewithMonkey()) {
        currentNet = null
        doesNetExist = false
        playmonkeyScream()
        lives -= 1
        noOfLives.innerHTML = `LIVES: ${lives}`
        if (lives === 0) {
          playerLost()
        }
      } else {
        if (isNetAtBottomRow()) {
          currentNet = null
          doesNetExist = false
        } else {
          currentNet += width
        }

      }
    } else {
      currentNet = humans[humans.length - 1] + width
      doesNetExist = true
    }
    renderGame()
  }, netSpeed)

  //Set Interval = Monkey Shooting Poop Up 
  /// spacebar event listener 
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
      if (doesPoopExist) { //or !doesPoopExist 
      } else {
        poop = currentMonkey - width
        doesPoopExist = true

        PoopShootingIntervalId = setInterval(() => {
          /// functions needed for monkey shooting interval 
          function isPoopAtTopRow() {
            return poop < width
          }
          if (doesPoopExist) {
            if (didPoopCollideWithHuman()) {
              poopKilledHuman()
            } else {
              if (isPoopAtTopRow()) {
                poop = null
                doesPoopExist = false
                clearInterval(PoopShootingIntervalId)
              } else {
                poop -= width
              }
            }
            renderGame()
          }
        }, poopSpeed)
      }
    }
  })

} //end of newHumanInvaders function 

window.addEventListener('DOMContentLoaded', start)
window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)