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
  let doesPoopExist = false
  let monkeyScream = new Audio('audio/monkeyscream.wav')
  let humanScream = new Audio('audio/poophitshuman.m4a')
  let themeSong = new Audio('audio/themesong.mp3')
  const noOfLives = document.querySelector('#nooflives')
  let PoopShootingIntervalId
  playThemeSong()

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

  //functions to play audio
  function playmonkeyScream() {
    monkeyScream.play()
  }

  function playhumanScream() {
    humanScream.play()

  }
  function playThemeSong() {
    themeSong.play()
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

  // function playerost 
  function playerLost() {
    console.log('player lost')
    clearInterval(humanMovingIntervalId) //humans stopped moving but the humans are still displayed 
    setTimeout(function () {
      play = confirm('You lose! The humans got to the Monkey Kongdom! Would you like to play again?')
      if (play) {
        window.location.reload()
      }
    }, 300)
  }

  //function playerWon
  function playerWon() {
    console.log('player lost')
    clearInterval(humanMovingIntervalId) //humans stopped moving but the humans are still displayed 
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
    playhumanScream()
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
      if (currentMonkey === 90) {
        return
      }
      currentMonkey -= 1
    }
    if (currentMonkey === currentNet) {
      lives -= 1
      noOfLives.innerHTML = `LIVES: ${lives}`
      playmonkeyScream()
      // clearInterval(NetDroppingIntervalId)
      currentNet = null
      doesNetExist = false
    }
    if (lives === 0) {
      playerLost()
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


    // function UpdateHumanGoOneCellRight() {
    //   humans.map((elem) => {
    //     return elem + 1
    //   })
    // }

    //updating the variables 
    if (didPoopCollideWithHuman()) {
      poopKilledHuman()
    }
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
        hasJustCollided = true
        if (humanReachedLastRow()) { //UNSURE BUT SEEMS OK NOW 
          playerLost()
        }
      }
    } else if (isAnyHumanAtLeftestColumn()) {
      if (hasJustCollided === true) {
        isGoingLeft = false
        humans = humans.map((elem) => { //doesn't work if i have humans = humanReachedLastRow() 
          return elem + 1
        })
        hasJustCollided = false
      } else {
        humans = humans.map((elem) => {
          return elem + width
        })
        hasJustCollided = true
        isGoingLeft = false
        if (humanReachedLastRow()) { //UNSURE BUT SEEMS OK NOW 
          playerLost()
        }
      }
    } else {
      if (isGoingLeft) {
        humans = humans.map((elem) => {
          return elem - 1
        })
      } else {
        humans = humans.map((elem) => {
          return elem + 1
        })
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
      return currentNet >= width * width - width  //UNSURE 
    }

    //updating the variables 
    if (doesNetExist) {
      if (didNetCollidewithMonkey()) {
        console.log('net collided with Monkey')
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
      currentNet = humans[humans.length - 1] + width //UNSURE BUT SEEMS OK
      doesNetExist = true
    }
    renderGame()
  }, 450)


  //Set Interval = Monkey Shooting Poop Up 
  /// spacebar event listener 
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
      if (doesPoopExist) { //or !doesPoopExist 
        console.log('poop exists')
      } else {
        poop = currentMonkey - width
        console.log(poop)
        doesPoopExist = true

        PoopShootingIntervalId = setInterval(() => {

          /// functions needed for monkey shooting interval 

          function isPoopAtTopRow() {
            return poop < width
          }

          if (doesPoopExist) {
            console.log('should eevereb')
            if (didPoopCollideWithHuman()) {
              poopKilledHuman()
            } else {
              if (isPoopAtTopRow()) {
                poop = null
                doesPoopExist = false
                clearInterval(PoopShootingIntervalId)
              } else {
                console.log('going up', poop)
                poop -= width
              }
            }
            renderGame()
          }
        }, 300)
      }
    }
  })

  /// the actual monkey shooting interval 



} //end of newHumanInvaders function 


window.addEventListener('DOMContentLoaded', start)
window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)