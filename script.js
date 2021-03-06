//Defined an array which will stores the words for the game
let words = ['PYTHON', 'JAVA', 'REACTJS', 'ANGULARJS', 'SQL', 'PHP', 'HTML', 'CSS', 'RUBY', 'JAVASCRIPT', 'SWIFT', 'ANDROID', 'MYSQL', 'ORACLE', 'BOOTCAMP']
//This ran value will generate a random number
let ran = Math.floor(Math.random() * words.length)
let userValueForScore
let timeForScrambleGame
//to initialise the time
let time = 0
//select the html where we have to display the countdown
let timeLeftS = document.getElementById('timeLeft')
//this function take argument in seconds and return to min and sec
function convertSec(e) {
    let min = Math.floor(e / 60)
    let sec = e % 60
    return min + ":" + sec
}

//this function will start a countdown from a given time
let timer = () => {

    //this setinterval function will execute in every 1 sec
    setInterval(function () {
        //if the time = 0 which means your's times up so it will direct you to try again page
        if (time <= 0) {
            location.href = "./lose.html"
        }
        //if the player solves the memory game in the given time then the timer will be reset to 30 sec
        else if (tiles == arr.length) {
            tiles = 0
            clearInterval(time = 0)
            time = timeForScrambleGame

        }
        timeLeftS.innerHTML = convertSec(time)
        time--

    }, 1000)
}
// arr is an array which will store the letters for the randonly generated index of word * 2 for memory game
let arr = []
// tiles is a variable where we will store the total number of tiles to procced to scramble game
let tiles = 0
// memory_values is an array where we will store the value of two tiles to check is both are equal or not
let memory_values = []
//memory_tile_ids is an array wher we will store the ids of two tiles to change the style if they are equal
//we will give a style else a different style
let memory_tile_ids = []
// word variable will store the word that we have got by generating the random number
let word = words[ran]
let timeForScore = 0
let finalTimeForScore
setInterval(function () {
    if (userValueForScore == words[ran]) {
        clearInterval(timeForScore = 0)
    }
    timeForScore++
    finalTimeForScore = timeForScore
}, 1000)

//here we check the word length to give a reasonable time to solve the memory game according to the length of the word
if (word.length <= 4) {
    time = 8
    timer()
    timeForScrambleGame = 7
} else if (word.length < 6 && word.length > 4) {
    time = 30
    timer()
    timeForScrambleGame = 12
}
else {
    time = 60
    timer()
    timeForScrambleGame = 30
}
// In this for loop we are storing the letter twice in such a manner that the letters sould not be in arranged way
for (let i = 0; i < word.length; i++) {
    arr.push(word.charAt(i))
    arr.unshift(word.charAt(i))
}

// memory_tile_shuffle is a function which will again shuffle the word to avoid letters to placed in sequence
let memory_tile_shuffle = (arr) => {
    let i = arr.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[j];
        arr[j] = arr[i]
        arr[i] = temp;
    }
}

// newBoard is a function where the memory game is executed
function newBoard() {
    tiles = 0
    let output = ''
    memory_tile_shuffle(arr)

    //here we are creating the blocks of letters for memory game and initailising the memoryFlipTile function to
    //each block of letter
    for (let i = 0; i < arr.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + arr[i] + '\')"></div>'

    }
    //here we are inserting the html formatted blocks to a specific div
    document.getElementById('memory_board').innerHTML = output
}

// memoryFlipTile is a function where we check if both the blocks are equal or not
function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) { //is to check that we should only select two blocks only
        tile.style.background = '#FFF'
        tile.innerHTML = val
        if (memory_values.length == 0) { // here we are pushing the value and tile id of the first block
            memory_values.push(val) //to memory_value array
            memory_tile_ids.push(tile.id) //to memory_tile_ids array
        }
        else if (memory_values.length == 1) {// here we are pushing the value and tile id of the second block
            memory_values.push(val) //to memory_value array
            memory_tile_ids.push(tile.id) //to memory_tile_ids array
            if (memory_values[0] == memory_values[1]) { // here we are checking if the two blocks value is same or not
                tiles += 2 // and updating the tile to +2

                // this function will execute after 400ms and it will reduce the number of blocks by two
                setTimeout(function () {
                    memory_values = []
                    let tile_1 = document.getElementById(memory_tile_ids[0])
                    tile_1.style.display = 'none'
                    memory_tile_ids = []
                }, 400)
                if (tiles == arr.length) { //here we are checking if the player have completed the memory game or not

                    // this function will execute after 800ms and it will make the scramble game visible
                    setTimeout(function () {
                        let selector = document.getElementById("inputs")
                        let findHeaderSelector = document.getElementById("findheading")
                        findHeaderSelector.style.display = "none"
                        selector.style.opacity = 1
                    }, 800)

                }

            } else {

                //this function will execute after 800ms if the two blocks are not equal
                function flip2Back() {

                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.backgroundColor = '#ee5253'; //this will make the block to initail stage
                    tile_1.innerHTML = "";
                    tile_2.style.backgroundColor = '#ee5253'; //this will make the block to initail stage
                    tile_2.innerHTML = ""; // Clear both arrays

                    memory_values = [];
                    memory_tile_ids = [];

                }

                setTimeout(flip2Back, 800);

            }
        }
    }
}

let playBtn = document.getElementById('play')
let userLives = 3
let score

//this function will work when the button is pressed
playBtn.addEventListener('click', () => {
    let userInpSelector = document.getElementById('userInput')
    let livesSelector = document.getElementById('lives')
    let messageSelector = document.getElementById('message')
    // userValue take the value of the input that the player has given
    let userValue = (userInpSelector.value).toUpperCase()
    userValueForScore = userValue
    // userLives take the current live of the player
    userLives--

    if (userValue == words[ran]) {//this checks when player guess the word correct or not
        let winDivSelector = document.getElementById('winDiv')
        let wrapperSelector = document.getElementById('wrapper')
        let scoreSpamSelector = document.getElementById('score')
        let TotalTimeSelector = document.getElementById('totalTime')
        TotalTimeSelector.innerHTML = convertSec(finalTimeForScore)
        time = 300
        if (timeForScrambleGame == 7) {
            if (finalTimeForScore <= 7.5) {
                score = 50
            } else {
                score = 25
            }
        } else if (timeForScrambleGame == 12) {
            if (finalTimeForScore <= 13.5) {
                score = 50
            } else if (finalTimeForScore <= 20) {
                score = 35
            }
            else {
                score = 25
            }
        }
        else if (timeForScrambleGame == 30) {
            if (finalTimeForScore < 25) {
                score = 50
            } else if (finalTimeForScore <= 35) {
                score = 35
            }
            else {
                score = 25
            }
        }
        winDivSelector.style.display = 'flex'
        wrapperSelector.style.display = 'none'
        scoreSpamSelector.textContent = score

    }
    else if (userLives == 0) {//this checks if player loses all his live then display you the exact word that to be 
        //guess guessed for 5 sec then try again page will be displayed
        messageSelector.innerHTML = "The Guessing word was " + words[ran]
        messageSelector.style.fontWeight = '800'
        messageSelector.style.color = "#ee5253"
        messageSelector.style.backgroundColor = "#ebeff5"
        setTimeout(function () {
            location.href = "./lose.html"
        }, 5000)
    }
    else {

        // this will run when player guess is wrong but still has lives and update the live
        messageSelector.innerHTML = "Wrong Guess,Try Again"
        userInpSelector.value = ''
        userInpSelector.focus()
        livesSelector.textContent = userLives
    }
})

let playAgain = document.getElementById('reset')
playAgain.addEventListener('click', function () {
    location.href = 'game.html'
})

window.addEventListener('load', newBoard())
