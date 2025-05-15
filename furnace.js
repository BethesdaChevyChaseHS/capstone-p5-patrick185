let hasStoneFurnace = false;
let hasIronFurnace = false;
let hasIndustrialFurnace = false;

let stoneFurnace;
let ironFurnace;
let industrialFurnace;

class furnace {
    constructor(capacity, speed, id) {
        this.capacity = capacity; // Maximum number of items the furnace can hold
        this.speed = speed; // Time taken to smelt one item
        this.id = id; // ID of the furnace
    }
    smelt() {

        for (let i = 0; i < this.capacity; i++) {
            if(miningMaterials[3].total >= 1) {
            if (this.id === 1) {
                this.smeltIron();
            } else if (this.id === 2) {
                this.smeltRefinedMetal();
            } else if (this.id === 3) {
                this.smeltSteel();
            }
            miningMaterials[3].total -= 1;
        }
        
        }
    }
    smeltIron() {
        if (miningMaterials[0].total >= 1) {
            miningMaterials[0].total -= 1;
            miningMaterials[5].total += 1;
            
            
        }
    }
    smeltRefinedMetal() {
        if (miningMaterials[5].total >= 1) {
            miningMaterials[5].total -= 1;
            miningMaterials[6].total += 1;
            
            
        } 
    }
}



function buyFurnace(id) {
    if (id === 1) {
        if (money < 50000 || hasStoneFurnace) {
            return;
        }
        hasStoneFurnace = true;
        stoneFurnace = new furnace(10, 5000, 1);
        money -= 50000;
    } else if (id === 2) {
        if (money < 350000 || hasIronFurnace) {
            return;
        }
        hasIronFurnace = true;
        ironFurnace = new furnace(20, 2500, 2);
        money -= 350000;
    } else if (id === 3) {
        if (money < 200000 || hasIndustrialFurnace) {
            return;
        }
        hasIndustrialFurnace = true;
        industrialFurnace = new furnace(40, 1250, 3);
        money -= 200000;
    }
}