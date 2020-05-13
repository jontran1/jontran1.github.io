var MazeStack;

/**
 * Sets up the depth first recursive backingtracking maze
 * generation function.
 */
function activateMazeGenerationDFS(){
    MazeStack = [];
    playMazeGenerationAnimation = true;
    blackOutGrid();
    current = grid[index(1,1)];
    MazeStack.push(current);

    currentAlgorithmObject.runFunction = function(){
        playDepthFirstRecursiveBacktrackingAnimation();
    }

}

/**
 * Generates the maze. 
 */
function playDepthFirstRecursiveBacktrackingAnimation(){
    if(MazeStack.length != 0){
        current.isWall = false;
        current.highlightCell();
        // Step 1
        var next = checkNeightbors(current);
        if(next){
            next.isWall = false;
            // Step 2
            MazeStack.push(current);
            // Step 3
            removeWalls(current, next);
            // Step 4 
            current = next;
        }else if(MazeStack.length > 0) {
            current = MazeStack.pop();
        }
        return false;
    }
    setupStartAndTarget();
    return true;
}

function removeWalls(a, b){
    var x = a.i - b.i;
    var y = a.j - b.j;
    if(x === 0 && y === 2){
        grid[index(a.i, a.j-1)].isWall = false;
    }else if (y === -2){
        grid[index(a.i, a.j+1)].isWall = false;
    }
    if(y === 0 && x === -2){
        grid[index(a.i+1, a.j)].isWall = false;
    }else if(x === 2){
        grid[index(a.i-1, a.j)].isWall = false;

    }
}

/**
 * Returns a random neightbor that is a wall. 
 */
checkNeightbors = function(cell){
    var neightbors = [];
    
    // Skip over a cell to create a wall.
    var top = grid[index(cell.i,cell.j-2)];
    var right = grid[index(cell.i+2, cell.j)];
    var bottom = grid[index(cell.i, cell.j+2)];
    var left = grid[index(cell.i-2, cell.j)];

    if(top && top.isWall){
        neightbors.push(top);
    }
    if(right && right.isWall){
        neightbors.push(right);
    }
    if(bottom && bottom.isWall){
        neightbors.push(bottom);
    }
    if(left && left.isWall){
        neightbors.push(left);
    }
    if(neightbors.length > 0){
        var r = floor(random(0, neightbors.length));
        return neightbors[r];
    }
    return undefined;
}

/**
 * Every cell is turned into a wall. 
 */
function blackOutGrid(){
    for(var i = 0; i < grid.length; i++){
        grid[i].resetCell();
        grid[i].isWall = true;
    }
}

/**
 * Resets entire grid. Clearing all walls.
 */
function resetGrid(){
    for(var i = 0; i < grid.length; i++){
        grid[i].resetCell();
    }
}
