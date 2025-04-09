let clicks = 0;
let multiplier = 1.0;


function click() {
    clicks = clicks + 1 * multiplier;
    
}

function upgrade_multiplier(amount) {
    multiplier += amount;
}

