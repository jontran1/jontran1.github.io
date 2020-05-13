function depthFirstSearchSetup(){
    visited = []; stack = [];
    stack.push(startCell);

    currentAlgorithmObject.runFunction = function(){
        if(playDFSAnimation()){
            this.runFunction = function() {
                DFSIter()
            };
        }
    }
}

function DFSIter(){
    visited = []; stack = [];
    stack.push(startCell);


    while(stack.length > 0){
        current = stack.pop();
        current.turnCellGrey();

        if(current == targetCell){
            visited.push(current);
            return;
        }
        if(!visited.includes(current)){
            visited.push(current);
            adjacentCells = current.adjacentCells();
            if(adjacentCells){
                for(let i = 0; i < adjacentCells.length; i++){
                    stack.push(adjacentCells[i]);
                }
            }
        }
    }
}

function playDFSAnimation(){
    if(stack.length > 0){
        current = stack.pop();
        current.turnCellGrey();

        if(current == targetCell){
            visited.push(current);
            return true;
        }
        if(!visited.includes(current)){
            visited.push(current);
            adjacentCells = current.adjacentCells();
            if(adjacentCells){
                for(let i = 0; i < adjacentCells.length; i++){
                    stack.push(adjacentCells[i]);
                }
            }
        }
    }
    return false;
}

function breadthFirstSearchSetup(){
    bredthFirstSearchSetupHelper(); 

    currentAlgorithmObject.runFunction = function(){
        if(playBFSAnimation()){
            this.runFunction = function() {
                BFSIter();
            };
        }
    }
}

function bredthFirstSearchSetupHelper() {
    visited = [];
    stack = [];
    queue = new Queue(rows * cols);
    queue.enqueue(startCell);
}

function playBFSAnimation(){
    if(!queue.isEmpty()){
        current = queue.dequeue();
        current.turnCellGrey();

        if(current == targetCell){
            visited.push(current);
            return true;
        }
        if(!visited.includes(current)){
            visited.push(current);
            adjacentCells = current.adjacentCells();
            if(adjacentCells){
                for(let i = 0; i < adjacentCells.length; i++){
                    queue.enqueue(adjacentCells[i]);
                }
            }
        }
    }
    return false;
}

function BFSIter(){
    bredthFirstSearchSetupHelper();

    while(!queue.isEmpty()){
        current = queue.dequeue();
        current.turnCellGrey();

        if(current == targetCell){
            visited.push(current);
            return;
        }
        if(!visited.includes(current)){
            visited.push(current);
            adjacentCells = current.adjacentCells();
            if(adjacentCells){
                for(let i = 0; i < adjacentCells.length; i++){
                    queue.enqueue(adjacentCells[i]);
                }
            }
        }
    }
}