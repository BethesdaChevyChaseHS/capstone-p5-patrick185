
let miningMaterials = [
    {
        name: "Iron Ore",
        rarity: "Common",
        value: 10,
        total: 0
    },
    {
        name: "Gold Nugget",
        rarity: "Uncommon",
        value: 50,
        total: 0
    },
    {
        name: "Diamond",
        rarity: "Rare",
        value: 100,
        total: 0
    },
    {
        name: "Coal",
        rarity: "Common",
        value: 5,
        total: 0
    },
    {
        name: "Emerald",
        rarity: "Rare",
        value: 80,
        total: 0
    },
    {
        name: "Refined Metal",
        rarity: "Common",
        value: 40,
        total: 0
    },
    {
        name: "Steel",
        rarity: "Uncommon",
        value: 80,
        total: 0
    }
];

// Mining upgrades


let pickaxeLevel = 1;
let miningXP = 0;
let miningLevel = 1;


function mine() {
    let material = getRandomMaterial();
    if (material) {
        material.total += 1 * round(miningLevel/2)*pickaxeLevel/2; 
        console.log(`You mined a ${material.name}! Total: ${material.total}`);
    } else {
        console.log("No material found.");
    }
    updateLevel();
    
}

function updateLevel() {
    if(miningLevel <= 998) {
        if(miningXP/(miningLevel*100) >= 1) {
            miningLevel++;
            miningXP = 0;
        }
    }
}

function getRandomMaterial() {
    const random = Math.random() * 100; // Generate a random number between 0 and 100
    let selectedMaterial;

    if (random <= 1) {
        // 1% chance for Diamond
        selectedMaterial = miningMaterials.find(m => m.name === "Diamond");
    } else if (random <= 6) {
        // 5% chance for Emerald (1% + 5%)
        selectedMaterial = miningMaterials.find(m => m.name === "Emerald");
        
    } else if (random <= 66) {
        // 60% chance for Coal (6% + 60%)
        selectedMaterial = miningMaterials.find(m => m.name === "Coal");
        
    } else if (random <= 86) {
        // 20% chance for Iron (66% + 20%)
        selectedMaterial = miningMaterials.find(m => m.name === "Iron Ore");
        
    } else {
        // Remaining 14% chance for Gold
        selectedMaterial = miningMaterials.find(m => m.name === "Gold Nugget");
        
    }
    miningXP += 10;
    updateLevel();
    return selectedMaterial;
}

function upgradePickaxe() {
    if (money >= 100*pickaxeLevel) {
        money -= 100*pickaxeLevel;
        pickaxeLevel++;
    }
}
function sellMaterial(materialName) {
    const material = miningMaterials.find(m => m.name === materialName);

    if (material) {
        if (material.total > 0) {
            // Sell 1 unit of the material
            const earnings = material.value * material.total;
            material.total -=  material.total;
            

            money+=earnings; // Return the earnings
            netWorth+=earnings
        } else {
            console.log(`You don't have any ${material.name} to sell.`);
            return 0; // No earnings if there's nothing to sell
        }
    } else {
        console.log(`Material ${materialName} not found.`);
        return 0; // No earnings if the material doesn't exist
    }
}

