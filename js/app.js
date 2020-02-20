console.log('test')


function humanInvaders() {
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95
  let humans = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27]
  let poops = [] //do i need this
  let currentCellsWithDisplayedHumans = document.querySelector('.humanstyles')

  
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
  

  // function removeHumanClass() {
  //   for (let i = 0; i < currentCellsWithDisplayedHumans.length; i++) {
  //     currentCellsWithDisplayedHumans[i].classList.remove('humanstyles')
  //   }

  // }
  // removeHumanClass()


  // human moving interval https://clubmate.fi/remove-a-class-name-from-multiple-elements-with-pure-javascript/
  // const humanMovingIntervalId = setInterval(() => {
  //   function removeHumanClass() {
  //     for (let i = 0; i < currentCellsWithDisplayedHumans.length; i++) {
  //       currentCellsWithDisplayedHumans[i].classList.remove('humanstyles')
  //     }

  //   }
  //   removeHumanClass()


  // }, 1000) //don't mess with this, closing bracket for humanMovingIntervalId



} //don't mess with this, closing bracket for function humanInvaders() 


window.addEventListener('DOMContentLoaded', humanInvaders)