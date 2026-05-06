// 1. Variables
const name = "Mariam";
let score = 40;
const passing = 50;
 
// 2. If / else
let reaction;
if (score >= 85) {
  reaction = "genius";
} else if (score >= 50) {
  reaction = "fine";
} else {
  reaction = "yikes";
}
 
// 3. Template literal roast
console.log(`${name} got ${score}/100. Reaction: ${reaction}. We still love you though.`);
// → "Mariam got 40/100. Reaction: yikes. We still love you though."
 
// 4. Arrow function
const passed = (score) => score >= passing;
 
console.log(passed(score)); // false — sorry Mariam
 
// 5. Arrays & loops
const scores = [40, 78, 55, 91, 33];
 
for (let i = 0; i < scores.length; i++) {
  const label = passed(scores[i]) ? "pass" : "fail";
  console.log(`${scores[i]} → ${label}`);
}
// 40 → fail
// 78 → pass
// 55 → pass
// 91 → pass
// 33 → fail