/*
Task1
🍕 The Great Pizza Disaster of 2026
yasso
*/
let studentName = "Ahmed";
const pizzaFlaver = "pepperoni";

let hungerLevel = 10;
let isPizzaHot = true;
let deliveryAddress = "Nasr city";

console.log(typeof hungerLevel);
console.log(typeof isPizzaHot);
console.log(typeof deliveryAddress);

let total = "85";
let totalBill = Number(total) + 15 + Number(isPizzaHot);
console.log(totalBill);

let minutesWaiting = 45 + 15;
if (minutesWaiting % 2 === 0) {
    console.log("The waiting time is even.");
} else {
    console.log("The waiting time is odd.");
}

console.log(2 + 3 * 4 - 1);
console.log((2 + 3) * (4 - 1));

if (isPizzaHot && hungerLevel > 7) {
    console.log("OPEN THE DOOR AND SPRINT");
} else if (5 <= hungerLevel && hungerLevel <= 7) {
    console.log("Walk, you have dignity");
} else {
    console.log("Order sushi next time");
}

// Expression: produces a value
console.log(hungerLevel > 5);

// Statement: performs an action
if (hungerLevel > 5) {
  console.log("Ahmed is VERY hungry");
}

console.log(pizzaFlaver.toUpperCase());
console.log(pizzaFlaver.length);
console.log(pizzaFlaver.includes("pepper"));

console.log(`hi ${studentName} , your order is pizza ${pizzaFlaver} total bill is ${totalBill} and you will wait ${minutesWaiting} minutes`);

let toppings = ["pepperoni", "mushrooms", "onions"];
const orders = {
    customer: "Ahmed",
    flaver: "pepperoni",
    isDeliverd: false
}

orders.isDeliverd = true;
console.log(orders);

// function calculateTotal(price, tip)
function calculateTotal(price, tip) {
    return price + tip;
}

let fun=(price,tip)=>{
    return price + tip;
}

console.log(calculateTotal(20, 10));
console.log(fun(20, 10));

let names=["Ahmed", "Sara", "Mona", "Tarek"];

for(let i=0; i<names.length; i++){
    console.log(`Delivering to ${names[i]}`);
    if(names[i]==="Ahmed"){
        break;
    }
}

