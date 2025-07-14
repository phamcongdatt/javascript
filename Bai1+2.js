// Bài 1: Modern JavaScript Operators & Objects

// Bài 1: Destructuring Array
const numbers = [10, 20, 30, 40, 50];
const [first, , third, ...rest] = numbers;
console.log('first:', first);   // 10
console.log('third:', third);   // 30
console.log('rest:', rest);     // [40, 50]

// Bài 2: Spread và Rest
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log('combined:', combined); // [1, 2, 3, 4]

function sumAll(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Bài 3: Short Circuiting và Nullish
let points = 0;
let userName = '';
const displayPoints = points || 'No points';
const displayName = userName ?? 'Guest';
console.log(displayPoints); // 'No points'
console.log(displayName);   // ''

// Bài 4: Logical Assignment
let a = 0;
let b = 'Hello';
let c;
a ||= 'Fallback';
b &&= 'Updated';
c ??= 'Default';
console.log('a:', a); // 'Fallback'
console.log('b:', b); // 'Updated'
console.log('c:', c); // 'Default'

// Bài 5: Optional Chaining
const user = {
  name: 'Dat',
  contact: {
    email: 'dat@gmail.com'
  }
};
console.log(user.contact?.email);  // 'dat@gmail.com'
console.log(user.profile?.age);    // undefined

// Bài 6: Object Destructuring
const student = {
  name: 'Linh',
  age: 21,
  scores: {
    math: 9,
    english: 8
  }
};
const { name, scores: { math: diemToan, english: diemAnh } } = student;
console.log(name);       // Linh
console.log(diemToan);   // 9
console.log(diemAnh);    // 8

// Bài 7: Looping Object
const salaries = {
  John: 1000,
  Jane: 1500,
  Jim: 1200
};
const keys = Object.keys(salaries);
const values = Object.values(salaries);
const entries = Object.entries(salaries);
console.log('Keys:', keys);       // ['John', 'Jane', 'Jim']
console.log('Total:', values.reduce((sum, val) => sum + val, 0)); // 3700
for (const [name, salary] of entries) {
  console.log(`${name}: $${salary}`);
}

// Section 3 – Bài 2: Strings, Functions, Value vs Reference

// Bài 8: Làm việc với String
const message = '  Welcome to JavaScript course!  ';
console.log(message.trim());         
console.log(message.toUpperCase());  
console.log(message.includes('JavaScript')); // true

// Bài 9: Default Parameters
function greet(name = 'Guest') {
  console.log(`Hello ${name}`);
}
greet();         
greet('Phát');     

// Bài 10: Value vs Reference
let x = 5;
let y = x;
y++;
console.log('x:', x); // 5
console.log('y:', y); // 6
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 100;
console.log('obj1:', obj1.value); // 100
console.log('obj2:', obj2.value); // 100

// Bài 11: Higher-Order Functions
function calculator(operation) {
  if (operation === 'add') {
    return (a, b) => a + b;
  } else if (operation === 'multiply') {
    return (a, b) => a * b;
  } else {
    return () => 'Invalid';
  }
}
const add = calculator('add');
const multiply = calculator('multiply');
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6
