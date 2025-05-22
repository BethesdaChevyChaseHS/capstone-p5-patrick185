let hasLogisticCompany = false;

// Vehicles
let hasVan = false;
let hasTruck = false;
let hasBarge = false;
let hasSmallPlane = false;
let hasCargoShip = false;
let hasCargoPlane = false;

//Warehouses
let Warehouses = [
    {
        size: 1000,
        price: 100000
    },
    {
        size: 50000,
        price: 1000000
    },
    {
        size: 100000,
        price: 4000000
    },
    {
        size: 1000000,
        price: 12500000
    }
];

let OwnedWarehouses = [];
let sellCapacity = 0;

function buyWarehouse(id) {
    // Prevent buying the same warehouse type multiple times
    const alreadyOwned = OwnedWarehouses.some(w => w.size === Warehouses[id].size);
    if (money >= Warehouses[id].price && !alreadyOwned) {
        money -= Warehouses[id].price;
        OwnedWarehouses.push({
            size: Warehouses[id].size,
            price: Warehouses[id].price
        });
        console.log(`Bought warehouse: ${Warehouses[id].size}`);
    } else if (alreadyOwned) {
        console.log("You already own this warehouse type.");
    } else {
        console.log("Not enough money.");
    }
}

ownedVehicles = [hasVan, hasTruck, hasBarge, hasSmallPlane, hasCargoShip, hasCargoPlane];


function buyLogisticCompany()  {
    if (money >= 10000 && !hasLogisticCompany) {
        money -= 10000;
        hasLogisticCompany = true;
    } 
}

function buyVan()  {
    if (money >= 5000 && !hasVan && hasLogisticCompany) {
        money -= 5000;
        hasVan = true;
        sellCapacity += 10;
    } 
}

function buyTruck()  {
    if (money >= 50000 && !hasTruck && hasLogisticCompany) {
        money -= 50000;
        hasTruck = true;
        sellCapacity += 100;
    } 
}

function buyBarge()  {
    if (money >= 100000 && !hasBarge && hasLogisticCompany) {
        money -= 100000;
        hasBarge = true;
        sellCapacity += 1000;
    } 
}
function buySmallPlane()  {
    if (money >= 200000 && !hasSmallPlane && hasLogisticCompany) {
        money -= 200000;
        hasSmallPlane = true;
        sellCapacity += 10000;
    } 
}
function buyCargoShip()  {
    if (money >= 12000000 && !hasCargoShip && hasLogisticCompany) {
        money -= 12000000;
        hasCargoShip = true;
        sellCapacity += 100000;
    } 
}
function buyCargoPlane()  {
    if (money >= 50000000 && !hasCargoPlane && hasLogisticCompany) {
        money -= 50000000;
        hasCargoPlane = true;
        sellCapacity += 1000000;
    } 
}

function exportGoods(type) {
    const material = miningMaterials.find(m => m.name === type);
    
    if (!material) {
        console.log("Material not found.");
        return;
    }
    // Determine the max amount we can sell
    const amountToSell = Math.min(material.total, sellCapacity);
    if (amountToSell > 0) {
        sellMaterial(type, amountToSell);
        console.log(`Exported ${amountToSell} ${type}(s).`);
    } else {
        console.log("Nothing to export or no capacity.");
    }
    
}

function getTotalWarehouseSize() {
    let totalSize = 10;
    for (let i = 0; i < OwnedWarehouses.length; i++) {
        totalSize += OwnedWarehouses[i].size;
    }
    return totalSize;
}

