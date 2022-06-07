//const { default: Swal } = require("sweetalert2");

//const { default: Swal } = require("sweetalert2");

//const { default: Swal } = require("sweetalert2");

const Game = () => {
    // Elements
    let game = document.getElementById('game');
    let boxes = document.querySelectorAll('li');
    let resetGame = document.getElementById('reset-game');
    let turnDisplay = document.getElementById('whos-turn');
    let gameMessages = document.getElementById('game-messages');
    let playerOneScoreCard = document.getElementById('player-one-score');
    let playerTwoScoreCard = document.getElementById('player-two-score');
    
    // lets
    let context = { 'player1' : 'x', 'player2' : 'o' };
    let board = [];
    
    let playerOneScore = 0;
    let playerTwoScore = 0;
    
    let turns;
    let currentContext;
    
    // Constructor
    let init = function() {
        turns = 0;
        
        // Get current context
        currentContext = computeContext();
        
        // Setup 3 x 3 board 
        board[0] = new Array(3);
        board[1] = new Array(3);
        board[2] = new Array(3);
         
        // bind events
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', clickHandler, false);
        }
        
        resetGame.addEventListener('click', resetGameHandler, false);
    }
    
    //Keeps track of player's turn
    let computeContext = function() {
        return (turns % 2 == 0) ? context.player1 : context.player2;
    }
    
    // Bind the dom element to the click callback
    let clickHandler = function() {
        this.removeEventListener('click', clickHandler);
        let clickSound = document.getElementById("rick-wins");
            clickSound.src = "mixkit-water-sci-fi-bleep-902.wav";
            clickSound.play();
        
        this.className = currentContext;
        this.innerHTML = currentContext;
        
        let pos = this.getAttribute('data-pos').split(',');
        board[pos[0]][pos[1]] = computeContext() == 'x' ? 1 : 0;
        
        if(checkStatus()) {
            gameWon();
        }
        
        turns++;
        currentContext = computeContext();
        turnDisplay.className = currentContext;
    }
    
    // Check to see if player has won
    let checkStatus = function() {
        let used_boxes = 0;
        
        for(let rows = 0; rows < board.length; rows++ ) {
            let row_total = 0;
            let column_total = 0;
            
            for(let columns = 0; columns < board[rows].length; columns++) {
                row_total += board[rows][columns];
                column_total += board[columns][rows];
                
                if(typeof board[rows][columns] !== "undefined") {
                    used_boxes++;
                }
            }
            
            // Winning combination for diagonal scenario [0,4,8], [2,4,6]
            let diagonal_tl_br = board[0][0] + board[1][1] + board[2][2]; // diagonal top left to bottom right
            let diagonal_tr_bl = board[0][2] + board[1][1] + board[2][0]; // diagonal top right bottom left
            
            if(diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
                return true;
            }
            
            // Winning combination for row [0,1,2], [3,4,5], [6,7,8]
            // Winning combination for column [0,3,6], [1,4,7], [2,5,8]
            // Only way to win is if the total is 0 or if the total is 3. X are worth 1 point and O are worth 0 points
            if(row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
                return true;
            }
            
            // if all boxes are full - Draw!!!
            if(used_boxes == 9) {
                gameDraw();
            }
        }
    }
    let gameWon = () => {
        clearEvents();
        
        // show game won message
        gameMessages.className = 'player-' + computeContext() + '-win';
        
        // update the player score
        switch(computeContext()) {
            case 'x':
                playerOneScoreCard.innerHTML = ++playerOneScore;
                let rickAudio = document.getElementById("rick-wins");
                rickAudio.src = "Wubalubadubdub! _ Rick and Morty _ Adult Swim.mp3";
                Swal.fire({
                    title: "RICK WINS!"
                });
                rickAudio.play();
                document.body.style.backgroundImage = 'url("https://staticr1.blastingcdn.com/media/photogallery/2017/6/14/660x290/b_1200x675x75/mrw-rick-and-morty-episode-is-up-and-people-are-still-posting-imgurcom_1385977.jpg")';
                break;
            case 'o':
                playerTwoScoreCard.innerHTML = ++playerTwoScore;
                let mortyAudio = document.getElementById("rick-wins");
                Swal.fire("MORTY WINS");
                mortyAudio.src = "Oh, geez Rick and Morty S01E01.mp3";
                mortyAudio.play();
                document.body.style.backgroundImage = 'url("http://38.media.tumblr.com/e86295db18ed492fb9ddfa939244e8a9/tumblr_nnhrnqOYxT1uu9z7xo1_500.gif")';

        }
    }
    // Tells user when game is a draw.
    let gameDraw = () => {
        gameMessages.className = 'draw';
        let ricky = document.getElementById("rick-wins");
        ricky.src = "Rick’s New Catchphrase - Rick and Morty - Adult Swim-[AudioTrimmer.com].mp3";
        Swal.fire("DRAW");
        ricky.play();
        document.body.style.backgroundImage = 'url("https://giffiles.alphacoders.com/118/118782.gif")';
        clearEvents();
    }
    
    // Stops user from clicking empty cells after game is over
    let clearEvents = function() {
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', clickHandler);
        }
    }
    // Reset game to play again
    let resetGameHandler = () => {
        document.body.style.backgroundImage = 'url("https://wallpaperboat.com/wp-content/uploads/2019/04/rick-and-morty-wallpaper-portal-wallpaper-007.jpg")';
        clearEvents();
        init();
        
        // Go over all the li nodes and remove className of either x,o
        // clear out innerHTML
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].className = '';
            boxes[i].innerHTML = '';
        }
        
        // Change Who's turn class back to player1
        turnDisplay.className = currentContext;
        gameMessages.className = '';
    }
    
    game && init();
};

Game();

count = 0; 
audio = new Audio("Rick and Morty - Rick and Morty Theme.mp3");

//Audio Play and Mute Button
function togglePlay() {
    if (count % 2 == 0) {
        audio.play()
    } else { 
        audio.pause();
    }
    count += 1;
    }

// const myFunction = () => {
//     console.log()
// })
