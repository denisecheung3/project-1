console.log('test')


function humanInvaders() {
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95
  let humans = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  let CurrentPoop = 150
  let containsHuman = false // for function checkHumansRightWall)


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
      if (currentMonkey === cells.length - 1) { //this is if monkey is at cell[4]  ?. this is just using the const (let) harry, not CSS class harry 
        return //return so it doesn't do anything, won't let harry go outside the grid
      } //line 26-28 is all other situations when harry is not cell[4]
      cells[currentMonkey].classList.remove('monkeystyle') //first we remove class harry from current cell. cells[harry]. remember all our cells are pushed to an array. so cells[currentindexofharry]
      currentMonkey += 1 //now we +1 to the currentposition of harry so cells[16]
      cells[currentMonkey].classList.add('monkeystyle') //add the class harry from CSS to the cell where harry is currently in
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

  //monkey shooting poop
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
      poop = currentMonkey - width
      cells[poop].classList.add('poopstyle')
      // currentPoop = 
      // const setInterval 

      // poop += width 
      // update poop number 
      // remove poop from current
      // add poop to new
      //

      // const forEachCell = cells.forEach((cell) => {
      //   if (cell.classList.contains('poop') && cell.classList.contains('human')) {
      //     return true
      //   } else { 
      //     return false
      //   }
      // })
      // if (forEachCell) { 

    }

  })
  // })




  // human moving interval https://clubmate.fi/remove-a-class-name-from-multiple-elements-with-pure-javascript/

  const humanMovingIntervalId = setInterval(() => {
    let currentCellsWithDisplayedHumans = document.querySelectorAll('.humanstyle') //at this point i will have cells with class humanstyles
    // console.log(currentCellsWithDisplayedHumans) //this works. will keep printing my 18 cells that has 


    function removeHumanClass() {
      for (let i = 0; i < currentCellsWithDisplayedHumans.length; i++) {
        currentCellsWithDisplayedHumans[i].classList.remove('humanstyle')
      }
    }

    function updateHumanArray() { //perhaps link to right wall. iN PROGRESS
      const rightWall = humans[width - 1] % width === 9 // not sure if humans[5] would work omg 
      const leftWall = humans[0] % width === 0
      //check if they're at the wall everytime they move! and every time they move is when the array is updated

      // if (any cell contain )

      humans = humans.map((elem) => {
        return elem + 1
        // need another constant to check whether new elem is part of the right wall 

      })
    }

    function addHumanClass() {
      for (let i = 0; i < humans.length; i++) {
        cells[humans[i]].classList.add('humanstyle')
      }
    }


    removeHumanClass()
    updateHumanArray()
    // // console.log(humans) to test that arrays are updating
    addHumanClass()

  }, 1000) //don't mess with this, closing bracket for humanMovingIntervalId





} //don't mess with this, closing bracket for function humanInvaders() 


window.addEventListener('DOMContentLoaded', humanInvaders)

//prevents scrolling in broser up/down/left/right
window.addEventListener('keydown', function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)