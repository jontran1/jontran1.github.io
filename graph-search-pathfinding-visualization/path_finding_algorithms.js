var distance;
var prev;
var set;
var priorityQueue;

/**
 * Sets up the dijkstra's algorthim data structures needed.
 */
function dijkstra_setup(){
    distance = new Map(); prev = new Map(); set = new Set();

    for(i = 0; i < grid.length; i++){
        
        cell = grid[i];
        if(!cell.isWall){
            // Set all distances to the largest possible value.
            distance.set(cell, Infinity);
            // Set all previous to null.
            prev.set(cell, undefined);
            // Add cell to set.
            set.add(cell);
        }

    }
    // Set the starting startCell distance to 0.
    distance.set(startCell, 0);

    currentAlgorithmObject.runFunction = function(){
        if(dijkstra_path_finding()){
            getDijkstraPath();
        }
    }
}

/**
 * Performs the pathfinding from the startCell to the targetCell. 
 */
function dijkstra_path_finding(){
    if(set.size > 0){
        // Get the index cell with the min distance.
        current = getCellWithMinDistance(distance, set);

        /**
         * If origin is undefined. The remaining cells in Q set is inaccessible
         * meaning its impossible for the path to even access the cell. 
         * getCellWithMinDistance() can't find a cell that is in Q and has a min value.
         * and therefore the set should be cleared. 
         */
        if(!current){
            set.clear(); return;
        }else current.highlightCell();

        // Remove current from set Q.
        set.forEach(function(cell){
            if(current.equals(cell)){
                set.delete(cell);
            }
        })

        // for each neighbor v of u...
        adjacentCells = current.adjacentCells();

        if(adjacentCells){
            for(i = 0; i < adjacentCells.length; i++){
                adjacentCell = adjacentCells[i];
                distanceToAdjacent = distance.get(current) + getEuclideanDistance(current, adjacentCell);

                if(distanceToAdjacent < distance.get(adjacentCell)){
                    distance.set(adjacentCell, distanceToAdjacent);
                    prev.set(adjacentCell, current);
                }
            }
        }
        return false;
    }
    return true;
}

function getDijkstraPath(){
    dijkstra_setup();

    while(set.size > 0){
        // Get the index cell with the min distance.
        current = getCellWithMinDistance(distance, set);

        /**
         * If current is undefined. The remaining cells in Q set is inaccessible
         * meaning its impossible for the path to even access the cell. 
         * getCellWithMinDistance() can't find a cell that is in Q and has a min value.
         * and therefore the set should be cleared. 
         */
        if(!current){
            set.clear(); break;
        }else current.turnCellGrey();

        // Remove current from set Q.
        set.forEach(function(cell){
            if(current.equals(cell)){
                set.delete(cell);
            }
        })

        // for each neighbor v of u...
        adjacentCells = current.adjacentCells();

        if(adjacentCells){
            for(i = 0; i < adjacentCells.length; i++){
                adjacentCell = adjacentCells[i];
                distanceToAdjacent = distance.get(current) + getEuclideanDistance(current, adjacentCell);

                if(distanceToAdjacent < distance.get(adjacentCell)){
                    distance.set(adjacentCell, distanceToAdjacent);
                    prev.set(adjacentCell, current);
                }
            }
        }
    }


    if(set.size == 0){
        getPath(startCell, targetCell, prev);
    }
}

/**
 * Calcualate the distance between u and v cells.
 * Uses the euclidean distance formula.
 * @param {Cell} u 
 * @param {Cell} v 
 */
function getEuclideanDistance(u, v){
    return Math.sqrt(Math.pow(u.i - v.i, 2) + Math.pow(u.j - v.j,2));
}

/**
 * Uses a linear search to find the min dsitance of a cell while also being in the set. 
 * Should consider getting better performance with a min heap data structure. 
 */
function getCellWithMinDistance(map, set){
    tempMin = Number.MAX_VALUE;
    minCell = undefined;
    for(let[cell, dist] of map){
        if(set.has(cell) && dist < tempMin){
            tempMin = dist;
            minCell = cell;
        }
    }
    return minCell;
}

function heuristic(cell){
    if(targetCell && cell) return getEuclideanDistance(cell, targetCell);
    return undefined;
}

var gScore;
var fScore;

function setupA_Star(){
    setupA_StarHelper();

    currentAlgorithmObject.runFunction = function(){
        if(aStarShortestPath()){
            this.runFunction = function() {
                getAStarShortestPath()
            };
        }
    }
}

function setupA_StarHelper() {
    set = new Set();
    prev = new Map();
    gScore = new Map();
    fScore = new Map();
    for (i = 0; i < grid.length; i++) {
        cell = grid[i];
        if (!cell.isWall) {
            // Set all distances to the largest possible value.
            gScore.set(cell, Infinity);
            fScore.set(cell, Infinity);
            // Set all previous to null.
            prev.set(cell, undefined);
            // Add cell to set.
            set.add(cell);
        }
    }
    gScore.set(startCell, 0);
    fScore.set(startCell, heuristic(startCell));
}

function aStarShortestPath(){
    if(set.size > 0){
        // Get the node with the lowest fScore value.
        current = getCellWithMinDistance(fScore, set);
        if(!current)return;
        current.highlightCell();
        if(current === targetCell){
            getPath(startCell, targetCell, prev);
            return true;
        }

        // Remove origin from set Q.
        set.forEach(function(cell){
            if(current.equals(cell)){
                set.delete(cell);
            }
        })
        adjacentCells = current.adjacentCells();
        
        if(adjacentCells){
            for(i = 0; i < adjacentCells.length; i++){
                adjacentCell = adjacentCells[i];
                tentative_gScore = gScore.get(current) + getEuclideanDistance(current, adjacentCell);

                if(tentative_gScore < gScore.get(adjacentCell)){
                    prev.set(adjacentCell, current);
                    gScore.set(adjacentCell, tentative_gScore);
                    fScore.set(adjacentCell, gScore.get(adjacentCell) + heuristic(adjacentCell));
                    if(!set.has(adjacentCell)){
                        set.add(adjacentCell);
                    }
                }
            }
        }
        return false;
    }
    return true;
}

function getAStarShortestPath(){
    setupA_StarHelper();

    while(set.size > 0){
        // Get the node with the lowest fScore value.
        current = getCellWithMinDistance(fScore, set);
        if(!current)return;
        current.turnCellGrey();
        if(current === targetCell){
            getPath(startCell, targetCell, prev);
            return;
        }

        // Remove origin from set Q.
        set.forEach(function(cell){
            if(current.equals(cell)){
                set.delete(cell);
            }
        })
        adjacentCells = current.adjacentCells();
        
        if(adjacentCells){
            for(i = 0; i < adjacentCells.length; i++){
                adjacentCell = adjacentCells[i];
                tentative_gScore = gScore.get(current) + getEuclideanDistance(current, adjacentCell);

                if(tentative_gScore < gScore.get(adjacentCell)){
                    prev.set(adjacentCell, current);
                    gScore.set(adjacentCell, tentative_gScore);
                    fScore.set(adjacentCell, gScore.get(adjacentCell) + heuristic(adjacentCell));
                    if(!set.has(adjacentCell)){
                        set.add(adjacentCell);
                    }
                }
            }
        }
    }
}


function setupGreedyBestFirstSearch(){
    setupGreedyBestFirstSearchHelper();
    currentAlgorithmObject.runFunction = function(){
        if(playGreedyBestFirstSearchAnimation()){
            this.runFunction = function() {
                getGreedyBestFirstSearchPath();
            };
        }
    }
}

function setupGreedyBestFirstSearchHelper() {
    priorityQueue = new PriorityQueue();
    visited = new Set();
    prev = new Map();
    priorityQueue.enqueue(startCell, getEuclideanDistance(startCell, targetCell));
    for (i = 0; i < grid.length; i++) {
        cell = grid[i];
        if (!cell.isWall) {
            // Set all previous to null.
            prev.set(cell, undefined);
        }
    }
}

function playGreedyBestFirstSearchAnimation(){
    if(!priorityQueue.isEmpty()){
        pqElement = priorityQueue.dequeue();
        if(!pqElement){
            console.log("Current no valid");
            return true;
        }
        current = pqElement.element;

        current.highlightCell();
        visited.add(current);
        if(current === targetCell){
            console.log("Target found.");
            return true;
        }

        adjacentCells = current.adjacentCells();
        for(let i = 0; i < adjacentCells.length; i++){

            adjacentCell = adjacentCells[i];
            if(!visited.has(adjacentCell)){
                priorityQueue.enqueue(adjacentCell, getEuclideanDistance(adjacentCell, targetCell));
                prev.set(adjacentCell, current);
            }else {
                visited.add(adjacentCell);
            }

        }
    }
    return false;
}

function getGreedyBestFirstSearchPath(){
    setupGreedyBestFirstSearchHelper();
    while(!priorityQueue.isEmpty()){
        pqElement = priorityQueue.dequeue();
        if(!pqElement){
            console.log("Current no valid");
            return false;
        }
        current = pqElement.element;

        current.turnCellGrey();
        visited.add(current);
        if(current === targetCell){
            break;
        }

        adjacentCells = current.adjacentCells();
        for(let i = 0; i < adjacentCells.length; i++){

            adjacentCell = adjacentCells[i];
            if(!visited.has(adjacentCell)){
                priorityQueue.enqueue(adjacentCell, getEuclideanDistance(adjacentCell, targetCell));
                prev.set(adjacentCell, current);
            }else {
                visited.add(adjacentCell);
            }

        }
    }
    getPath(startCell, targetCell, prev);
}

// Highlights the path from start to target using the prev map.
function getPath(start, target, prev){
    temp = target;
    while(temp !== start){
        temp = prev.get(temp);
        if(!temp) return;
        if(temp !== start) temp.highlightCell();
    }
}