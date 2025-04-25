let clickUpgrade = {
    id: 0,
    level: 0,
    cost: 10,
    upgradeMultiplier: 1.0
}

let finalClickMultiplier = 1.0


function upgrader(id) {
    switch(id) {
        case clickUpgrade.id:
            if(clickUpgrade.cost<clicks) {
                clicks-=clickUpgrade.cost;
                clickUpgrade.cost*=1.7;
                clickUpgrade.upgradeMultiplier*=1.5;
                clickUpgrade.level+=1;
                
            }
            break;
    }
    clicks = Math.round(clicks);
    finalClickMultiplier = clickUpgrade.upgradeMultiplier;
}
