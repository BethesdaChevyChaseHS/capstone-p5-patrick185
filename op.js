let hasOperationLand = false;
let hasOperationCenter = false;

function buyOperationLand() {
    if (money >= 500000 && !hasOperationLand) {
        hasOperationLand = true;
        money -= 500000;
    }
}

function buyOperationCenter() {
    if (money >= 1500000 && hasOperationLand && !hasOperationCenter) {
        hasOperationCenter = true;
        money -= 1500000;
    }
}

let hasSmelter = false;
let hasExporter = false;
let hasAlloyMaker = false;

function buySmelter() {
    if (money >= 100000 && !hasSmelter) {
        hasSmelter = true;
        money -= 100000;
    }
}

