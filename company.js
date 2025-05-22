let hasMine = false;



class miner {
    

    constructor() {
        this.level = 1;
        this.xp = 0;
        this.pickaxeLevel = 1;
    }

    levelUp() {
        if (this.xp >= this.level * 100) {
            this.level++;
            this.xp = 0;
        }
    }

    work() {
        let material = getRandomMaterial();
        if (material && getMaterialTotal()<getTotalWarehouseSize()) {
            material.total++;
            this.xp += 10;
        
        
        
        this.levelUp();
    }
    }
    upgradePickaxe() {
        if (money >= 10000) {
            this.pickaxeLevel++;
            money -= 10000;
        }
    }
    getXP() {
        return this.xp;
    }
    getLevel() {
        return this.level;
    }
}

class miningCompany {
    constructor() {
        this.miners = [];
    }
    work() {
        for (let i = 0; i < this.miners.length; i++) {
            this.miners[i].work();
        }
    }

    hireMiner() {
        if(money >= 100000) {
            this.miners.push(new miner());
            money -= 100000;
        }
    }
    
}
let mineCompany = new miningCompany();

function buyMine() {
    if(money >= 1200000) {
        hasMine = true;
        money -= 1200000;
    }
}

function buyMiner() {
    if (money >= 100000 && hasMine && mineCompany.miners.length < 5) {
        mineCompany.hireMiner();
        console.log("Miner hired. Total miners: " + mineCompany.miners.length);
    } 
}

function checkForWork() {
   
    
    if (hasMine && mineCompany.miners.length > 0) {
        mineCompany.work();
    }
}


