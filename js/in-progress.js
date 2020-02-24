
const hasHumanReachedLeft = false

humans.forEach(elem => {
  if (elem % width === 0) {
    hasHumanReachedLeft = true
  }
})





//human moving all (going right, then going down, then going left etc)
const isGoingLeft = false
//inset set interval human moving
const humanMovingIntervalId = setInterval(() => {








  //monkey shooting poop
  document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      const forEachCell = cells.forEach((cell) => {
        if (cell.ClassList.contains('poop') && cell.ClassList.contains('human')) {
          return true
        } else {
          return false
        }
      })
      if (forEachCell) {
        cells[currentMonkey - width].classList.add('poopstyle')
      }

    }

  }) //don't mess with this it's closing for monkey shooting poop

  // if (cells.classList.contains('poop') && cells.classList.contains('human')) {//if NO cell does contains poop class and 
  // cells[currentMonkey - width].classList.add('poopstyle')
  // } else if (cells.classList.contains('random')) { //if any cell contains both poop class and human class 
  //   return
  // }




  // human moving 
  //human moving (1. remove 2. update array 3.add to new cells)
  let currentCellsWithDisplayedHumans = document.querySelectorAll('.humanstyle') //at this point i will have cells with class humanstyles
  console.log(currentCellsWithDisplayedHumans)

  function removeHumanClass() {
    for (let i = 0; i < currentCellsWithDisplayedHumans.length; i++) {
      currentCellsWithDisplayedHumans[i].classList.remove('humanstyle')
    }
  }

  function updateArray() {
    if 
  }

  function addHumanClass() {

  }



  // check Human Right  Wall 20/feb doesn't work cuz  im just looping it like 18 times and the loop is not connected to the movement of the humans. so the loop probably finished looping before my humans reach the right wall
  function checkHumansRightWall() { //if (checkHumansRightWall) { goDown() }
    for (let i = 9; i < currentCellsWithDisplayedHumans.length; i += 10) {
      if (currentCellsWithDisplayedHumans[i].classList.contains('humanstyle')) {
        // console.log(currentCellsWithDisplayedHumans[i])
        //just checking 19 times. probably even before the humans are there.....
        //

        containsHuman = true
        // console.log('true')
        // return true 
      } else {
        containsHuman = false
        // console.log('false')
        // return false
      }
    }
  }

  if (containsHuman) {
    // console.log('there is human on right wall')
    // goDown()
  } else {
    // console.log('no humans on right wall')
  }


  // removing human when it gets hit 
  // linked with humans at starting position
  //set interval below?
  // if (cells[humans][i].classList.contains('human') && cells[humans][i].classList.contains('poop')) {
  //   cells[humans[i]].classList.remove('humanstyle')

  // others 



  // const setInterval to remove poop 
  const poopShootingIntervalId = setInterval(() => {
    cells[poop].classList.remove('poopstyle')
    poop -= width
    cells[poop].classList.add('poopstyle')


    //check if there is collision every second 

    function isPoopCollidingWithHuman() {
      console.log(humans.includes(poop)) //prints true when collides
      return humans.includes(poop)

    }

    if (!isPoopCollidingWithHuman()) {
      if (isPoopCollidingWithHuman()) {
        cells[poop].classList.remove('poopstyle')
        poopCollidedWithHuman = true

      } else {
        console.log('test')
        return

      }


    }

    poopCollidedWithHuman = false
    // need to only enable Monkey to shoot poop every 4 seconds?
  }, 1000) //don't remove, poopShooting Interval end brackets 



  // poop 
  let haspoopCollidedWithHuman = false
  let poopExist = false
  function isPoopCollidingWithHuman() {
    console.log(humans.includes(poop)) //prints true when collides
    return humans.includes(poop)

  }
  document.addEventListener('keydown', (event) => {
    //only one poop at once option 1 
    //option 2, debug why is it breaking because. poop logic is interferring 
    // wHY POOP IS BREAKING?? 
    if (event.keyCode === 32) {

      poop = currentMonkey - width
      cells[poop].classList.add('poopstyle')
      // currentPoop = 

      // const setInterval to remove poop 
      const poopShootingIntervalId = setInterval(() => {





        -----
          function isCollidingLeft() {
            return humans.some((elem) => {
              return elem % width === 0
            })


            -----

