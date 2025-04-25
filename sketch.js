const { redirect } = require("server/reply");
 
function setup() {
    createCanvas(800, 600);
    background(220);
    setupDebugConsole();
    
    
}

function draw() {
    background(220);
    text(clicks, 200, 200);
    
}



function mouseReleased() {
    if(mouseX < 400) {
        click();
    }
    else {
        upgrader(0);
    }
}

