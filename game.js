kaboom()

//SECTION - CONFIG
const CELL = 20 // size of each grid cell in pixels

//SECTION - STATE
const dir = { x: 1, y: 0 } // current movement direction (starts moving right)

//SECTION - SNAKE HEAD
const snake = add([
    pos(5 * CELL, 9 * CELL), // starting position on the grid
    rect(CELL, CELL),         // square the size of one cell
    outline(4),               // border around the square
    area(),                   // hitbox (needed for collision later)
])

//SECTION - MOVEMENT LOOP
// moves the snake one cell in the current direction every 0.2 seconds
loop(0.2, () => {
    snake.pos.x += dir.x * CELL
    snake.pos.y += dir.y * CELL
})

//SECTION - INPUT
// arrow keys update the direction, loop handles the actual movement
onKeyPress("right", () => { dir.x = 1; dir.y = 0 })
onKeyPress("left", () => { dir.x = -1; dir.y = 0 })
onKeyPress("down", () => { dir.x = 0; dir.y = 1 })
onKeyPress("up", () => { dir.x = 0; dir.y = -1 })