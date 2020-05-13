const visualizeButton = document.getElementById("visualize");

function setVisualizeButtonAlgo(algorithm) {
    visualizeButton.addEventListener("click", algorithm);
}

const dfs_backtracking_maze_gen_button = document.getElementById("dfs-backtracking-maze-gen");

dfs_backtracking_maze_gen_button.addEventListener("click", () => {

});

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", reset);


const BFSButton = document.getElementById("BFSButton");

BFSButton.addEventListener("click", () => {
    setVisualizeButtonAlgo(breadthFirstSearchSetup);
});

