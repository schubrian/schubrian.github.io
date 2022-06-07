THIS IS A PROJECT 1 FOR SOFTWARE ENGINEERING IMMERSIVE

TIC TAC TOE GAME - RICK AND MORTY VERSION

TECHNOLOGIES USED:
- HTML
- CSS (Styling)
- JAVASCRIPT (Creating logic and for game functions)

LAYOUT: HTML
For the board of the TIC TAC TOE game layout, the method used are by creating 
an element call list (li) and (ul). Then, by creating an attribute called
"data-pos" which is data-position for the boxes of the board. (It is easier
to assign each boxes with numbers data)

STYLING: (CSS)
For each boxes in the board, I created a CSS style call "float" for each
data-postion or list so that each list would appear side by side rather than
top and bottom to make it appears 3x3 boxes. For the backgroud image, is set to
size (Cover) to cover the entire page, the position is set to center and body height
is set to 100% for the background to fit. 

GAME LOGIC: (JAVASCRIPT)
The logic for the tic tac toe game, the method used is function.
A function called "Game()" is created and in it has multiple funtions.
Firstly is by declaring varibles for calling and get the element of 
of the HTML. 
For the layout of the board, an array was declare so that to program
the winning combinations will be easier.
X and O are being assigned each a value, X = 1 and O = 0. So for the winning logic, 
if the boxes equals to 3 in any combination, X wins or else O wins. 
Switch Case was used in creating the player scores. Eveytime X or O wins, the score
will be increment by one (i++). and to reset the game or restart. An HTMl element
was created and is called as "<button id="restart-game" onclick="window.location.reload();">Restart</button>"

