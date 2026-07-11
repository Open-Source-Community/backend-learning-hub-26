// 🥙 Am Farouk's Koshary Cart Goes Digital

// Tasks
// 1️⃣ Sync vs Async — Why Bother?
function cookRice(){
    console.log("Rice starting...");
    for(let i=0;i<100000000;i++){}
    console.log("Rice done!");
}

function cookRiceAsync(){
    console.log("Rice starting...");
    setTimeout(()=>{
        console.log("Rice done!");
    }, 1000);
}

cookRice();
console.log("Am Farouk yells at the next customer");
cookRiceAsync();
console.log("Am Farouk yells at the next customer");

//cookRice() blocks the execution of the next line until it finishes, cookRiceAsync() does not block the execution of the next line.

// 2️⃣ Callbacks — The Rice Guy Finally Calls Back

function orderRice(callback:(m:string)=>void){
    console.log("Calling the rice supplier...");
    setTimeout(()=>{
        callback("Rice delivered!");
    }, 1000);
}

orderRice((message) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");

// 3️⃣ Promises — Promising the Customer Their Order

const koshariOrder=new Promise ((y,n)=>{
    setTimeout(()=>{
        y("Order ready! 🍝")
    },2000)
})

koshariOrder.then((m)=>{console.log(m)})
.catch((e)=>{console.log(e)})

const sauceOrder=new Promise ((y,n)=>{
    setTimeout(()=>{
        n("We're out of da2a!")
    },2000)
})

sauceOrder.then((m)=>{console.log(m)})
.catch((e)=>{console.log(e)})

// 4️⃣ Promise Chaining — The Full Order Pipeline

function getRice():Promise<String>{
    return new Promise((y,n)=>{
        setTimeout(()=>{
            y("Rice ready")
        },1000)
    })
}

function getChickpeas(rice:String):Promise<String>{
    return new Promise((y,n)=>{
        setTimeout(()=>{
            y("Chickpeas ready, rice was: " + rice)
        },1000) 
    })
}

function getSauce(chickpeas:String):Promise<String>{
    return new Promise((y,n)=>{
        setTimeout(()=>{
            y("Sauce added, previous: " + chickpeas)
        },1000) 
    })
}

Promise.resolve()
.then(getRice)
.then(getChickpeas)
.then(getSauce)
.catch((e)=>{console.log(e)})

// 5️⃣ Async/Await — Am Farouk Learns to Chill
async function makeKoshari(){
    try{
        let rice=await getRice();
        let chickpeas=await getChickpeas(rice);
        let sauce=await getSauce(chickpeas);
        console.log(sauce);
    }catch(e){
        console.log(e);
    }   
}
makeKoshari();


