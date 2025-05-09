const { redirect } = require("server/reply");



function setup() {
    createCanvas(800, 600);
    background(220);
    setupDebugConsole();
    
    
}

function draw() {
    background(220);
    text("Coal: " + miningMaterials[3].total,50, 25);
    text("Iron: " + miningMaterials[0].total,50, 50);
    text("Gold: " + miningMaterials[1].total,50, 75);
    text("Emerald: " + miningMaterials[4].total,50, 100);
    text("Diamond: " + miningMaterials[2].total,50, 125);
    text("Mining Level: " + miningLevel,50, 200);
    text("Mining XP: " + miningXP +"/" + (miningLevel*100),50, 225);

    text("Money: " + money,50, 250);
    createButton("Mine").position(50, 150).mousePressed(mine);
    

   
    createButton("Sell Coal").position(125, 18).mousePressed(() => sellMaterial("Coal"));
    createButton("Sell Iron").position(125, 43).mousePressed(() => sellMaterial("Iron Ore"));
    createButton("Sell Gold").position(125, 68).mousePressed(() => sellMaterial("Gold Nugget"));
    createButton("Sell Emerald").position(125, 93).mousePressed(() => sellMaterial("Emerald"));
    createButton("Sell Diamond").position(125, 118).mousePressed(() => sellMaterial("Diamond"));    
    
}



function mouseReleased() {

}

