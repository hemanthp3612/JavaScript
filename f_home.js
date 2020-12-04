let fruits = ['banana', 'apple','orange','pineapple']

fruits = new Array('banana','grapes','apple');

console.log(fruits[1])//access value at index 1

fruits[0]="pear";  // change values
console.log(fruits)

for(let i=0;i<fruits.length;i++){
    console.log(fruits[i]);
}


console.log('tostring : '+ fruits.toString())
console.log(fruits.join('*'));
console.log(fruits);
console.log(fruits.pop(),fruits);
console.log(fruits.push('jackfruit'));
console.log(fruits);
console.log(fruits.shift()); // defletes at the beginning

console.log(fruits.unshift('Strawberry'));
console.log(fruits);

let vegetables = ['brocolli','tomatoes','onions'];
let allgroceries = fruits.concat(vegetables);
console.log(allgroceries);
console.log(allgroceries.slice(1,4));
console.log(allgroceries.reverse());
let nos = [4,1,5,7,2,8,3,2];
console.log(nos.sort(function(a,b){ return a-b }));

let emptyArray = new Array();

for( let i=0;i<16;i++){
    emptyArray.push(i);
}

console.log(emptyArray)