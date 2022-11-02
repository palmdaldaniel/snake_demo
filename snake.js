const bodyElement = document.querySelector('body');
const buttonEl = document.querySelector('button');

const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';

let snake = [204]
let dinner;
let DIRECTION_OF_SNAKE = DOWN;

let intervalId = null;
const difficulty = 100;



const createSnakeDiv = () => {
    const snakeDiv = document.createElement('div');
    snakeDiv.className = 'snake';
    return snakeDiv;
};


const removeBlock = (id, type) => {
    if (!id) return
    const parentEl = document.querySelector(`[data-id="${id}"]`);
    const block = parentEl.querySelector(`${type}`);
    parentEl.removeChild(block);
};

const addBlock = (id, type) => {
    if (!id) return null

    const parentEl = document.querySelector(`[data-id="${id}"]`);
    const block = document.createElement('div')
    block.className = type
    parentEl.appendChild(block);
}

const getDivId = (nextId, direction) => {
    switch (direction) {
        case UP:
            return snake.at(-1);
        case DOWN:
            return nextId.at(-1);
        case RIGHT:
            return getNextPosition(nextId, RIGHT);
        default:
            return getNextPosition(nextId, LEFT);
    }
}

const getRandomInt = (min, max) => {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};



const renderSnake = (nextId, idToRemove, direction, willChrash) => {
    const hit = nextId === dinner

    if (nextId) {
        addBlock(nextId, 'snake')
        if (hit) {
            removeBlock(dinner, '.block')
            addBlock(idToRemove, 'snake')

            // // update the snake
            snake.push(idToRemove)
            const newBlockId = getRandomInt(0, 100)
            dinner = newBlockId
            addBlock(newBlockId, 'block')
        }
    }

    if (willChrash) {
        alert('You died motherfucker')
        return
    }

    if (idToRemove) {
        removeBlock(idToRemove, '.snake')
    }
}

const chrashDetector = (id) => snake.includes(id)

function goUp() {
    const newSnakeArr = [...snake]
    const nextId = newSnakeArr[0] - 1
    const willChrash = chrashDetector(nextId)
    newSnakeArr.unshift(nextId)
    const idToRemove = newSnakeArr.pop()
    snake = newSnakeArr
    renderSnake(nextId, idToRemove, UP, willChrash)
}

let lastChildWasFound = false;



function goDown() {
    const newSnakeArr = [...snake]
    let nextId = newSnakeArr[0] + 1

    const willChrash = chrashDetector(nextId)
    newSnakeArr.unshift(nextId)
    const idToRemove = newSnakeArr.pop()
    snake = newSnakeArr
    renderSnake(nextId, idToRemove, DOWN, willChrash)
}

const getNextPosition = (currentId, action) => {
    let nextPos;
    const currentColumnm = document.querySelector(`[data-id="${currentId}"]`)
    const val = parseInt(currentColumnm.getAttribute('column'), 10);
    const parentEl = document.querySelector(`[data-id="${currentId}"]`).parentElement;


    if (action === RIGHT) {
        if (!parentEl.nextSibling) {
            const rowElement = document.querySelector(`[row="0"]`).childNodes;
            nextPos = rowElement
        } else {
            nextPos = parentEl.nextSibling.childNodes
        }
    } else {

        if (!parentEl.previousSibling) {
            const rowElement = document.querySelector(`[row="19"]`).childNodes;
            nextPos = rowElement
        } else {
            nextPos = parentEl.previousSibling.childNodes;
        }


    }

    return parseInt(nextPos[val].getAttribute('data-id'));
};


function goRight() {
    const newSnakeArr = [...snake]
    const nextId = getNextPosition(newSnakeArr[0], RIGHT)
    const willChrash = chrashDetector(nextId)


    newSnakeArr.unshift(nextId)
    const idToRemove = newSnakeArr.pop()
    snake = newSnakeArr
    renderSnake(nextId, idToRemove, RIGHT, willChrash)
}

function goLeft() {

    const newSnakeArr = [...snake]
    const nextId = getNextPosition(newSnakeArr[0], LEFT)
    const willChrash = chrashDetector(nextId)


    newSnakeArr.unshift(nextId)
    const idToRemove = newSnakeArr.pop()

    snake = newSnakeArr
    renderSnake(nextId, idToRemove, LEFT, willChrash)
}

const setDirection = (dir) => {
    try {
        switch (dir) {
            case UP:
                if (DIRECTION_OF_SNAKE === DOWN && snake.length > 1) return
                goUp()
                DIRECTION_OF_SNAKE = UP
                break;
            case DOWN:

                if (DIRECTION_OF_SNAKE === UP && snake.length > 1) return
                goDown()
                DIRECTION_OF_SNAKE = DOWN
                break
            case LEFT:
                if (DIRECTION_OF_SNAKE === RIGHT && snake.length > 1) return
                goLeft()
                DIRECTION_OF_SNAKE = LEFT
                break
            case RIGHT:
                if (DIRECTION_OF_SNAKE === LEFT && snake.length > 1) return
                goRight()
                DIRECTION_OF_SNAKE = RIGHT
                break
            default:
                throw 'Press button to start game'
        }

    } catch (error) {
        console.log('error', error);
    }
}
function keyDownEvent(event, def) {
    clearInterval(intervalId);
    setDirection(def ? def : event.key)
    intervalId = setInterval(() => setDirection(DIRECTION_OF_SNAKE), difficulty);
}

function startGame() {
    addBlock(snake[0], 'snake')
    dinner = getRandomInt(0, 100)
    addBlock(dinner, 'block')
    keyDownEvent(undefined, DIRECTION_OF_SNAKE)
}


buttonEl.addEventListener('click', startGame);
bodyElement.addEventListener('keydown', keyDownEvent)



