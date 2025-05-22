const { redirect } = require("server/reply");



function setup() {
    
    
    createCanvas(1200, 600);
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
        text("Warehouse Size: " + Math.round(getMaterialTotal()) + "/" + getTotalWarehouseSize(),20, 160);
        createButton("Buy Pickaxe - $" + 100*pickaxeLevel).position(20, 223).style('font-size', '10px').mousePressed(() => upgradePickaxe());
        createButton("Mine").position(50, 140).style('font-size', '10px').mousePressed(mine);
        createButton("Sell Coal").position(100, 18).style('font-size', '10px').mousePressed(() => sellMaterial("Coal", 1));
        createButton("Sell Iron").position(100, 43).style('font-size', '10px').mousePressed(() => sellMaterial("Iron Ore", 1));
        createButton("Sell Gold").position(100, 68).style('font-size', '10px').mousePressed(() => sellMaterial("Gold Nugget", 1));
        createButton("Sell Emerald").position(100, 93).style('font-size', '10px').mousePressed(() => sellMaterial("Emerald", 1));
        createButton("Sell Diamond").position(100, 118).style('font-size', '10px').mousePressed(() => sellMaterial("Diamond", 1));    
        createButton("Buy Mine - $1,200,000").style('font-size', '10px').position(20, 250).mousePressed(buyMine);
        createButton("Save Game").position(575, 575).style('font-size', '10px').mousePressed(saveAllGameData);
        createButton("Load Game").position(650, 575).style('font-size', '10px').mousePressed(loadGame);
        createButton("Clear Game").position(725, 575).style('font-size', '10px').mousePressed(clearGame);
        if (hasMine) {
            createButton("Hire Miner - $100,000").position(20, 275).style('font-size', '10px').mousePressed(buyMiner);
            checkForWork();
        }
        if (mineCompany && mineCompany.miners.length > 0) {
            for (let i = 0; i < mineCompany.miners.length; i++) {
                
                text(`Miner ${i + 1} Level: ${mineCompany.miners[i].level} Pickaxe Level: ${mineCompany.miners[i].pickaxeLevel} Miner XP: ${mineCompany.miners[i].getXP()}/${mineCompany.miners[i].getLevel()*100}` , 20, 300 + (i * 25));
                createButton('Upgrade Pickaxe - $10,000')
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
            createButton("Sell Refined Metal").position(90, 450).style('font-size', '10px').mousePressed(() => sellMaterial("Refined Metal", 1));
            
        }
        if (hasIronFurnace) {
            createButton("Smelt Refined Metal").position(20, 513).style('font-size', '10px').mousePressed(() => {ironFurnace.smelt()});
            createButton("Sell Steel").position(130, 513).style('font-size', '10px').mousePressed(() => sellMaterial("Steel", 1));
            text("Steel: " + miningMaterials[6].total,20, 535);
        }


        createButton("Buy Land - $500,000").position(190, 17).style('font-size', '10px').mousePressed(() => {buyPlantLand()});

        if (hasPlantLand) {
            createButton("Buy Metallurgical Plant - $1,500,000").position(190, 42).style('font-size', '10px').mousePressed(() => {buyPlant()});
        }
        if(hasPlant) {
            screen = "plant";
            text("Gold Alloy: " + alloys[0].total,190, 75);
            text("Iron Alloy: " + alloys[1].total,190, 100);
            text("Emerald Alloy: " + alloys[2].total,190, 125);
            text("Gold-Steel Alloy: " + alloys[3].total,190, 150);
            text("Iron-Steel Alloy: " + alloys[4].total,190, 175);
            text("Emerald-Steel Alloy: " + alloys[5].total,190, 200);
            createButton("Craft").position(335, 70).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Gold Nugget")});
            createButton("Craft").position(335, 95).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Iron Ore")});
            createButton("Craft").position(355, 120).style('font-size', '10px').mousePressed(() => {produce("Refined Metal", "Emerald")});
            createButton("Craft").position(360, 145).style('font-size', '10px').mousePressed(() => {produce("Steel", "Gold Nugget")});
            createButton("Craft").position(360, 170).style('font-size', '10px').mousePressed(() => {produce("Steel", "Iron Ore")});
            createButton("Craft").position(375, 195).style('font-size', '10px').mousePressed(() => {produce("Steel", "Emerald")});
            createButton("Sell").position(375, 70).style('font-size', '10px').mousePressed(() => sellAlloy("Gold Alloy", 1));
            createButton("Sell").position(375, 95).style('font-size', '10px').mousePressed(() => sellAlloy("Iron Alloy", 1));
            createButton("Sell").position(395, 120).style('font-size', '10px').mousePressed(() => sellAlloy("Emerald Alloy", 1));
            createButton("Sell").position(400, 145).style('font-size', '10px').mousePressed(() => sellAlloy("Gold-Steel Alloy", 1));
            createButton("Sell").position(400, 170).style('font-size', '10px').mousePressed(() => sellAlloy("Iron-Steel Alloy", 1));
            createButton("Sell").position(415, 195).style('font-size', '10px').mousePressed(() => sellAlloy("Emerald-Steel Alloy", 1));
        }
        
        createButton("Buy Logistic Company - $10,000").position(440, 17).style('font-size', '10px').mousePressed(() => {buyLogisticCompany()});
        if (hasLogisticCompany) {
            text("Gold Alloy: " + alloys[0].total,775, 25);
            text("Iron Alloy: " + alloys[1].total,775, 50);
            text("Emerald Alloy: " + alloys[2].total,775, 75);
            text("Gold-Steel Alloy: " + alloys[3].total,775, 100);
            text("Iron-Steel Alloy: " + alloys[4].total,775, 125);
            text("Emerald-Steel Alloy: " + alloys[5].total,775, 150);
            text("Refined Metal: " + miningMaterials[5].total,920, 175);
            createButton("Buy Van - $5,000").position(440, 42).style('font-size', '10px').mousePressed(() => {buyVan()});
            createButton("Buy Truck - $50,000").position(440, 67).style('font-size', '10px').mousePressed(() => {buyTruck()});
            createButton("Buy Barge - $100,000").position(440, 92).style('font-size', '10px').mousePressed(() => {buyBarge()});
            createButton("Buy Small Plane - $200,000").position(440, 117).style('font-size', '10px').mousePressed(() => {buySmallPlane()});
            createButton("Buy Cargo Ship - $12,000,000").position(440, 142).style('font-size', '10px').mousePressed(() => {buyCargoShip()});
            createButton("Buy Cargo Plane - $50,000,000").position(440, 167).style('font-size', '10px').mousePressed(() => {buyCargoPlane()});
            createButton("Buy Storage Shed - $100,000").position(455, 192).style('font-size', '10px').mousePressed(() => {buyWarehouse(0)});
            createButton("Buy Distribution Center - $1,000,000").position(455, 217).style('font-size', '10px').mousePressed(() => {buyWarehouse(1)});
            createButton("Buy Freight Warehouse - $4,000,000").position(455, 242).style('font-size', '10px').mousePressed(() => {buyWarehouse(2)});
            createButton("Buy Logistics Hub - $12,500,000").position(455, 267).style('font-size', '10px').mousePressed(() => {buyWarehouse(3)});
            text("Coal: " + Math.round(miningMaterials[3].total),630, 25);
            text("Iron: " +  Math.round(miningMaterials[0].total),630, 50);
            text("Gold: " +  Math.round(miningMaterials[1].total),630, 75);
            text("Emerald: " +  Math.round(miningMaterials[4].total),630, 100);
            text("Diamond: " +  Math.round(miningMaterials[2].total),630, 125);
            text("Warehouse Size: " + Math.round(getMaterialTotal()) + "/" + getTotalWarehouseSize(),630, 170);
            if (hasVan || hasTruck || hasBarge || hasSmallPlane || hasCargoShip || hasCargoPlane) {
                createButton("Export").position(730, 20).style('font-size', '10px').mousePressed(() => exportGoods("Coal"));
                createButton("Export").position(730, 45).style('font-size', '10px').mousePressed(() => exportGoods("Iron Ore"));
                createButton("Export").position(730, 70).style('font-size', '10px').mousePressed(() => exportGoods("Gold Nugget"));
                createButton("Export").position(730, 95).style('font-size', '10px').mousePressed(() => exportGoods("Emerald"));
                createButton("Export").position(730, 120).style('font-size', '10px').mousePressed(() => exportGoods("Diamond"));
                
            }
        }

    }
    
        
       
    
}


function mouseReleased() {

}

function saveAllGameData() {
    const saveData = {
        money,
        netWorth,
        curScreen,
        miningMaterials,
        pickaxeLevel,
        miningXP,
        miningLevel,
        hasMine,
        mineCompany: {
            miners: mineCompany.miners.map(miner => ({
                level: miner.level,
                xp: miner.xp,
                pickaxeLevel: miner.pickaxeLevel
            }))
        },
        hasStoneFurnace,
        hasIronFurnace,
        hasIndustrialFurnace,
        hasPlantLand,
        hasPlant,
        alloys: alloys.map(a => ({ total: a.total }))
        // Add other relevant variables here as needed
    };
    localStorage.setItem('gameSave', JSON.stringify(saveData));
    console.log("Game saved!");
}

function loadGame() {
    const saveData = JSON.parse(localStorage.getItem('gameSave'));
    if (!saveData) {
        console.log("No save data found.");
        return;
    }

    money = saveData.money;
    netWorth = saveData.netWorth;
    curScreen = saveData.curScreen;
    pickaxeLevel = saveData.pickaxeLevel;
    miningXP = saveData.miningXP;
    miningLevel = saveData.miningLevel;
    hasMine = saveData.hasMine;
    hasStoneFurnace = saveData.hasStoneFurnace;
    hasIronFurnace = saveData.hasIronFurnace;
    hasIndustrialFurnace = saveData.hasIndustrialFurnace;
    hasPlantLand = saveData.hasPlantLand;
    hasPlant = saveData.hasPlant;
    // Restore miningMaterials
    if (saveData.miningMaterials && Array.isArray(saveData.miningMaterials)) {
        for (let i = 0; i < miningMaterials.length; i++) {
            if (saveData.miningMaterials[i]) {
                miningMaterials[i].total = saveData.miningMaterials[i].total;
            }
        }
    }

    // Restore miners
    if (saveData.mineCompany && saveData.mineCompany.miners) {
        mineCompany.miners = [];
        for (const minerData of saveData.mineCompany.miners) {
            const m = new miner();
            m.level = minerData.level;
            m.xp = minerData.xp;
            m.pickaxeLevel = minerData.pickaxeLevel;
            mineCompany.miners.push(m);
        }
    }
    if (saveData.alloys && Array.isArray(saveData.alloys)) {
        for (let i = 0; i < alloys.length; i++) {
            if (saveData.alloys[i]) {
                alloys[i].total = saveData.alloys[i].total;
            }
        }
    }

    console.log("Game loaded!");
}

function clearGame() {
    // Reset main variables
    money = 0;
    netWorth = 0;
    curScreen = "home";
    pickaxeLevel = 1;
    miningXP = 0;
    miningLevel = 1;
    hasMine = false;
    hasStoneFurnace = false;
    hasIronFurnace = false;
    hasIndustrialFurnace = false;
    hasPlantLand = false;
    hasPlant = false;

    // Reset mining materials
    for (let i = 0; i < miningMaterials.length; i++) {
        miningMaterials[i].total = 0;
    }

    // Reset alloys
    for (let i = 0; i < alloys.length; i++) {
        alloys[i].total = 0;
    }

    // Reset miners
    mineCompany.miners = [];

    // Optionally clear localStorage save
    localStorage.removeItem('gameSave');

    console.log("Game cleared!");
}