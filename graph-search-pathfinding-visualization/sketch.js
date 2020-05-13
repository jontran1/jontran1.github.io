var cols, rows;
var w = 25;
var grid = [];
var startCell;
var targetCell;

var stack;
var visited;
var queue;  

var mouseOnTarget = false;
var draggingTargetCell = false;

var mouseOnStartingCell = false;
var draggingStartingCell = false;

var currentAlgorithmObject = {
    
    runFunction : function(){console.log("Its running")},

    setFunction: function(functionObject){
        this.run = functionObject;
    }
}



function setup(){
    var canvas = createCanvas(500,500);
    cols = floor(width/w);
    rows = floor(height/w);
    frameRate(20);
    for(var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    canvas.parent('sketch-holder');

    makeMazeButton = createButton("Make Maze");
    makeMazeButton.mousePressed(activateMazeGenerationDFS);

    dfsButton = createButton("DFS");
    dfsButton.mousePressed(depthFirstSearchSetup);

    bfsButton = createButton("BFS");
    bfsButton.mousePressed(breadthFirstSearchSetup);

    dijkstraButton = createButton("Dijkstra Algorithm");
    dijkstraButton.mousePressed(dijkstra_setup);

    a_StarButton = createButton("A Star Algorithm");
    a_StarButton.mousePressed(setupA_Star);

    BFSGreedyPathButton = createButton("Greedy Best First Search Path Finding");
    BFSGreedyPathButton.mousePressed(setupGreedyBestFirstSearch);

    setupStartAndTarget();
}

/**
 * Continously is called by p5.js to constantly update the user
 * on what is happening on screen. 
 */
function draw(){

    for(var i = 0; i < grid.length; i++){
        grid[i].show();
    }  
      
    currentAlgorithmObject.runFunction();
    
    startCell.turnCellGreen();
    targetCell.turnCellRed();
}

/**
 * Black outs the cell. Making the cell inaccessible.
 * If the user clicks on a start cell or target, the function simply
 * returns. 
 */
function mouseClicked(){

    let cell = grid[mouseIndex(mouseX, mouseY)];

    if(!cell) return;
    if(cell == targetCell || cell == startCell)return;
    if(draggingTargetCell || draggingStartingCell) return;
    cell.isWall = !cell.isWall;
}

/**
 * Function checks for startCell or targetCell dragging. 
 * If either of these cells are dragged over a wall, the function simply returns.
 * Else if the the startCell or targetCell is moved to a new location.
 */
function mouseDragged(){
    let cell = grid[mouseIndex(mouseX, mouseY)];
    if(!cell){
        return;
    }
    if(cell.isWall){
        return;
    }
    if(draggingTargetCell && cell != startCell){
        setCell(targetCell);
        return;
    }
    if(draggingStartingCell && cell != targetCell){
        setCell(startCell);
        return;
    }
    setTimeout((cell) => {cell.isWall = !cell.isWall;}, 10, cell);
    
}

/**
 * Everytime the user's performs a mouse click hold on a cell.
 * 
 */
function mousePressed(){
    if(mouseIsOnTarget()){
        draggingTargetCell = true;
    }
    if(mouseIsOnStartingCell()){
        draggingStartingCell = true;
    }
}

function mouseReleased(){
    let cell = grid[mouseIndex(mouseX, mouseY)];
    
    if(!cell) return;

    if(draggingTargetCell && cell != startCell && !cell.isWall){
        if(setCell(targetCell)){
            draggingTargetCell=false;
        }
    }
    if(draggingStartingCell && cell != targetCell && !cell.isWall){
        if(setCell(startCell)){
            draggingStartingCell=false;
        }
    }
  }
  

function setupStartAndTarget(){
    if(startCell){startCell.resetCell();}
    if(targetCell){targetCell.resetCell();}

    startCell = grid[index(1,1)];
    startCell.green = true;
    targetCell = grid[index(rows-1,cols-1)];
    targetCell.red = true;
}

/**
 * Setting the targetCell and the startCell.
 * @param {Cell} cell 
 */
function setCell(cell){
    var index = mouseIndex(mouseX, mouseY);

    if(index >= 0){
        if(cell == targetCell){
            targetCell.resetCell();
            targetCell = grid[index];
            targetCell.red = true; 
            return true; 
        }else if(cell == startCell){
            startCell.resetCell();
            startCell = grid[index];
            startCell.green = true; 
            return true;
        }
 
    }
    return false;
}

/**
 * Resets the entire game. 
 */
function reset(){
    playMazeGenerationAnimation = false;
    resetGrid();
    setupStartAndTarget();
    loop();
}

/**
 * Checks if mouse is on targetCell.
 */
function mouseIsOnTarget(){
    if(grid[mouseIndex(mouseX, mouseY)] == targetCell){
        return true;
    }
    return false;
}

/**
 * Checks if mouse is on startingCell.
 */
function mouseIsOnStartingCell(){
    if(grid[mouseIndex(mouseX, mouseY)] == startCell){
        return true;
    }
    return false;
}


function dragTarget(){
    if(grid[mouseIndex(mouseX, mouseY)] == targetCell && mouseOnTarget){
        return true;
    }
    return false;
}

Array.min = function(array){
    return Math.min.apply(Math, array);
}




