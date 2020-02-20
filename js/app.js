console.log('test')


function humanInvaders() {
  const width = 10
  const gridCellCount = width * width
  const grid = document.querySelector('.grid')
  const cells = []
  let currentMonkey = 95

  //creating the cells and adding it to become children of class="grid" 
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div') //create an element 'div', stored in a variable 'cell' every time the for loop runs 
    cell.classList.add('cellstyle') //add the class 'cell' to the created div, stored in variable 'cell' 
    if (i === currentMonkey) {
      cell.classList.add('monkeystyle')
    }
    grid.appendChild(cell)
    cells.push(cell) //array of cell elements will start from cell 0 
  }
  
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


} //don't mess with this, closing bracket for function humanInvaders() 


window.addEventListener('DOMContentLoaded', humanInvaders)