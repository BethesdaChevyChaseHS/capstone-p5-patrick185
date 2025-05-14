const { redirect } = require("server/reply");

let buyMineButton; 

function setup() {
    createCanvas(800, 600);
    setupDebugConsole();
    background(220);
    textSize(11);
    
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

    text("Pickaxe Level: " + pickaxeLevel,50, 250);
    textSize(20);
    text("Money: $" + money,25, 575);
    text("New Worth: $" + newWorth,350, 575);
    textSize(11);
    createButton("Buy Pickaxe - $" + 100*pickaxeLevel).position(150, 243).mousePressed(() => upgradePickaxe());
    createButton("Mine").position(50, 150).mousePressed(mine);
    createButton("Sell Coal").position(125, 18).mousePressed(() => sellMaterial("Coal"));
    createButton("Sell Iron").position(125, 43).mousePressed(() => sellMaterial("Iron Ore"));
    createButton("Sell Gold").position(125, 68).mousePressed(() => sellMaterial("Gold Nugget"));
    createButton("Sell Emerald").position(125, 93).mousePressed(() => sellMaterial("Emerald"));
    createButton("Sell Diamond").position(130, 118).mousePressed(() => sellMaterial("Diamond"));    
    createButton("Buy Mine - $1,200,000").position(50, 275).mousePressed(buyMine);

    if (hasMine) {
        createButton("Hire Miner - $10,000").position(50, 300).mousePressed(buyMiner);
        checkForWork();
    }
    if (mineCompany && mineCompany.miners.length > 0) {
        for (let i = 0; i < mineCompany.miners.length; i++) {
            
            text(`Miner ${i + 1} Level: ${mineCompany.miners[i].level} Pickaxe Level: ${mineCompany.miners[i].pickaxeLevel} Miner XP: ${mineCompany.miners[i].getXP()} / ${mineCompany.miners[i].getLevel()*100}` , 35, 325 + (i * 25));
            createButton('Upgrade Pickaxe')
                .position(315, 317 + (i * 25))
                .size(130, 20)
                
                .mousePressed(() => mineCompany.miners[i].upgradePickaxe());
        }
    }
    
}


function mouseReleased() {

}
