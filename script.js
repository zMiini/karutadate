const buttons = document.querySelectorAll(".button");
const message = document.getElementById("message");
const outputMessage = document.getElementById("outputMessage");
const statBars = document.querySelectorAll(".progress-text");
const styleBars = document.querySelectorAll(".bar");

let gas = 100;
let food = 50;
let drink = 50;
let entertainment = 75;
let time = 100;
let moves = [];
let affectionPoints = 0;
let turnCount = 0;
let ended = false;

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
    moves.push("Left ");
}

function up() {
    move();
    moves.push("Up ");
}

function right() {
    move();
    moves.push("Right ");
}

function down() {
    move();
    moves.push("Down ");
}

function fuelPump() {
    gas += 100;
    interact();
    moves.push(" Gas");
}

function flowerGarden() {
    entertainment += 100;
    interact();
    moves.push(" Flower");
}

function ballroom() {
    entertainment += 100;
    food -= 10;
    drink -= 15;
    interact();
    moves.push(" Dancer");
}

function coffeeHouse() {
    drink += 60;
    interact();
    moves.push(" Coffee");
}

function juiceBar() {
    drink += 60;
    interact();
    moves.push(" Juice");
}

function theater() {
    entertainment += 60;
    interact();
    moves.push(" Theater");
}

function italianRestaurant() {
    food += 60;
    interact();
    moves.push(" Spaguetti");
}

function tacoStand() {
    food += 60;
    interact();
    moves.push(" Taco");
}

function nightClub() {
    drink += 40;
    entertainment += 40;
    interact();
    moves.push(" Nightclub");
}

function fair() {
    food += 20;
    drink += 20;
    entertainment +=40;
    interact();
    moves.push(" Fair");
}

function sandwichShop() {
    food += 40;
    drink += 20;
    interact();
    moves.push(" Sandwich");
}

function airport() {
    entertainment -= 10;
    interact();
    moves.push(" Airport");
}

function home() {
    interact();
    moves.push(" Home");
}

function jewelryStore() {
    interact();
    moves.push(" Ring");
}

function shoppingMall() {
    interact();
    affectionPoints += 30;
    moves.push(" Mall");
}

function finalAPCalc() {
    affectionPoints += (entertainment + food + drink) / 6;
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

function checkSuccess() {
    if (time <= 0) {
        ended = true;
        finalAPCalc();
        message.innerHTML = "You will get around " + affectionPoints + " Affection Points.";

    }
}

function reset() {
    gas = 100;
    food = 50;
    drink = 50;
    entertainment = 75;
    time = 100;
    moves = [];
    affectionPoints = 0;
    turnCount = 0;
    ended = false;
    updateBars();

    statBars.forEach(
        function (bar) {
            bar.parentNode.style.backgroundColor = "black";
            bar.parentNode.style.border = "1px solid white";
        }
    )
}

function goBack() {
    if (turnCount === 1) return;
    turnCount -= 1;
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

function buttonPressed() {
    switch (this.id) {
        case "fuelPump":
            if (ended) return;
            fuelPump();
            break;
        case "flowerGarden":
            if (ended) return;
            flowerGarden();
            break;
        case "ballroom":
            if (ended) return;
            ballroom();
            break;
        case "coffeeHouse":
            if (ended) return;
            coffeeHouse();
            break;
        case "juiceBar":
            if (ended) return;
            juiceBar();
            break;
        case "theater":
            if (ended) return;
            theater();
            break;
        case "italianRestaurant":
            if (ended) return;
            italianRestaurant();
            break;
        case "tacoStand":
            if (ended) return;
            tacoStand();
            break;
        case "nightClub":
            if (ended) return;
            nightClub();
            break;
        case "fair":
            if (ended) return;
            fair();
            break;
        case "sandwichShop":
            if (ended) return;
            sandwichShop();
            break;
        case "airport":
            if (ended) return;
            airport();
            break;
        case "home":
            if (ended) return;
            home();
            break;
        case "jewelryStore":
            if (ended) return;
            jewelryStore();
            break;
        case "shoppingMall":
            if (ended) return;
            shoppingMall();
            break;
        case "up":
            if (ended) return;
            up();
            break;
        case "left":
            if (ended) return;
            left();
            break;
        case "down":
            if (ended) return;
            down();
            break;
        case "right":
            if (ended) return;
            right();
            break;
        case "reset":
            reset();
            break;
        case "goback":
            goBack();
            break;
    }   
    outputMessage.innerHTML = moves;
}

buttons.forEach(button => button.addEventListener("click",buttonPressed));
document.addEventListener("contextmenu", event => event.preventDefault());

updateBars();