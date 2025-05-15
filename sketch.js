const { redirect } = require("server/reply");

let buyMineButton; 

function setup() {
    loadGame();
    createCanvas(800, 600);
    setupDebugConsole();
    background(220);
    textSize(11);
}

function draw() {
    removeElements();
    
    if (curScreen === "home") {
        background(220);
    
        text("Coal: " + Math.round(miningMaterials[3].total),20, 25);
        text("Iron: " +  Math.round(miningMaterials[0].total),20, 50);
        text("Gold: " +  Math.round(miningMaterials[1].total),20, 75);
        text("Emerald: " +  Math.round(miningMaterials[4].total),20, 100);
        text("Diamond: " +  Math.round(miningMaterials[2].total),20, 125);
        text("Mining Level: " + miningLevel,20, 180);
        text("Mining XP: " + miningXP +"/" + (miningLevel*100),20, 195);

        text("Pickaxe Level: " + pickaxeLevel,20, 210);
        textSize(20);
        text("Money: $" + Math.round(money),25, 575);
        text("Net Worth: $" + Math.round(netWorth),350, 575);
        textSize(11);
        createButton("Buy Pickaxe - $" + 100*pickaxeLevel).position(20, 223).style('font-size', '10px').mousePressed(() => upgradePickaxe());
        createButton("Mine").position(50, 150).style('font-size', '10px').mousePressed(mine);
        createButton("Sell Coal").position(100, 18).style('font-size', '10px').mousePressed(() => sellMaterial("Coal"));
        createButton("Sell Iron").position(100, 43).style('font-size', '10px').mousePressed(() => sellMaterial("Iron Ore"));
        createButton("Sell Gold").position(100, 68).style('font-size', '10px').mousePressed(() => sellMaterial("Gold Nugget"));
        createButton("Sell Emerald").position(100, 93).style('font-size', '10px').mousePressed(() => sellMaterial("Emerald"));
        createButton("Sell Diamond").position(100, 118).style('font-size', '10px').mousePressed(() => sellMaterial("Diamond"));    
        createButton("Buy Mine - $1,200,000").style('font-size', '10px').position(20, 250).mousePressed(buyMine);

        if (hasMine) {
            createButton("Hire Miner - $10,000").position(20, 275).style('font-size', '10px').mousePressed(buyMiner);
            checkForWork();
        }
        if (mineCompany && mineCompany.miners.length > 0) {
            for (let i = 0; i < mineCompany.miners.length; i++) {
                
                text(`Miner ${i + 1} Level: ${mineCompany.miners[i].level} Pickaxe Level: ${mineCompany.miners[i].pickaxeLevel} Miner XP: ${mineCompany.miners[i].getXP()} / ${mineCompany.miners[i].getLevel()*100}` , 20, 300 + (i * 25));
                createButton('Upgrade Pickaxe')
                    .position(295, 295 + (i * 25))
                    .size(100, 20)
                    .style('font-size', '8px')
                    .mousePressed(() => mineCompany.miners[i].upgradePickaxe());
            }
        }
        
        createButton("Buy Stone Furnace - $50,000").position(20, 425).style('font-size', '10px').mousePressed(() => {buyFurnace(1)});
        if (hasStoneFurnace) {
            createButton("Smelt Iron").position(20, 450).style('font-size', '10px').mousePressed(() => {stoneFurnace.smelt()});
            createButton("Buy Iron Furnace - $350,000").position(20, 490).style('font-size', '10px').mousePressed(() => {buyFurnace(2)});
            text("Refined Metal: " + miningMaterials[5].total,20, 475);
            createButton("Sell Refined Metal").position(90, 450).style('font-size', '10px').mousePressed(() => sellMaterial("Refined Metal"));
            
        }
        if (hasIronFurnace) {
            createButton("Smelt Refined Metal").position(20, 513).style('font-size', '10px').mousePressed(() => {ironFurnace.smelt()});
            createButton("Sell Steel").position(130, 513).style('font-size', '10px').mousePressed(() => sellMaterial("Steel"));
            text("Steel: " + miningMaterials[6].total,20, 535);
        }


        createButton("Buy Land - $500,000").position(250, 17).style('font-size', '10px').mousePressed(() => {buyPlantLand()});

        if (hasPlantLand) {
            createButton("Buy Metallurgical Plant - $1,500,000").position(250, 42).style('font-size', '10px').mousePressed(() => {buyPlant()});
        }
        if(hasPlant) {
            screen = "plant";
            text("Gold Alloy: " + alloys[0].total,250, 75);
            text("Iron Alloy: " + alloys[1].total,250, 100);
            text("Emerald Alloy: " + alloys[2].total,250, 125);
            text("Gold-Steel Alloy: " + alloys[3].total,250, 150);
            text("Iron-Steel Alloy: " + alloys[4].total,250, 175);
            text("Emerald-Steel Alloy: " + alloys[5].total,250, 200);
            createButton("Craft").position(335, 70).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Gold Nugget")});
            createButton("Craft").position(335, 95).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Iron Ore")});
            createButton("Craft").position(355, 120).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Emerald")});
            createButton("Craft").position(360, 145).style('font-size', '10px').mousePressed(() => {produce("Steel", "Gold Nugget")});
            createButton("Craft").position(360, 170).style('font-size', '10px').mousePressed(() => {produce("Steel", "Iron Ore")});
            createButton("Craft").position(375, 195).style('font-size', '10px').mousePressed(() => {produce("Steel", "Emerald")});
            createButton("Sell").position(375, 70).style('font-size', '10px').mousePressed(() => sellAlloy("Gold Alloy"));
            createButton("Sell").position(375, 95).style('font-size', '10px').mousePressed(() => sellAlloy("Iron Alloy"));
            createButton("Sell").position(395, 120).style('font-size', '10px').mousePressed(() => sellAlloy("Emerald Alloy"));
            createButton("Sell").position(400, 145).style('font-size', '10px').mousePressed(() => sellAlloy("Gold-Steel Alloy"));
            createButton("Sell").position(400, 170).style('font-size', '10px').mousePressed(() => sellAlloy("Iron-Steel Alloy"));
            createButton("Sell").position(415, 195).style('font-size', '10px').mousePressed(() => sellAlloy("Emerald-Steel Alloy"));
        }
        
    }
    
        
       
    
}


function mouseReleased() {

}

function saveGame() {
    localStorage.setItem('money', money);
    localStorage.setItem('netWorth', netWorth);
    localStorage.setItem('miningMaterials', JSON.stringify(miningMaterials));
    localStorage.setItem('alloys', JSON.stringify(alloys));
    localStorage.setItem('pickaxeLevel', pickaxeLevel);
    localStorage.setItem('miningLevel', miningLevel);
    localStorage.setItem('miningXP', miningXP);
    // Add more as needed
}

function loadGame() {
    if (localStorage.getItem('money')) money = Number(localStorage.getItem('money'));
    if (localStorage.getItem('netWorth')) netWorth = Number(localStorage.getItem('netWorth'));
    if (localStorage.getItem('miningMaterials')) miningMaterials = JSON.parse(localStorage.getItem('miningMaterials'));
    if (localStorage.getItem('alloys')) alloys = JSON.parse(localStorage.getItem('alloys'));
    if (localStorage.getItem('pickaxeLevel')) pickaxeLevel = Number(localStorage.getItem('pickaxeLevel'));
    if (localStorage.getItem('miningLevel')) miningLevel = Number(localStorage.getItem('miningLevel'));
    if (localStorage.getItem('miningXP')) miningXP = Number(localStorage.getItem('miningXP'));
}