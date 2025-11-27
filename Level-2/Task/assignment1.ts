//task1

interface User{
    name: string,
    age: number,
    isActive: boolean
}

function greet(user:User){
    console.log(`welcome ${user.name}`, user);  
}

function CreateUser<User>(name:string, age:number, isActive:boolean){
    let user:any = {name: name, age: age, isActive: isActive};
    greet(user); 
    return user;
}


let user:any = CreateUser("Mohamed", 25, false);

console.log(user);
console.log(typeof user);

///////////////////////////////////////////

//task2

type productName = string;
type price = number;
type instock = boolean;
type tags = string[]; 
type metadata = {weight:number, color:string};

//2

function calculateTotal(price:price, taxrate:number){
    let total = price + (price * taxrate);
    return total;
}



let score: number[] = [95, 87, 92, 88];

let coordinate: [number, number] = [10, 20];


///////////////////////////////////

// exercise3

let str: string; //string 
let num: number; //numbet
let numArray: number[]; //array of numbers
let userr: any = {name: "a",age: 10};

function multiply(num1: number, num2: number){
   let mul = num1 * num2;
    return typeof mul;
}

const str2 = "hello";

let n = [10, 20, 30, 40, 50];

n.forEach((e)=>{
    return typeof e
})

let tup: [number, string, number, string] = [1, "two", 3, "three"];

console.log(typeof tup, "Because in js arrays are objects");

let answers = [ "When i assign value directly with out annotation",
     "When i need to give a specific datatype for variable",
     "at const we cant change the annotaion, but let is more flexible"]
    

for(let i = 0; i < answers.length; i++){
    console.log(`q${i+1}: ${answers[i]}`);
}

console.log("//////////////////////////////////////\nexercise4")

///////////////////////////////////////////////////////////

// Exercies 4

type ex4 = {name: string, age: number}

// let ex4var: ex4 = {name: "hello"};

console.log("The error is Property 'age' is missing in type '{ name: string; }' but required in type 'ex4'");

interface Obj{
    name: string,    
    age: number
}

function createObj<T extends Obj>(obj: T){
    console.log({name: obj.name, age: obj.age});
    return obj;
}


let obj2 = {name: "mo", age: 10, email: "mo10@gmail.com"}

console.log(createObj(obj2), "it worked because TypeScript contains what is called structrul typing which means that if what is required exists then it is acceptable");


type Calculator = (a:number, b:number)=> number;

let add: Calculator = (a, b) => num;

console.log("TypeScript infer they are numbers due to the add type");


async function fun():Promise<String> {
    return "hello";    
}

fun().then((result)=>{
    result;
});

console.log("result type is string");


console.log("////////////////////////////////\nexercise5");

/////////////////////////////////
// exercise 5 

/////// 1
type Id = string | number;

function getItemById(id:Id){
    if(typeof id == "string"){
        return "string string";
    }

    else{
        return "Number number";
    }
}


console.log(getItemById(10));
console.log(getItemById("10"));



////////// 2

type hasName = {name: string};
type hasAge = {age: number};

type Person = hasName & hasAge;


let person: Person = {name: "Mohamed", age: 10};

///////////////////// 3

type Status = "pending" | "approved" | "rejected";

// let stat: Status = "Hello";

console.log("It returned an error because we can't assign any value for type Status outside the allowed ones");


////////////////////////////////// 4


type ProductSimple = {
    id: number,
    name: string,
    price: number
}

let product:ProductSimple = {id: 1, name:"labtop", price: 20};

////////////////////////////////// 5 

function getFirst(e:any[]){
    return e[0] != null ? e[0]: "undefined";
}


console.log(getFirst([10, 155, 156]));
console.log(getFirst(["sat", "sun", "mon"]));

///////////////////////////////// 6 

type PartialProduct = Partial<ProductSimple>;

type ReadOnlyProduct = Readonly<ProductSimple>;

type ProductPreview = Pick<ProductSimple, "id" | "name"| "price">;

/////////////////////////////////////////////////////////////////////////

//Exercise 6

/////////////////////1

type ID = number;
type Point = [x:number, y:number];

type CllBack = (p:string)=>void;

interface Animal{
    name: string,
    age: number
}


///////////////////// 2 


let dog: Animal = {name: "Punchy", age:10};

class Vechile{
    brand:string;
    model:string;
    year:number;
    constructor(brand:string, model:string, year:number){
         this.brand = brand;
         this.model = model;
         this.year = year;
    }
    getInfo(): string{
        //console.log(property);
        return `brand:${this.brand}, model: ${this.model}, year: ${this.year}`;
    }
}

///////////////////// 3

let v:Vechile = new Vechile("mercedes", "nn112", 2025);


console.log(v);


/////////////////////////// 4

type Book = {
    title: string,
    author: string,
    pages: number
}

let book: Book = {title: "the secret of room 207", author:"Dr.Ahmed Khaled Tawfik", pages: 200};

//////////////////////// 5


interface User{
    name:string,
    email:string
}

type UserId = string | number;

class UserManager{
    users: User[] = [];
    addUser(user:User){
        this.users.push(user);
    }

    remove(email:string){
        this.users = this.users.filter( u=>u.email !== email)
    }

    getUsers(): User[] {
        return this.users;
    }
}



/////////////////////////////////////////////// 7 

// ============================================
// E-COMMERCE SYSTEM - COMPLETE IMPLEMENTATION
// ============================================

// 1. TYPE ALIASES
// TODO: Define these type aliases:
type ProductId = string | number;
type Currency = "USD" | "EUR" | "GBP";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// 2. INTERFACES

interface Product {
    id: ProductId;
    name: string;
    price: number;
    currency: Currency;
    inStock: boolean;
    category: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    orders: Order[];
}

interface Order {
    orderId: string;
    customerId: number;
    products: Product[];
    status: OrderStatus;
    total: number;
}

// 3. SHOPPING CART CLASS
// TODO: Implement complete ShoppingCart class
class ShoppingCart {
    private items: Product[] = [];
    
    // TODO: Add a product to cart (check if in stock first)
    addItem(product: Product): void {
      this.items.push(product);
    }
    
    // TODO: Remove a product by ID
    removeItem(productId: ProductId): void {
        this.items = this.items.filter(p=>p.id !== productId);
    }
    
    // TODO: Calculate total price of all items
    calculateTotal(): number {
        let sum:number = 0;
        this.items.forEach((item)=>{
            sum = sum + item.price;
        })

        return sum;
    }
    
    // TODO: Get all items in cart (return a copy)
    getItems(): Product[] {
        return this.items
    }
    
    // TODO: Create an order from current cart
    checkout(customer: Customer): Order {
        let validProducts = this.items.filter(p=>p.inStock);
        const total = this.items.reduce((sum,p)=>sum+p.price, 0);
        const orderId = Math.random().toString(36).substring(2, 9);
        const order:Order = {
            orderId,
            customerId: customer.id,
            products: validProducts,
            status: "pending",
            total
        }

        customer.orders.push(order);
        this.items = [];
        return order;
    }
}

// 4. GENERIC REPOSITORY CLASS
// TODO: Implement generic Repository pattern
class Repository<T extends { id: ProductId }> {
    private items: T[] = [];
    
    // TODO: Add an item to repository
    add(item: T): void {
        this.items.push(item);
    }
    
    // TODO: Find item by ID
    findById(id: ProductId): T | undefined {
        let item:any = this.items.filter(p=>p.id == id);
        return item;
    }
    
    // TODO: Get all items
    getAll(): T[] {
        return this.items;
    }
    
    update(id: ProductId, updates: Partial<T>): boolean {
    const index = this.items.findIndex(p => p.id === id);
    if (index === -1) return false; 
    this.items[index] = { ...this.items[index], ...updates };
    return true;
}

}

// 5. UTILITY FUNCTIONS
// TODO: Filter products by category
function filterByCategory(
    products: Product[],
    category: string
): Product[] {
    const filtered:Product[] = products.filter(p=>p.category === category);
    return filtered;
}

function convertCurrency(
    amount: number,
    from: Currency,
    to: Currency
): number {

    const rates: Record<Currency, number> = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.73
    };

    const amountInUSD = amount / rates[from];
    const converted = amountInUSD * rates[to];

    return parseFloat(converted.toFixed(2)); 
}


// TODO: Type guard to check if object is a Product
function isProduct(obj: any): obj is Product {
    return obj !== null &&
        typeof obj === "object" &&
        ("id" in obj) &&
        ("name" in obj && typeof obj.name === "string") &&
        ("price" in obj && typeof obj.price === "number") &&
        ("currency" in obj && (obj.currency === "USD" || obj.currency === "EUR" || obj.currency === "GBP")) &&
        ("inStock" in obj && typeof obj.inStock === "boolean") &&
        ("category" in obj && typeof obj.category === "string");
}

// 6. TESTING SECTION
// TODO: Create instances and test all functionality

// Create product repository
const productRepo = new Repository<Product>();

// Create shopping cart
const cart = new ShoppingCart();

// Create sample products
const laptop: Product = {
    id: 1,
    name: "Gaming Laptop",
    price: 1299.99,
    currency: "USD",
    inStock: true,
    category: "Electronics"
};

const mouse: Product = {
    id: 2,
    name: "Wireless Mouse",
    price: 29.99,
    currency: "USD",
    inStock: true,
    category: "Accessories"
};

const keyboard: Product = {
    id: 3,
    name: "Mechanical Keyboard",
    price: 89.99,
    currency: "USD",
    inStock: false,
    category: "Accessories"
};

// Create sample customer
const customer: Customer = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: []
};

console.log("=== REPOSITORY TESTS ===");

// Add products to repository
productRepo.add(laptop);
console.log("Added laptop to repository:", laptop);

productRepo.add(mouse);
console.log("Added mouse to repository:", mouse);

productRepo.add(keyboard);
console.log("Added keyboard to repository:", keyboard);

// Find product by ID
const foundProduct = productRepo.findById(2);
console.log("Found product with ID 2:", foundProduct);

// Get all products
const allProducts = productRepo.getAll();
console.log("All products in repository:", allProducts);

// Update product
const updateResult = productRepo.update(3, { inStock: true, price: 79.99 });
console.log("Updated product 3 result:", updateResult);
console.log("Updated product 3 details:", productRepo.findById(3));

console.log("\n=== SHOPPING CART TESTS ===");

// Add products to cart
cart.addItem(laptop);
console.log("Added laptop to cart:", laptop);

cart.addItem(mouse);
console.log("Added mouse to cart:", mouse);

cart.addItem(keyboard);
console.log("Added keyboard to cart:", keyboard);

// Get cart items
console.log("Current cart items:", cart.getItems());

// Calculate total
const cartTotal = cart.calculateTotal();
console.log("Cart total price:", cartTotal);

// Remove item
cart.removeItem(2);
console.log("Removed mouse from cart. Cart now:", cart.getItems());

console.log("\n=== UTILITY FUNCTIONS TESTS ===");

// Filter by category
const accessories = filterByCategory(productRepo.getAll(), "Accessories");
console.log("Filtered accessories products:", accessories);

// Convert currency
console.log("Laptop price in EUR:", convertCurrency(laptop.price, "USD", "EUR"));
console.log("Mouse price in GBP:", convertCurrency(mouse.price, "USD", "GBP"));

// Type guard test
const unknownObj: any = { id: 4, name: "Chair", price: 50, currency: "USD", inStock: true, category: "Furniture" };
console.log("Is unknownObj a Product?", isProduct(unknownObj));

console.log("\n=== CHECKOUT TESTS ===");

// Checkout
const order = cart.checkout(customer);
console.log("Order created:", order);

// Customer orders
console.log("Customer orders after checkout:", customer.orders);

// Cart should be empty now
console.log("Cart after checkout:", cart.getItems());


console.log("🛒 E-Commerce System Test Complete!");
