const buttons = document.querySelectorAll(".button");
const message = document.getElementById("message");
const outputMessage = document.getElementById("outputMessage");
const outputEmoji = document.getElementById("outputEmoji");
const statBars = document.querySelectorAll(".progress-text");
const styleBars = document.querySelectorAll(".bar");
const emojiButton = document.querySelectorAll(".emoji-button");

let gas = 100;
let food = 50;
let drink = 50;
let entertainment = 75;
let time = 100;
let moves = [];
let shopping = false;
let turnCount = 0;
let ended = false;
let movesEmoji = [];
let messageIsText = true;

function move() {
    if (ended) return;
    gas -= 10;
    food -= 4;
    drink -= 6;
    entertainment -= 8;
    time -= 4;
    turnCount += 1;

    updateBars();
    checkFail();
    checkSuccess();
}

function interact() {
    if (ended) return;
    food -= 4;
    drink -= 6;
    entertainment -= 8;
    time -= 4;
    turnCount += 1;

    if (gas > 100) gas = 100;
    if (food > 100) food = 100;
    if (drink > 100) drink = 100;
    if (entertainment > 100) entertainment = 100;

    updateBars();
    checkFail();
    checkSuccess();
}

function left() {
    move();
    moves.push(" Left");
    movesEmoji.push(" &#11013");
}

function up() {
    move();
    moves.push(" Up");
    movesEmoji.push(" &#11014");
}

function right() {
    move();
    moves.push(" Right");
    movesEmoji.push(" &#10145");
}

function down() {
    move();
    moves.push(" Down");
    movesEmoji.push(" &#11015");
}

function fuelPump() {
    gas += 100;
    interact();
    moves.push(" Gas");
    movesEmoji.push(" &#9981");
}

function flowerGarden() {
    entertainment += 100;
    interact();
    moves.push(" Flower");
    movesEmoji.push(" &#127804");
}

function ballroom() {
    entertainment += 100;
    food -= 10;
    drink -= 15;
    interact();
    moves.push(" Dancer");
    movesEmoji.push(" &#128131");
}

function coffeeHouse() {
    drink += 60;
    interact();
    moves.push(" Coffee");
    movesEmoji.push(" &#9749");
}

function juiceBar() {
    drink += 60;
    interact();
    moves.push(" Juice");
    movesEmoji.push(" &#129475");
}

function theater() {
    entertainment += 60;
    interact();
    moves.push(" Theater");
    movesEmoji.push(" &#127917");
}

function italianRestaurant() {
    food += 60;
    interact();
    moves.push(" Spaguetti");
    movesEmoji.push(" &#127837");
}

function tacoStand() {
    food += 60;
    interact();
    moves.push(" Taco");
    movesEmoji.push(" &#127790");
}

function nightClub() {
    drink += 40;
    entertainment += 40;
    interact();
    moves.push(" Nightclub");
    movesEmoji.push(" &#127865");
}

function fair() {
    food += 20;
    drink += 20;
    entertainment +=40;
    interact();
    moves.push(" Fair");
    movesEmoji.push(" &#127905");
}

function sandwichShop() {
    food += 40;
    drink += 20;
    interact();
    moves.push(" Sandwich");
    movesEmoji.push(" &#129386");
}

function airport() {
    entertainment -= 10;
    interact();
    moves.push(" Airport");
    movesEmoji.push(" &#9992");
    ended = true;
    checkSuccess();
}

function home() {
    
    moves.push(" Home");
    movesEmoji.push("  &#127969");
    interact();
    ended = true;
    checkSuccess();
}

function jewelryStore() {
    interact();
    moves.push(" Ring");
    movesEmoji.push(" &#128141");
}

function shoppingMall() {
    interact();
    shopping = true;
    moves.push(" Shopping");
    movesEmoji.push(" &#128717");
}

function checkFail() {
    if (gas <= 0 || food <= 0 || drink <= 0 || entertainment <= 0) {
        ended = true;

        statBars.forEach(
            function(bar) {
                if (bar.innerHTML <= 0) {
                    bar.parentNode.style.backgroundColor = "red";
                    bar.parentNode.style.border = "1px solid white";
                    bar.innerHTML = 0;
                } 
            }
        )
    }
}

function calcAP () {
    let affectionPoints = (food + drink + entertainment) / 6;
    if (shopping) {
        affectionPoints += 30;
    }
    return affectionPoints;

}

function checkSuccess() {
    if (time <= 0) {
        ended = true;
        message.innerHTML = "You will get " + Math.ceil(calcAP()) + " Affection Points.";
    }
    if (ended === true && time > 0 && gas > 0 && food > 0 && drink > 0 && entertainment > 0) {
        let homeAP = calcAP() * (1 - time / 100);
        if (shopping) {
            homeAP += 30;
        }
        message.innerHTML = "You will get " + Math.ceil(homeAP) + " Affection Points.";
    }
}

function textToEmojiButton() {
    if (messageIsText) {
        outputMessage.innerHTML = movesEmoji;
        messageIsText = false;
    } else {
        outputMessage.innerHTML = moves;
        messageIsText = true;
    }
}

function reset() {
    gas = 100;
    food = 50;
    drink = 50;
    entertainment = 75;
    time = 100;
    ended = false;
    moves = [];
    turnCount = 0;
    shopping = false;
    removeAllCD();
    updateBars();
    message.innerHTML = " "
    outputEmoji.innerHTML = " "
    movesEmoji = [];

    statBars.forEach(
        function (bar) {
            bar.parentNode.style.backgroundColor = "black";
            bar.parentNode.style.border = "1px solid white";
        }
    )
}

function removeAllCD() {
    buttons.forEach (
        function (button) {
            if (button.classList.contains("onCD")) {
                button.classList.remove("onCD")
            } else if (button.classList.contains("used")) {
                button.classList.remove("used")
            }
        }
    )
}

function goBack() {
    if (turnCount === 1) return;

    removeCD();
    moves.pop();
    movesEmoji = [];
    gas = 100;
    food = 50;
    drink = 50;
    entertainment = 75;
    time = 100;
    ended = false;
    turnCount -= 1;
    updateBars();
    shopping = false;

    message.innerHTML = " "

    statBars.forEach(
        function (bar) {
            bar.parentNode.style.backgroundColor = "black";
            bar.parentNode.style.border = "1px solid white";
        }
    )
    
    calcMoves();
}

function calcMoves() {
    if (ended) return;
    for (i = 0; i < moves.length; i++) {
        switch (moves[i]) {
            case " Gas":
                fuelPump();
                break;
            case " Flower":
                flowerGarden();
                break;
            case " Dancer":
                ballroom();
                break;
            case " Coffee":
                coffeeHouse();
                break;
            case " Juice":
                juiceBar();
                break;
            case " Theater":
                theater();
                break;
            case " Spaguetti":
                italianRestaurant();
                break;
            case " Taco":
                tacoStand();
                break;
            case " Nightclub":
                nightClub();
                break;
            case " Fair":
                fair();
                break;
            case " Sandwich":
                sandwichShop();
                break;
            case " Airport":
                airport();
                break;
            case " Home":
                home();
                break;
            case " Ring":
                jewelryStore();
                break;
            case " Shopping":
                shoppingMall();
                break;
            case " Up":
                up();
                break;
            case " Left":
                left();
                break;
            case " Down":
                down();
                break;
            case " Right":
                right();
                break;
        }
        turnCount -= 1;  
        moves.pop();
    }
}

function updateBarValue() {
    statBars.forEach(
        function (bar) {
            if (bar.id === "gas") {
                bar.innerHTML = gas;
            } else if (bar.id === "food") {
                bar.innerHTML = food;
            } else if (bar.id === "drink") {
                bar.innerHTML = drink;
            } else if (bar.id === "entertainment") {
                bar.innerHTML = entertainment;
            } else if (bar.id === "time") {
                bar.innerHTML = time;
            } 
        }
    )
}

function updateBarStyle() {
    styleBars.forEach(
        function (bar) {
            if (bar.classList.contains("gas")) {
                bar.style.width = gas.toString() + "%";
            } else if (bar.classList.contains("food")) {
                bar.style.width = food.toString() + "%";
            } else if (bar.classList.contains("drink")) {
                bar.style.width = drink.toString() + "%";
            } else if (bar.classList.contains("entertainment")) {
                bar.style.width = entertainment.toString() + "%";
            } else if (bar.classList.contains("time")) {
                bar.style.width = time.toString() + "%";
            }
        }
    )
}

function updateBarColor() {
    styleBars.forEach(
        function (bar) {
            let width = parseInt(bar.style.width,10);
            if (width >= 90) {
                bar.style.backgroundColor = "#33ff00";
            } else if (width >= 80 && width < 90) {
                bar.style.backgroundColor = "#66ff00";
            } else if (width >= 70 && width < 80) {
                bar.style.backgroundColor = "#99ff00";
            } else if (width >= 60 && width < 70) {
                bar.style.backgroundColor = "#ccff00";
            } else if (width >= 50 && width < 60) {
                bar.style.backgroundColor = "#ffff00";
            } else if (width >= 40 && width < 50) {
                bar.style.backgroundColor = "#ffcc00";
            } else if (width >= 30 && width < 40) {
                bar.style.backgroundColor = "#ff9900";
            } else if (width >= 20 && width < 30) {
                bar.style.backgroundColor = "#ff6600";
            } else if (width >= 10 && width < 20) {
                bar.style.backgroundColor = "#ff3300";
            } else if (width >= 0 && width < 10) {
                bar.style.backgroundColor = "#ff0000"; 
            }
        }
    )
}

function updateBars() {
    updateBarValue();
    updateBarStyle();
    updateBarColor();
}

function onCD(button) {
    button.classList.add("onCD"); 
}

function used(button) {
    button.classList.add("used");
}

function removeCD() {
    let lastMove = moves[moves.length - 1];
    let formatLastMove = lastMove.replace(" ","");
     buttons.forEach (
        function (button) {
            if (button.id === formatLastMove) {
                if (button.id === "Shopping") {
                    shopping = false;
                } else if (button.id === "Home" || button.id === "Airport") {
                    ended = false;
                    message.innerHTML = " ";
                }
                button.classList.remove("onCD");
                button.classList.remove("used");
            } 
        }
    )
}

function checkCD () {
    if (moves.length <= 10) return;
    const buttonsOnCD = document.querySelectorAll(".onCD");
    buttonsOnCD.forEach(
        function (button) {
            let formatMove = moves[turnCount - 11].replace(" ", "");
            if (button.id === formatMove) {
                button.classList.remove("onCD");
            }
        }
    )
}

function buttonPressed() {
    if (this.id === "reset") {
        reset();
    } else if (this.id === "goback") {
        goBack();
    } else if (ended) {
        return;
    } else {
        switch (this.id) {
            case "Gas":
                fuelPump();
                break;
            case "Flower":
                if (this.classList.contains("used")) return;
                flowerGarden();
                used(this);
                break;
            case "Dancer":
                if (this.classList.contains("onCD")) return;
                ballroom();
                onCD(this);
                break;
            case "Coffee":
                if (this.classList.contains("onCD")) return;
                coffeeHouse();
                onCD(this);
                break;
            case "Juice":
                if (this.classList.contains("onCD")) return;
                juiceBar();
                onCD(this);
                break;
            case "Theater":
                if (this.classList.contains("onCD")) return;
                theater();
                onCD(this);
                break;
            case "Spaguetti":
                if (this.classList.contains("onCD")) return;
                italianRestaurant();
                onCD(this);
                break;
            case "Taco":
                if (this.classList.contains("onCD")) return;
                tacoStand();
                onCD(this);
                break;
            case "Nightclub":
                if (this.classList.contains("onCD")) return;
                nightClub();
                onCD(this);
                break;
            case "Fair":
                if (this.classList.contains("onCD")) return;
                fair();
                onCD(this);
                break;
            case "Sandwich":
                if (this.classList.contains("onCD")) return;
                sandwichShop();
                onCD(this);
                break;
            case "Airport":
                airport();
                used(this);
                break;
            case "Home":
                home();
                used(this);
                break;
            case "Ring":
                if (this.classList.contains("used")) return;
                jewelryStore();
                used(this);
                break;
            case "Shopping":
                if (this.classList.contains("used")) return;
                shoppingMall();
                used(this);
                break;
            case "up":
                up();
                break;
            case "left":
                left();
                break;
            case "down":
                down();
                break;
            case "right":
                right();
                break;
        } 
    }  
    checkCD();
    outputMessage.innerHTML = moves;
}


emojiButton.forEach(button => button.addEventListener("click",textToEmojiButton))
buttons.forEach(button => button.addEventListener("click",buttonPressed));
document.addEventListener("contextmenu", event => event.preventDefault());


updateBars();

//final entertainment + final food + final drink / 6


//deberias hacer pa que calcule el home
//esta es la formula ap = (drink+food+emo)/6*(1-time/100)

