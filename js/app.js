
let levelCompleted = 0
if (localStorage) { //localstorage
  levelCompleted = Number(localStorage.getItem('levelcompleted'))
  console.log(levelCompleted)
}

function start() {
  const startButton = document.querySelector('#startbutton')

  if (levelCompleted === 1) {
    startButton.addEventListener('click', () => {
      testLevel2()
      startButton.disabled = true
    })
  } else {
    startButton.addEventListener('click', () => {
      humanInvaders()
      startButton.disabled = true
    })
  }

}

function testLevel2() {
  console.log('level 2')
  localStorage.removeItem('levelcompleted')
}

// returns the right humans for the level
function getHumans() {
  if (levelCompleted === 1) {
    return [2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18, 22, 23, 24, 25, 26, 27, 28]
  } else {
    return [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  }

}

function humanInvaders() {

  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95
  let humans = getHumans()
  let poop = null
  // let poopExist = false
  let poopInterval
  let lives = 3
  let netAppearPosition
  let netDroppingIntervalId
  const noOfLives = document.querySelector('#nooflives')
  let play
  let monkeyScream = new Audio('audio/monkeyscream.wav')
  let humanScream = new Audio('audio/poophitshuman.m4a')

  function playmonkeyScream() {
    monkeyScream.play()
  }

  function playhumanScream() {
    humanScream.play()
    console.log('human screamed')

  }

  //creating the cells and adding it to become children of class="grid". and adding monkey to starting position (cell index 95)
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div') //create an element 'div', stored in a variable 'cell' every time the for loop runs 
    cell.classList.add('cellstyle') //add the class 'cell' to the created div, stored in variable 'cell' 
    if (i === currentMonkey) {
      cell.classList.add('monkeystyle')
    }
    grid.appendChild(cell)
    cells.push(cell) //array of cell elements will start from cell 0 
  }
  console.log(cells)  //console logging the array of cells 

  //moving the monkey 
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      if (currentMonkey === cells.length - 1) { //this is if monkey is at cell 99
        return //return so it doesn't do anything, won't let Monkey go outside the grid
      }
      cells[currentMonkey].classList.remove('monkeystyle') //first remove monkeystyle from the style monkey was at 
      currentMonkey += 1 //then +1 to reflect the cell monkey will be at when user clicks right arrow 
      cells[currentMonkey].classList.add('monkeystyle') //add monketstyle to the new cell user moved monkey to 

    } else if (event.key === 'ArrowLeft') {
      if (currentMonkey === 90) {
        return
      }
      cells[currentMonkey].classList.remove('monkeystyle')
      currentMonkey -= 1
      cells[currentMonkey].classList.add('monkeystyle')
    }


    if (currentMonkey === netAppearPosition) { //if monkey walks into net
      cells[netAppearPosition].classList.remove('net') //copied this line and the 3 lines to follow from net stuff. so could refactor
      netAppearPosition = null
      lives -= 1
      playmonkeyScream()
      clearInterval(netDroppingIntervalId)
      noOfLives.innerHTML = `LIVES: ${lives}`

      if (lives === 0) {
        endGame()
        currentMonkey = null
        setTimeout(function () {
          console.log('monkey dies because on its final life monkey ran into net')
          play = confirm('You lose!')
          console.log(play, 'monkey died cuz it ran into net') //not touching this line
          if (play) {
            window.location.reload()
          }

        }, 500)

      }
    }
  })

  //humans at starting position. don't forget cells is array/ 
  for (let i = 0; i < humans.length; i++) {
    cells[humans[i]].classList.add('humanstyle')
  }

  //function to check if poop is colliding with human 
  function isPoopCollidingWithHuman() {
    return humans.includes(poop)
  }

  // function to check if human collided with monkey
  function humanCollidedWithMonkey() { //do I need one that's MonkeyCollidedWithHuman?
    return humans.includes(currentMonkey)
  }

  //end game function
  function endGame() {
    for (let i = 0; i < humans.length; i++) {
      cells[humans[i]].classList.remove('humanstyle')
    }
    console.log(humans.length)
    console.log(cells[humans[0]])
    console.log('endGame function is running')
    //removed currentMonkey = null
    cells[currentMonkey].classList.remove('monkeystyle') //this is not happenineg for human reaching kingdom inside colliding left/right 
    humans = []
    if (poop !== null) {
      cells[poop].classList.remove('poopstyle')
    }
    console.log('endGame ran')
    // if (lives === 0) {
    //   alert('You lose!')
    // }
  }

  // if Human Reaches beyond bottom line 
  function ifHumanReachesKingdom() {
    return humans.some((elem => {
      return elem > (width * width) - 1
    }))
  }

  //monkey shooting poop
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
      if (poop === 0 || poop > 0) { //cuz poop>=0 didn't work as it had problems with poop = null. because when poop = null, poop>=0. couldn't shoot because it was just returning. 
        return
      }
      // poopExist = true
      poop = currentMonkey - width
      cells[poop].classList.add('poopstyle')

      // const setInterval to remove poop 
      poopInterval = setInterval(() => {

        if (poop < width) {
          cells[poop].classList.remove('poopstyle')
          poop = null
          clearInterval(poopInterval)
          return
        }

        if (!isPoopCollidingWithHuman()) {
          cells[poop].classList.remove('poopstyle')
          poop -= width //so poop only appears in the row above if not colliding
          cells[poop].classList.add('poopstyle')
          // console.log('not collided with humans')
        } else {
          console.log(humans.indexOf(poop))
          humans.splice(humans.indexOf(poop), 1) //remove the human from array of number values in human array
          cells[poop].classList.remove('poopstyle')
          cells[poop].classList.remove('humanstyle')
          poop = null //hack so poop doesn't stay there
          haspoopCollidedWithHuman = true //why do i need this?? 
          clearInterval(poopInterval)
          console.log(humans.length)
          if (humans.length === 0) {
            clearInterval(netDroppingIntervalId)
            endGame()
            if (localStorage) {
              localStorage.setItem('levelcompleted', 1)
            }
            setTimeout(function () {
              play = confirm('Congratulations, you saved the Monkey Kingdom!')
              if (play) {
                window.location.reload()
              }
            }, 500)
          }

        }
        poopCollidedWithHuman = false //why do i need this?? 


      }, 450) //don't remove, poopShooting Interval end brackets 

    }

  }) // don't remove, space bar / poop shooting closing brackets 

  //variables to help make decisions within set intervals 
  let isGoingRight = true
  let hasJustCollided = false
  // SET INTERVAL - BELOW HAPPENS EVERY SECOND 
  const humanMovingIntervalId = setInterval(() => {
    let currentCellsWithDisplayedHumans = document.querySelectorAll('.humanstyle') //at this point i will have cells with class humanstyles
    // console.log(currentCellsWithDisplayedHumans) //this works. will keep printing my 18 cells that has 


    //keep removing humans regardless of whether it collided or just moving left/right/down
    function removeHumanClass() {
      for (let i = 0; i < currentCellsWithDisplayedHumans.length; i++) {
        currentCellsWithDisplayedHumans[i].classList.remove('humanstyle')
      }
    }


    // updates the human array so human will go down/right. left 
    function updateHumanArray() {

      if (isPoopCollidingWithHuman()) {
        playhumanScream()
        humans.splice(humans.indexOf(poop), 1) //remove the human from array of number values in human array
        cells[poop].classList.remove('poopstyle')
        cells[poop].classList.remove('humanstyle')
        poop = null //hack so poop doesn't stay there
        // poopExist = false
        console.log(humans) //this returns an array of 17 the first time one human is down!
        haspoopCollidedWithHuman = true
        clearInterval(poopInterval)
      }

      function isCollidingRight() {
        return humans.some((elem) => {
          return elem % width === width - 1 //this will return true or false 
        })

      }
      //can't rely on human[0] so check the whole humans array to see if it has an element whose value, a number % width === 0, which means it has touched left wall
      function isCollidingLeft() {
        return humans.some((elem) => {
          return elem % width === 0
        })

      }
      // conclusion. function isColldingRight and isColldingLeft checks if humans have touched rightest or leftest column! 

      if (!hasJustCollided) { //if NOT just collided
        if (isCollidingRight()) { //check if colliding right
          const isAnyHumanBelowLastRow = humans.some((elem) => {
            return elem + width > width * width - 1

          })

          if (isAnyHumanBelowLastRow) {
            clearInterval(humanMovingIntervalId)
            clearInterval(humanShootNetIntervalId)
            cells[currentMonkey].classList.remove('monkeystyle')
            for (let i = 0; i < humans.length; i++) {
              cells[humans[i]].classList.remove('humanstyle') // + 10 is crucial as the humans have moved down at this point
            }
            console.log('hello 1')
            endGame()
            setTimeout(function () {
              console.log('monkey dies because human collided with monkey')
              play = confirm('You lose! The humans got to you!')
              console.log(play, 'monkey dued cuz human collided with monkey')
              if (play) {
                window.location.reload()
              }
            }, 300)

          } else {
            humans = humans.map((elem) => { //if YES colliding right, update numbers in human array to reflect human's new positions, which is one row down
              return elem + width
            })
          }
          isGoingRight = false // because we have an if statement if(isGoingRight) then human indexes + 1
          hasJustCollided = true //important so the if(!hasJustCollided) doesn't run again. so don't keep going down!
          return
        }

        if (isCollidingLeft()) { //check if collided left
          const isAnyHumanBelowLastRow = humans.some((elem) => {
            return elem + width > width * width - 1
          })

          if (isAnyHumanBelowLastRow) {
            clearInterval(humanMovingIntervalId)
            clearInterval(humanShootNetIntervalId)
            cells[currentMonkey].classList.remove('monkeystyle')
            for (let i = 0; i < humans.length; i++) {
              cells[humans[i]].classList.remove('humanstyle') // + 10 is crucial as the humans have moved down at this point
            }
            endGame() //endgame does run, and inside endgame it should remove the humanclass
            setTimeout(function () {
              console.log('monkey dies because human collided with monkey')
              play = confirm('You lose! The humans got to you!')
              if (play) {
                window.location.reload()
              }
            }, 300)
          } else {
            humans = humans.map((elem) => {
              return elem + width
            })
          }
          isGoingRight = true
          hasJustCollided = true
          return
        }

      }

      if (isGoingRight) {
        humans = humans.map((elem) => {
          return elem + 1
          // need another constant to check whether new elem is part of the right wall 
        })
      } else {
        humans = humans.map((elem) => {
          return elem - 1
        })
      }
      hasJustCollided = false

    }

    function addHumanClass() {
      for (let i = 0; i < humans.length; i++) {
        cells[humans[i]].classList.add('humanstyle')
      }
    }


    removeHumanClass()
    updateHumanArray()
    // // console.log(humans) to test that arrays are updating

    if (humanCollidedWithMonkey()) {
      console.log('we collided')
      clearInterval(humanMovingIntervalId)
      endGame()
      currentMonkey = null
      setTimeout(function () {
        console.log('monkey dies because human collided with monkey')
        play = confirm('You lose! The humans got to you!')
        console.log(play, 'monkey dued cuz human collided with monkey')
        if (play) {
          window.location.reload()
        }
      }, 300)


    }

    addHumanClass() // causing problems?

  }, 1000) //don't mess with this, closing bracket for humanMovingIntervalId

  //human shooting net 
  const humanShootNetIntervalId = setInterval(() => {

    // net appears 1 row below last human 
    netAppearPosition = humans[humans.length - 1] + width
    cells[netAppearPosition].classList.add('net')


    function netCollidedWithMonkey() {
      return netAppearPosition === currentMonkey
    }

    netDroppingIntervalId = setInterval(() => {

      if (netCollidedWithMonkey()) {
        cells[netAppearPosition].classList.remove('net')
        lives -= 1
        playmonkeyScream()
        netAppearPosition = null

        clearInterval(netDroppingIntervalId)
        noOfLives.innerHTML = `Lives: ${lives}`

        if (lives === 0) {
          clearInterval(humanShootNetIntervalId)
          clearInterval(poopInterval)
          clearInterval(humanMovingIntervalId)
          endGame()
          currentMonkey = null
          setTimeout(function () {
            console.log('monkey dies because on its final life net hits monkey')
            play = confirm('You lose!')
            console.log(play, 'monkey dies cuz net hit monkey')
            if (play) {
              window.location.reload()
            }
          }, 300)


        }




        //play audio
      } else if (netAppearPosition > width * width - 1 - width) {
        cells[netAppearPosition].classList.remove('net')
        clearInterval(netDroppingIntervalId)
        netAppearPosition = null

      } else {
        cells[netAppearPosition].classList.remove('net')
        netAppearPosition = netAppearPosition + width
        cells[netAppearPosition].classList.add('net')
      }

    }, 750)


  }, 7000)


} //don't mess with this, closing bracket for function humanInvaders() 



window.addEventListener('DOMContentLoaded', start)

//prevents scrolling in broser up/down/left/right
window.addEventListener('keydown', function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)