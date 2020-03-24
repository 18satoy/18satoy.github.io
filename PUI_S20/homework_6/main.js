//store quantity and glaze for each product added
function Original(number, flavor) {
    this.num = number;
    this.glaze = flavor;
}
//initialize a roll
var originalRoll = new Original(1, "none");

//toString function to help update cart page
Original.prototype.toString = function rollToString() {
    return '' + this.num + ',' + this.glaze;
}

//when "add to cart" clicked, store the roll info into
//session storage
function addOriginalRoll() {
    var info = originalRoll.toString();
    //check if rolls already in cart
    if (sessionStorage.rolls) {
        sessionStorage.rolls = Number(sessionStorage.rolls) + 1;
        sessionStorage.cart = sessionStorage.cart.concat(',',info);
    }
    //if first item to add
    else {
        sessionStorage.rolls = 1;
        sessionStorage.cart = info;
    }
}

function createProdInfo(newRoll, num, glaze) {
    //calculate price
    var price = parseInt(num);
    price *= 3.85;
    
    //add name, quantity, glaze info
    var textZero = "Original Roll";
    var textOne = "Quantity: " + num;
    var textTwo = " Glaze: " + glaze;
    var textThree = "Price: $" + price.toFixed(2);
    var prodName = document.createElement("H2");
    var quant = document.createElement("A");
    var glaze = document.createElement("A");
    var cost = document.createElement("H3");
    prodName.appendChild(document.createTextNode(textZero));
    quant.appendChild(document.createTextNode(textOne));
    glaze.appendChild(document.createTextNode(textTwo));
    cost.appendChild(document.createTextNode(textThree));
    cost.className = "price";
    
    //add picture
    var pic = document.createElement("IMG");
    pic.setAttribute("src", "icons/original_s.jpg");
    pic.setAttribute("alt", "Original Roll");
    
    //append to actual div
    newRoll.appendChild(pic);
    newRoll.appendChild(prodName);
    newRoll.appendChild(quant);
    newRoll.appendChild(document.createElement("BR"));
    newRoll.appendChild(glaze);
    newRoll.appendChild(document.createElement("BR"));
    newRoll.appendChild(cost);
    newRoll.className = "cartRoll";
}

function createOrderSummary (subtotal, summary) {
    var headingT = "Order Summary";
    var itemsT = "Items: $" + subtotal.toFixed(2);
    var shipHandleT = "Fees: $4.50"
    var subtotalT = "Subtotal: $" + (subtotal + 4.50).toFixed(2);
        
    var heading = document.createElement("H2");
    var items = document.createElement("H3");
    var shipHandle = document.createElement("H3");
    var total = document.createElement("H2");
    
    heading.appendChild(document.createTextNode(headingT));
    items.appendChild(document.createTextNode(itemsT));
    shipHandle.appendChild(document.createTextNode(shipHandleT));
    total.appendChild(document.createTextNode(subtotalT));
    
    summary.appendChild(heading);
    summary.appendChild(items);
    summary.appendChild(shipHandle);
    summary.appendChild(total);

}

//update the shopping cart page by using session storage data
function updateCart() {
    //check if user has added any products to the cart first
    if (sessionStorage.rolls) {
        var total = Number(sessionStorage.rolls);
        //get the info as a string array
        var rolls = sessionStorage.cart.split(',');
        var i, num, glaze;
        var cart = document.getElementById("cart");
        //since products added, remove the empty message
        cart.removeChild(document.getElementById("empty"));
        //keep track of subtotal
        var subtotal = 0;
        //get each order: number and glaze
        for (i = 0; i < (2*total); i += 2) {
            var newRoll = document.createElement("DIV");
            num = rolls[i];
            glaze = rolls[i+1];
            
            //calculate subtotal
            subtotal += (parseInt(num) * 3.85);
            
            //add this info to the div
            createProdInfo(newRoll, num, glaze, subtotal);
            
            cart.appendChild(newRoll);
        }
        //create order summary box
        var summary = document.createElement("DIV");
        summary.className = "orderSummary";
        createOrderSummary(subtotal, summary);
        document.body.appendChild(summary);
        
        
    }
}

//give feedback when picking quantity, bg-color changes
function pickQuantity(item) {
    //get the html elements
    var one = document.getElementById("one");
    var three = document.getElementById("three");
    var six = document.getElementById("six");
    var twelve = document.getElementById("twelve");
    //if quantity = 1
    if (item.id == "one"){
        one.style.backgroundColor = "#fce5cdff";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 1;
    }
    //if quantity = 3
    else if (item.id == "three") {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "#fce5cdff";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 3;
    }
    //if quantity = 6
    else if (item.id == "six") {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "#fce5cdff";
        twelve.style.backgroundColor = "white";
        originalRoll.num = 6;
    }
    //if quantity = 12
    else {
        one.style.backgroundColor = "white";
        three.style.backgroundColor = "white";
        six.style.backgroundColor = "white";
        twelve.style.backgroundColor = "#fce5cdff";  
        originalRoll.num = 12;
    }
}

//give feedback when picking glaze, bg-color changes
function pickGlaze(item) {
    var none = document.getElementById("none");
    var sugar = document.getElementById("sugar");
    var vanilla = document.getElementById("vanilla");
    var chocolate = document.getElementById("chocolate");
    //if glaze = none
    if (item.id == "none") {
        none.style.backgroundColor = "#fce5cdff";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "none";
    }
    //if glaze = sugar-milk
    else if (item.id == "sugar") {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "#fce5cdff";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "sugar";
    }
    //if glaze = vanilla-milk
    else if (item.id == "vanilla") {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "#fce5cdff";
        chocolate.style.backgroundColor = "white";
        originalRoll.glaze = "vanilla";
    }
    //if glaze = double-chocolate
    else {
        none.style.backgroundColor = "white";
        sugar.style.backgroundColor = "white";
        vanilla.style.backgroundColor = "white";
        chocolate.style.backgroundColor = "#fce5cdff";
        originalRoll.glaze = "chocolate";
    }
}
