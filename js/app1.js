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
  let net = null
  let lives = 3
  let hasJustCollided = false
  let isGoingLeft = false

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

  }

  // function playLost 
  function playerLost() {
    console.log('player lost')
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

}







window.addEventListener('DOMContentLoaded', start)
window.addEventListener('keydown', function (e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault()
  }
}, false)