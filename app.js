document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const score = document.querySelector("#score")
    const text = document.querySelector("#text")

    // width of the gameboard
    const width = 50
    //starting array of squares that the snake occupies
    let snake = [812, 811, 810]

    //"direction" of the snake head
    let direction = 1;

    let speed = 500;

    //adding snake class via the array of snake to div
    squares.forEach((square, i) => {
        if (i < snake.length) {
            squares[snake[i]].classList.add('snake')
        }
    })

    function moveSnake() {

        if (
            //if snake hits the left wall
            (snake[0] % width === 0 && direction === -1) ||
            //if snake hits the right wall
            (snake[0] % width === width - 1 && direction === 1) ||
            //if snake hits the top wall
            (snake[0] < width && direction === -width) ||
            //if snake hits the bottom wall
            (snake[0] > squares.length - width && direction == width) ||
            //if snake hits the itself
            squares[snake[0] + direction].classList.contains('snake')
        ) {
            text.textContent = "Game Over! Click to try again! your final score is "
            text.addEventListener('click', () => {
                location.reload()
            })

            return clearInterval(moveId)
        }

        //move snake tail
        const tail = snake.pop();
        squares[tail].classList.remove('snake');
        //add next array to snake array, direction is derived from arrow keys user presses
        snake.unshift(snake[0] + direction);

        //if snake class div overlaps food class div (snake eats food)
        if (squares[snake[0]].classList.contains('food')) {
            //the food class div disappears
            squares[snake[0]].classList.remove('food')
            //snake becomes longer
            squares[tail].classList.add('snake')
            snake.push(tail);
            //resets and increase speed
            clearInterval(moveId)
            speed *= 0.95;
            moveId = setInterval(moveSnake, speed)
            //makeFood
            makeFood()
        }

        //add snake class to div using snake head array 
        squares[snake[0]].classList.add('snake')

    }


    function control(e) {
        //if up arrow is press and snake is not moving down
        if (e.key == "ArrowUp" && direction != width) {
            direction = -width;
            //if down arrow is press and snake is not moving up
        } else if (e.key == "ArrowDown" && direction != -width) {
            direction = +width;
            //if left arrow is press and snake is not moving right
        } else if (e.key == "ArrowLeft" && direction != 1) {
            direction = -1;
            //if right arrow is press and snake is not moving left
        } else if (e.key == "ArrowRight" && direction != -1) {
            direction = 1;
        }
        //prevent snake from moving in opposite direction to so snake will not colide to itself
    }

    //set speed of snake
    let moveId = setInterval(moveSnake, speed)
    function makeFood() {
        do {//create random number within gameboard size
            random = Math.floor(Math.random() * squares.length)
            //if snake eats food
        } while (squares[random].classList.contains('snake'));
        //create random food 
        squares[random].classList.add('food')
    }

    var message = [1, 51, 101, 151, 201, 102, 103, 3, 53, 153, 203, 5, 6, 7, 56, 106, 156, 206, 205, 207, 210, 259, 12, 62, 112, 162, 212, 13, 64, 114, 15, 16, 66, 116, 166, 216, 18,
        68, 119, 169, 219, 20, 70, 24, 74, 124, 174, 224, 75, 126, 176, 27, 77, 127, 177, 227, 79, 129, 179, 229, 30, 130, 81, 131, 181, 231, 33, 83, 133, 183, 233, 34, 135, 85, 37, 87, 137
        , 187, 237, 36, 39, 89, 139, 189, 239, 40, 41, 140, 141, 240, 241, 351, 352, 353, 402, 452, 502, 552, 551, 553, 355, 356, 357, 405, 455, 456, 457, 507, 555, 556, 557, 361, 411, 461, 511, 561, 362, 413, 462,
        513, 563, 366, 415, 465, 515, 565, 466, 417, 467, 517, 567, 369, 419, 470, 520, 570, 371, 421, 701, 702, 703, 752, 802, 852, 902, 901, 903, 706, 755, 708, 758, 808, 858, 908, 709, 760, 810, 711, 712, 762
        , 812, 862, 912, 766, 816, 866, 916, 717, 768, 817, 818, 868, 918, 722, 723, 774, 823, 822, 874, 922, 923, 776, 727, 778, 828, 877, 926, 927, 928, ]
    message.forEach((element) => squares[element].classList.add('food'))

    makeFood();

    //execute the key function when key is up
    document.addEventListener('keyup', control);

})

