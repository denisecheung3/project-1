console.log('test')


function humanInvaders() {
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95
  let humans = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  let poop = null
  let containsHuman = false // for function checkHumansRightWall)
  // let poopExist = false
  let poopInterval
  let lives = 3


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
    console.log(event.key) //this shows you in console which key the user has pressed on
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


  })

  //humans at starting position. don't forget cells is array/ 
  for (let i = 0; i < humans.length; i++) {
    cells[humans[i]].classList.add('humanstyle')
  }

  //function to check if poop is colliding with human 
  function isPoopCollidingWithHuman() {
    // console.log(humans.includes(poop)) //prints true when collides
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
    cells[currentMonkey].classList.remove('monkeystyle')
    currentMonkey = null
    humans = []
    if (poop !== null) {
      cells[poop].classList.remove('poopstyle')
    }
    // cells[poop].classList.remove('poopstyle') // will throw error if no poop exists 
  }

  // if Human Reaches beyond bottom line 
  function ifHumanReachesKingdom() {
    return humans.some((elem => {
      return elem > (width * width) - 1
    }))
  }

  //monkey shooting poop
  // let haspoopCollidedWithHuman = false
  // let poopExist = false
  // const poopExistence = setInterval(() => {

  // if (poopExist) {
  //   console.log('there is a poop')
  //   return
  // } else {
  document.addEventListener('keydown', (event) => {
    //only one poop at once option 1. do this. 
    //option 2, debug why is it breaking because. poop logic is interferring 
    // wHY IS POOP LOGIC BREAKING?? 

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
          console.log('im negative')
          cells[poop].classList.remove('poopstyle')
          poop = null
          clearInterval(poopInterval)
          return
        }



        if (!isPoopCollidingWithHuman()) {
          cells[poop].classList.remove('poopstyle') // causing errors
          poop -= width //so poop only appears in the row above if not colliding
          cells[poop].classList.add('poopstyle')
          // console.log('not collided with humans')
        } else {
          console.log(humans.indexOf(poop))
          humans.splice(humans.indexOf(poop), 1) //remove the human from array of number values in human array
          cells[poop].classList.remove('poopstyle')
          cells[poop].classList.remove('humanstyle')
          poop = null //hack so poop doesn't stay there
          // poopExist = false
          //this returns an array of 17 the first time one human is down!
          haspoopCollidedWithHuman = true
          clearInterval(poopInterval)

        }
        poopCollidedWithHuman = false


      }, 450) //don't remove, poopShooting Interval end brackets 
      // const forEachCell = cells.forEach((cell) => {
      //   if (cell.classList.contains('poop') && cell.classList.contains('human')) {
      //     return true
      //   } else { 
      //     return false
      //   }
      // })
      // if (forEachCell) { 

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
        humans.splice(humans.indexOf(poop), 1) //remove the human from array of number values in human array
        cells[poop].classList.remove('poopstyle')
        cells[poop].classList.remove('humanstyle')
        poop = null //hack so poop doesn't stay there
        // poopExist = false
        console.log(humans) //this returns an array of 17 the first time one human is down!
        haspoopCollidedWithHuman = true
        clearInterval(poopInterval)
      }
      //to check if potential top row of humans collided with right wall. (they are protected by humans below so only care about top row)
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
          console.log('I am colliding right')
          humans = humans.map((elem) => { //if YES colliding right, update numbers in human array to reflect human's new positions, which is one row down
            if (elem + width > width * width - 1) {
              clearInterval(humanMovingIntervalId)
              endGame()
            } else {
              return elem + width
            }
          })

          isGoingRight = false // because we have an if statement if(isGoingRight) then human indexes + 1
          hasJustCollided = true //important so the if(!hasJustCollided) doesn't run again. so don't keep going down!
          return
        }

        if (isCollidingLeft()) { //check if collided left
          console.log('I am colliding left')
          humans = humans.map((elem) => {
            if (elem + width > width * width - 1) {
              clearInterval(humanMovingIntervalId)
              endGame()
            } else {
              return elem + width
            }
          })
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

    }

    addHumanClass()

    // console.log(humans)




  }, 1000) //don't mess with this, closing bracket for humanMovingIntervalId

  //human shooting net 

  const humanShootNetIntervalId = setInterval(() => {
    


    // net appears 1 row below last human 
    let netAppearPosition = humans[humans.length - 1] + width
    cells[netAppearPosition].classList.add('net')


    function netCollidedWithMonkey() {
      return netAppearPosition === currentMonkey
    }


    const netDroppingIntervalId = setInterval(() => {

      if (netCollidedWithMonkey()) {
        cells[netAppearPosition].classList.remove('net')
        lives -= 1
        console.log(lives)
        clearInterval(netDroppingIntervalId)

        if (lives === 0) {
          clearInterval(humanShootNetIntervalId)
          clearInterval(poopInterval) // doesn't do what i want 
          clearInterval(humanMovingIntervalId)
          endGame()
        }

        //play audio
      } else if (netAppearPosition > width * width - 1 - width) {
        cells[netAppearPosition].classList.remove('net')
        clearInterval(netDroppingIntervalId)

      } else {
        cells[netAppearPosition].classList.remove('net')
        netAppearPosition = netAppearPosition + width
        console.log(netAppearPosition + width)
        cells[netAppearPosition].classList.add('net')
      }

    }, 750)


  }, 4000)


} //don't mess with this, closing bracket for function humanInvaders() 



window.addEventListener('DOMContentLoaded', humanInvaders)

//prevents scrolling in broser up/down/left/right
window.addEventListener('keydown', function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)