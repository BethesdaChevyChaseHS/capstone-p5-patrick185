
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
    }
];

// Mining upgrades
let pickaxeUpgrades = [
    {
        name: "None",
        multiplier: 1,
        cost: 0
    },
    {
        name: "Basic Pickaxe",
        multiplier: 1.2,
        cost: 100
    },
    {
        name: "Iron Pickaxe",
        multiplier: 1.5,
        cost: 300
    },
    {
        name: "Gold Pickaxe",
        multiplier: 2.0,
        cost: 600
    },
    {
        name: "Diamond Pickaxe",
        multiplier: 3.0,
        cost: 1200
    },
    {
        name: "Emerald Pickaxe",
        multiplier: 4.0,
        cost: 2000
    }
];

let currentPickaxe = pickaxeUpgrades[0];
let miningXP = 0;
let miningLevel = 1;

function mine() {
    let material = getRandomMaterial();
    if (material) {
        material.total += 1 * round(miningLevel/2)*currentPickaxe.multiplier; 
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
        miningXP += 50;
    } else if (random <= 6) {
        // 5% chance for Emerald (1% + 5%)
        selectedMaterial = miningMaterials.find(m => m.name === "Emerald");
        miningXP += 25;
    } else if (random <= 66) {
        // 60% chance for Coal (6% + 60%)
        selectedMaterial = miningMaterials.find(m => m.name === "Coal");
        miningXP += 5;
    } else if (random <= 86) {
        // 20% chance for Iron (66% + 20%)
        selectedMaterial = miningMaterials.find(m => m.name === "Iron Ore");
        miningXP += 10;
    } else {
        // Remaining 14% chance for Gold
        selectedMaterial = miningMaterials.find(m => m.name === "Gold Nugget");
        miningXP += 15;
    }
    return selectedMaterial;
}

function sellMaterial(materialName) {
    const material = miningMaterials.find(m => m.name === materialName);

    if (material) {
        if (material.total > 0) {
            // Sell 1 unit of the material
            material.total -= 1;
            const earnings = material.value;
            console.log(`Sold 1 ${material.name} for ${earnings} coins. Remaining: ${material.total}`);
            money+=earnings; // Return the earnings
        } else {
            console.log(`You don't have any ${material.name} to sell.`);
            return 0; // No earnings if there's nothing to sell
        }
    } else {
        console.log(`Material ${materialName} not found.`);
        return 0; // No earnings if the material doesn't exist
    }
}

