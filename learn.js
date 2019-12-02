// function makeMap(str, expectsLowerCase) {
//     const map = Object.create(null);
//     const list = str.split(",");
//     for (let i = 0; i < list.length; i++) {
//         map[list[i]] = true;
//     }
//     return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
// }

// const isReservedAttr = makeMap('style,class', true)
// console.dir(isReservedAttr('Style'))
let a 
if( a = undefined) {
    console.log('true')
}else {
    console.log('false')
}