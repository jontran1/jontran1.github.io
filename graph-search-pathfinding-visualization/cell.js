// Constructor for Cell object 
function Cell(i, j){

    this.i = i;
    this.j = j;
    this.isWall = false;
    this.green = false;
    this.red = false;

    var x = this.i*w;
    var y = this.j*w;

    /**
     * Displays the cell's current status. 
     */
    this.show = function(){
        if(this.green){
            this.turnCellGreen();
            this.isWall=false;
            return;
        }else if(this.red){
            this.turnCellRed();
            this.isWall=false;
            return;
        }else if(this.isWall){
            fill(0);
            rect(x,y,w+15,w+15);
        }else{
            fill(color(255, 255, 255));
            rect(x,y,w,w);
        }
    }

    /**
     * Clears the cell's status.
     */
    this.resetCell = function(){
        this.isWall = false;
        this.green = false;
        this.red = false;
    }
    
    /**
     * Returns adjacent cells.
     * As long as the adjacent cells aren't walls. They're valid
     * cells.
     */
    this.adjacentCells = function(){
        let neightbors = [];
        
        let top = grid[index(i,j-1)];
        let right = grid[index(i+1, j)];
        let bottom = grid[index(i, j+1)];
        let left = grid[index(i-1, j)];
        if(top && !top.isWall){
            neightbors.push(top);
        }
        if(right && !right.isWall){
            neightbors.push(right);
        }
        if(bottom && !bottom.isWall){
            neightbors.push(bottom);
        }
        if(left && !left.isWall){
            neightbors.push(left);
        }
        if(neightbors.length > 0){
            return neightbors;
        }

        return undefined;
    }

    this.turnCellRed = function(){
        fill(255,0,0);
        rect(x,y,w,w);      
    }
    
    this.highlightCell = function(){
        fill(255,0,255);
        rect(x,y,w,w);  
    }

    this.turnCellGreen = function(){
        fill(0,255,0);
        rect(x,y,w,w);
    }

    this.turnCellGrey = function(){
        fill(200,200,200);
        rect(x,y,w,w);
    }

    this.equals = function(cell){
        return this.i === cell.i && this.j === cell.j;
    }

}

/**
 * Uses the x and y coordinates to find the cell index. 
 * @param {float} mouseCorX 
 * @param {float} mouseCorY 
 */
function mouseIndex(mouseCorX, mouseCorY){
    let i = 0;
    let j = 0;
    let pixelX = 0;
    let pixelY = 0;
    while(pixelX < mouseCorX){
        pixelX += w;
        i++;
    }
    while(pixelY < mouseCorY){
        pixelY += w;
        j++;
    }
    return index(i-1, j-1);

}

/**
 * Uses the i and j values to find the index. The 2D grid is actually 
 * a 1D array.
 * @param {int} i 
 * @param {int} j 
 */
function index(i, j){
    // if(i < 1 || j < 1 || i >= cols-1 || j >= rows-1){
    //     return -1;
    // }
    if(i < 0 || j < 0 || i >= cols || j >= rows){
        return -1;
    }
    return i + j * cols;
}