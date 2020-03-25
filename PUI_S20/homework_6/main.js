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

function removeFromCart(item) {
    //get data needed and initialize variables
    var cart = item.parentNode.parentNode.parentNode;
    var roll = item.parentNode.parentNode;
    var quant = roll.firstChild.childNodes[2].textContent;
    var glaze = roll.firstChild.childNodes[4].textContent;
    
    //the quantity and glaze data
    var num = quant.slice(10);
    var flavor = glaze.slice(8);
    
    //remove visually
    cart.removeChild(roll);
    
    //update session storage
    var i;
    var total = Number(sessionStorage.rolls);
    var rolls = sessionStorage.cart.split(',');
    //find and delete the removed product info from storage
    for (i = 0; i < (2*total); i += 2) {
        if ((rolls[i] == num) && (rolls[i+1] == flavor)) 
        {
            rolls.splice(i, 2);
        }
    }
    total -= 1;
    //update order summary
    if (sessionStorage.rolls) {
        //if empty cart
        if (total === 0) {
            sessionStorage.rolls = total;
            sessionStorage.cart = rolls;
            document.body.removeChild(document.getElementById("orderSum"));
            
            //change to empty cart page
            var empty = document.createElement("DIV");
            empty.id = "empty";
            var message = document.createElement("H3");
            var text = "Your shopping cart is empty right now";
            message.appendChild(document.createTextNode(text));
            var but = document.createElement("BUTTON");
            var butText = "Continue Shopping";
            but.appendChild(document.createTextNode(butText));
            but.onclick = function() {window.location.href='products.html';}
            
            empty.appendChild(message);
            empty.appendChild(but);
            cart.appendChild(empty);
            
        }
        else {
            sessionStorage.rolls = total;
            sessionStorage.cart = rolls;
            
            //update order summary
            var itemT = document.getElementById("itemCost");
            var subT = document.getElementById("subtotalCost");
            var itemC = Number(itemT.textContent.slice(8));
            var subC = Number(subT.textContent.slice(11));
            var minus = Number(num) * 3.85;
            itemC -= minus;
            subC -= minus;
            itemT.textContent = "Items: $" + itemC.toFixed(2);
            subT.textContent = "Subtotal: $" + subC.toFixed(2);
        }
    }
}

function createProdInfo(newRoll, num, glaze) {
    //create div for product info
    var prod = document.createElement("DIV");
    prod.className = "prodInfo";
    
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
    
    //add remove function
    var remove = document.createElement("DIV");
    var textRemove = "Remove";
    var rem = document.createElement("BUTTON");
    rem.appendChild(document.createTextNode(textRemove));
    rem.onclick = function() {removeFromCart(this)};
    remove.appendChild(rem);
    remove.className = "delete";
    
    //append to prodInfo
    prod.appendChild(pic);
    prod.appendChild(prodName);
    prod.appendChild(quant);
    prod.appendChild(document.createElement("BR"));
    prod.appendChild(glaze);
    prod.appendChild(document.createElement("BR"));
    prod.appendChild(cost);
    
    
    //append to cart div
    newRoll.appendChild(prod);
    newRoll.appendChild(remove);
    newRoll.className = "cartRoll";
}

//creates the order summary box on the right of the cart page
function createOrderSummary (subtotal, summary) {
    //initialize variables
    var headingT = "Order Summary";
    var itemsT = "Items: $" + subtotal.toFixed(2);
    var shipHandleT = "Fees: $4.50"
    var subtotalT = "Subtotal: $" + (subtotal + 4.50).toFixed(2);
      
    //create the HTML elements
    var heading = document.createElement("H2");
    var items = document.createElement("H3");
    var shipHandle = document.createElement("H3");
    var total = document.createElement("H2");
    
    heading.appendChild(document.createTextNode(headingT));
    items.appendChild(document.createTextNode(itemsT));
    shipHandle.appendChild(document.createTextNode(shipHandleT));
    total.appendChild(document.createTextNode(subtotalT));
    
    //will be used to recalculate cost when removing products
    items.id = "itemCost";
    total.id = "subtotalCost";
    
    //add to the summary div
    summary.appendChild(heading);
    summary.appendChild(items);
    summary.appendChild(shipHandle);
    summary.appendChild(total);

}

//update the shopping cart page by using session storage data
function updateCart() {
    //check if user has added any products to the cart first
    if (sessionStorage.rolls && sessionStorage.rolls !== "0") {
        var total = Number(sessionStorage.rolls);
        //get the info as a string array
        var rolls = sessionStorage.cart.split(',');
        if (rolls[0] == "") {
            rolls.splice(0,1);
        }
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
        summary.id = "orderSum";
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
