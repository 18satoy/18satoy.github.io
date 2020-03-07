function Original(number, flavor) {
    this.num = number;
    this.glaze = flavor;
}
var originalRoll = new Original(1, "none");

Original.prototype.toString = function rollToString() {
    return '' + this.num + ',' + this.glaze;
}

function addOriginalRoll() {
    var info = originalRoll.toString();
    if (sessionStorage.rolls) {
        sessionStorage.rolls = Number(sessionStorage.rolls) + 1;
        sessionStorage.cart = sessionStorage.cart.concat(',',info);
    }
    else {
        sessionStorage.rolls = 1;
        sessionStorage.cart = info;
    }
}

function updateCart() {
    var total = Number(sessionStorage.rolls);
    var rolls = sessionStorage.cart.split(',');
    var i, num, glaze;
    var cart = document.getElementById("cart");
    if (total > 0) {
        cart.removeChild(document.getElementById("empty"));
        for (i = 0; i < (2*total); i += 2) {
            var newRoll = document.createElement("li");
            num = rolls[i];
            glaze = rolls[i+1];
            var textZero = "Original Roll "
            var textOne = "Quantity: " + num;
            var textTwo = " Glaze: " + glaze;
            newRoll.appendChild(document.createTextNode(textZero));
            newRoll.appendChild(document.createTextNode(textOne));
            newRoll.appendChild(document.createTextNode(textTwo));
            newRoll.className = "cartRoll";
            cart.appendChild(newRoll);
            cart.appendChild(document.createElement('br'));
        }
    }
}

function pickQuantity(item) {
    var one = document.getElementById("one");
    var three = document.getElementById("three");
    var six = document.getElementById("six");
    var twelve = document.getElementById("twelve");
    if (item.id == "one"){
        one.style.backgroundColor = "#fce5cdff";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 1;
    }
    else if (item.id == "three") {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "#fce5cdff";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 3;
    }
    else if (item.id == "six") {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "#fce5cdff";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 6;
    }
    else {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "#fce5cdff";  
        originalRoll.num = 12;
    }
}

function pickGlaze(item) {
    var none = document.getElementById("none");
    var sugar = document.getElementById("sugar");
    var vanilla = document.getElementById("vanilla");
    var chocolate = document.getElementById("chocolate");
    if (item.id == "none") {
        none.style.backgroundColor = "#fce5cdff";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "none";
    }
    else if (item.id == "sugar") {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "#fce5cdff";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "sugar";
    }
    else if (item.id == "vanilla") {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "#fce5cdff";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "vanilla";
    }
    else {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "#fce5cdff";
        originalRoll.glaze = "chocolate";
    }
}
