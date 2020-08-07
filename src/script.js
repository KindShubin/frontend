"use strict";

const sumSquares = n => {
    let res = 0;
    for (let i = 1; i <= n; i++ ){
        res += i ** 2;
    }
    return res;
}
const squareSum = n => {
    let res = 0;
    for (let i = 1; i <= n; i++){
        res += i;
    }
    return res ** 2;
}
export const sumSquareDifference = n =>{
    const squareSumNum = squareSum(n);
    const sumSquaresNum = sumSquares(n);
    const isSquareSumBig = squareSumNum > sumSquaresNum ? true : false;
    if (isSquareSumBig) {
        return squareSumNum - sumSquaresNum;
    } else return sumSquaresNum - squareSumNum;
};

//export {sumSquareDifference};
console.log("script.js start");
console.log(sumSquareDifference(1));
console.log(sumSquareDifference(2));
console.log(sumSquareDifference(3));
console.log("script.js end");
//alert(`a=${a}\tb=${b}`);