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
    if (forEachCell) { //if its true that any cell contains both class list 
      // remove class poop and class human
      return

    } else {
      cells[currentMonkey - width].classList.add('poopstyle')

    }

  }

}) //don't mess with this it's closing for monkey shooting poop

// if (cells.classList.contains('poop') && cells.classList.contains('human')) {//if NO cell does contains poop class and 
// cells[currentMonkey - width].classList.add('poopstyle')
// } else if (cells.classList.contains('random')) { //if any cell contains both poop class and human class 
//   return
// }


