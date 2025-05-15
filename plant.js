let hasPlantLand = false;
let hasPlant = false


const alloys = [
    {
        name: "Gold Alloy",
        components: ["Refined Metal", "Gold Nugget"],
        value: miningMaterials[5].value * miningMaterials[1].value,
        total: 0
    },
    {
        name: "Iron Alloy",
        components: ["Refined Metal", "Iron Ore"],
        value: miningMaterials[5].value * miningMaterials[0].value,
        total: 0
    },
    {
        name: "Emerald Alloy",
        components: ["Refined Metal", "Emerald"],
        value: miningMaterials[5].value * miningMaterials[4].value,
        total: 0
    },
    {
        name: "Gold-Steel Alloy",
        components: ["Steel", "Gold Nugget"],
        value: miningMaterials[6].value * miningMaterials[1].value,
        total: 0
    },
    {
        name: "Iron-Steel Alloy",
        components: ["Steel", "Iron Ore"],
        value: miningMaterials[6].value * miningMaterials[0].value,
        total: 0
    },
    {
        name: "Emerald-Steel Alloy",
        components: ["Steel", "Emerald"],
        value: miningMaterials[6].value * miningMaterials[4].value,
        total: 0
    }
];




function buyPlantLand() {
    if (money >= 500000 && !hasPlantLand) {
        hasPlantLand = true;
        money -= 500000;
    }
}

function buyPlant() {
    if (money >= 1500000 && hasPlantLand && !hasPlant) {
        hasPlant = true;
        
        money -= 1500000;
    }
}


function produce(metal, otherMetal) {
    console.log("Producing alloy with " + metal + " and " + otherMetal);
        const alloy = alloys.find(a =>
            a.components.includes(metal) && a.components.includes(otherMetal)
        );
        if (!alloy) {
            return;
        }

        // Find the miningMaterials for both components
        const metalObj = miningMaterials.find(m => m.name === metal);
        const otherObj = miningMaterials.find(m => m.name === otherMetal);

        if (metalObj && otherObj && metalObj.total > 0 && otherObj.total > 0) {
            metalObj.total -= 1;
            otherObj.total -= 1;
            alloy.total += 1;
    } 
        
}
    
function sellAlloy(alloyName) {
    const alloy = alloys.find(a => a.name === alloyName);

    if (alloy) {
        if (alloy.total > 0) {
            // Sell 1 unit of the alloy
            const earnings = alloy.value * alloy.total;
            alloy.total -=  alloy.total;
            money += earnings;
        } 
    } 
}