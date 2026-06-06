kaboom()

//SECTION - CONFIG
const CELL = 20 // size of each grid cell in pixels

//SECTION - STATE
const dir = { x: 1, y: 0 } // current movement direction (starts moving right)

//SECTION - SNAKE HEAD

const segments = []
const snakeBody = [
    { x: 5, y: 9 },  // head
    { x: 4, y: 9 },  // segment
    { x: 3, y: 9 },  // tail

] // array to hold the snake's body segments

const drawSnake = () => {
    segments.forEach(destroy) // remove old segments
    segments.length = 0 // clear the segments array
    snakeBody.forEach((segment) => {
        const s = add([
            pos(segment.x * CELL, segment.y * CELL),
            rect(CELL, CELL),
            color(0, 255, 0),
            outline(4),
            area(),
            "snake",
        ])
        segments.push(s) // keep track of the new segment
    })
}
//SECTION - MOVEMENT LOOP
// moves the snake one cell in the current direction every 0.2 seconds
loop(0.2, () => {
    const head = snakeBody[0]
    const newHead = { x: head.x + dir.x, y: head.y + dir.y }
    snakeBody.unshift(newHead)
    snakeBody.pop()
    drawSnake()
})


//SECTION - INPUT
// arrow keys update the direction, loop handles the actual movement
onKeyPress("right", () => { dir.x = 1; dir.y = 0 })
onKeyPress("left", () => { dir.x = -1; dir.y = 0 })
onKeyPress("down", () => { dir.x = 0; dir.y = 1 })
onKeyPress("up", () => { dir.x = 0; dir.y = -1 })

//SECTION - SPAWN FOOD
const spawnFood = () => {
    // generate random grid coordinates
    const x = Math.floor(Math.random() * (width() / CELL)) * CELL
    const y = Math.floor(Math.random() * (height() / CELL)) * CELL
    return add([
        pos(x, y),
        rect(CELL, CELL),
        color(255, 0, 0),
        outline(4),
        area(),
        "food",

    ])
}

//SECTION - COLLISION 'FOOD'
onCollide("snake", "food", (s, f) => {
    destroy(f) // remove the food
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] }) // add new segment at the tail
    spawnFood() // spawn new food
})

drawSnake()
spawnFood()
