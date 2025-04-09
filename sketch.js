


function setup() {
    createCanvas(800, 600);
    background(220);
    setupDebugConsole();
    
    
}

function draw() {
    background(220);
    textSize(40);
    text('$' + clicks, 150, 50);
}

function mouseClicked() {
    click();
}

