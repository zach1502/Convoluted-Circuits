function Buffer(x){
    return x;
}
function NOT(x){
    return isNaN(x)?Infinity:NaN;
}
function OR(x, y){
    return NAND(NAND(x, x), NAND(y, y));
}
function AND(x, y){
    return x * y;
    // these are the same:
    // return Math.min(x, y);
    // return x + y;
}
function NAND(x, y){
    return NOT(AND(x, y));
}
function NOR(x, y){
    return NOT(OR(x, y));
}
function XOR(x, y){
    return  NAND(
               NAND(x, NAND(x, y)),
               NAND(y, NAND(x, y))
            )
}
function XNOR(x, y){
    return  NOR(
                NOR(x, NOR(x, y)),
                NOR(y, NOR(x, y))
            )
}
function LSHIFT(x){
    let leftmostBit = x[0];
    x.shift();
    x.shift();
    x.push(NaN);
    x.push(leftmostBit);
}
function RSHIFT(x){
    x.unshift(NaN);
    x.pop();
}
function LargerThan(x, y){
    for(let i = 0; i < 8; i++){
        if(!isNaN(x[i]) === !isNaN(y[i])) continue;
        return (!isNaN(x[i]));
    }
    return false;
}
function LessThan(x, y){
    for(let i = 0; i < 8; i++){
        if(!isNaN(x[i]) === !isNaN(y[i])) continue;
        return (isNaN(x[i]));
    }
    return false;
}
function LargerThanOrEqualTo(x, y){
    for(let i = 0; i < 8; i++){
        if(!isNaN(x[i]) === !isNaN(y[i])) continue;
        return (!isNaN(x[i]));
    }
    return true;
}
function LessThanOrEqualTo(x, y){
    for(let i = 0; i < 8; i++){
        if(!isNaN(x[i]) === !isNaN(y[i])) continue;
        return (isNaN(x[i]));
    }
    return true;
}
function EqualTo(x, y){
    for(let i = 0; i < 8; i++){
        if(isNaN(x[i]) != isNaN(y[i])) return false;
    }
    return true;
}
function HalfAdder(x, y){
    const sum = XOR(x, y);
    const carry = AND(x, y);

    return {
        'sum': sum,
        'carry': carry,
    }
}
function FullAdder(x, y, carry = NaN){
    const firstOutput = HalfAdder(x, y);
    const secondOutput = HalfAdder(carry, firstOutput['sum']);

    return{
        'sum': secondOutput['sum'],
        'carry': OR(firstOutput['carry'], secondOutput['carry']),
    }
}
function addEightBit(num1, num2, isDec = true){
    let arr1;
    let arr2;

    if(isDec){
        arr1 = DecToConvolutedEightBit(num1);
        arr2 = DecToConvolutedEightBit(num2); 
    }
    else{
        arr1 = num1;
        arr2 = num2;
    }

    const firstDigit  = FullAdder(arr1[7], arr2[7], NaN);
    const secondDigit = FullAdder(arr1[6], arr2[6], firstDigit  ['carry']);
    const thirdDigit  = FullAdder(arr1[5], arr2[5], secondDigit ['carry']);
    const fourthDigit = FullAdder(arr1[4], arr2[4], thirdDigit  ['carry']);
    const fifthDigit  = FullAdder(arr1[3], arr2[3], fourthDigit ['carry']);
    const sixthDigit  = FullAdder(arr1[2], arr2[2], fifthDigit  ['carry']);
    const seventhDigit= FullAdder(arr1[1], arr2[1], sixthDigit  ['carry']);
    const eigthDigit  = FullAdder(arr1[0], arr2[0], seventhDigit['carry']);

    return [eigthDigit['sum'], seventhDigit['sum'], sixthDigit['sum'], fifthDigit['sum'], fourthDigit['sum'], thirdDigit['sum'], secondDigit['sum'], firstDigit['sum']];
}
function subtractEightBit(num1, num2, isDec = true){
    let arr1;
    let arr2;

    if(isDec){
        arr1 = DecToConvolutedEightBit(num1);
        arr2 = DecToConvolutedEightBit(-num2); 
    }
    else{
        arr1 = num1;
        arr2 = TwosComplement(num2);
    }

    const firstDigit  = FullAdder(arr1[7], arr2[7], NaN);
    const secondDigit = FullAdder(arr1[6], arr2[6], firstDigit  ['carry']);
    const thirdDigit  = FullAdder(arr1[5], arr2[5], secondDigit ['carry']);
    const fourthDigit = FullAdder(arr1[4], arr2[4], thirdDigit  ['carry']);
    const fifthDigit  = FullAdder(arr1[3], arr2[3], fourthDigit ['carry']);
    const sixthDigit  = FullAdder(arr1[2], arr2[2], fifthDigit  ['carry']);
    const seventhDigit= FullAdder(arr1[1], arr2[1], sixthDigit  ['carry']);
    const eigthDigit  = FullAdder(arr1[0], arr2[0], seventhDigit['carry']);

    return [eigthDigit['sum'], seventhDigit['sum'], sixthDigit['sum'], fifthDigit['sum'], fourthDigit['sum'], thirdDigit['sum'], secondDigit['sum'], firstDigit['sum']];
}
function multiplyEightBit(num1, num2, isDec = true){
    let arr1;
    let arr2;
    let isNegative = false;

    if(isDec){
        if(num1 < 0){
            isNegative = !isNegative;
            num1 = -num1;
        }
        if(num2 < 0){
            isNegative = !isNegative;
            num2 = -num2;
        }
        arr1 = DecToConvolutedEightBit((num1 < 0)?-num1:num1);
        arr2 = DecToConvolutedEightBit((num2 < 0)?-num2:num2); 
    }
    else{
        if(!isNaN(num1[0])){
            arr1 = TwosComplement(num1);
            isNegative = !isNegative;
        }
        if(!isNaN(num2[0])){
            arr2 = TwosComplement(num2);
            isNegative = !isNegative;
        }
    }

    let copyOfArr = Array.from(arr1);
    let listOfRows = [];

    if(!isNaN(arr2[arr2.length - 1])){
        listOfRows.push(Array.from(copyOfArr));
    }
  
    for(let i = arr2.length - 2 ; i >= 0; i--){
        copyOfArr.shift();
        copyOfArr.push(NaN);
        if(isNaN(arr2[i])) continue;
        listOfRows.push(Array.from(copyOfArr));
    }

    let sum = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
    for(let i = 0; i < listOfRows.length; i++){
        sum = addEightBit(listOfRows[i], sum, false);
    }

    sum = isNegative ? TwosComplement(sum) : sum;

    return sum;
}
function divideEightBit(num1, num2, isDec = true){
    let arr1;
    let arr2;
    let isNegative = false;

    if(isDec){
        if(num1 < 0){
            isNegative = !isNegative;
            num1 = -num1;
        }
        if(num2 < 0){
            isNegative = !isNegative;
            num2 = -num2;
        }
        arr1 = DecToConvolutedEightBit(num1);
        arr2 = DecToConvolutedEightBit(num2); 
    }
    else{
        if(!isNaN(num1[0])){
            arr1 = TwosComplement(num1);
            isNegative = !isNegative;
        }
        if(!isNaN(num2[0])){
            arr2 = TwosComplement(num2);
            isNegative = !isNegative;
        }
    }

    let diff = arr1; 
    let count = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];

    while(ConvolutedToDec(diff) >= ConvolutedToDec(arr2)){
        count = addEightBit(count, [NaN, NaN, NaN, NaN, NaN, NaN, NaN, Infinity], false);
        diff = DecToConvolutedEightBit(ConvolutedToDec(diff) - ConvolutedToDec(arr2));
    }

    count = isNegative ? TwosComplement(count) : count;

    return count;
}
function DecToConvolutedEightBit(num){
    let bin = [];
    let isNeg = (num < 0);
    num = Math.abs(num);
    let rem;

    while (num > 0) {
        rem = num % 2;
        num = parseInt(num / 2);
        bin.unshift((Math.abs(rem))?Infinity: NaN);
    }

    while(bin.length < 8){
        bin.unshift(NaN);
    }

    // 2's complement
    if(isNeg){
        bin = TwosComplement(bin);
    }

    return bin;
}
function ConvolutedToDec(convolutedArray){
    let dec = 0;
    let base = Math.pow(2, convolutedArray.length - 2);
    if(isNaN(convolutedArray[0])){
        for(let i = 1; i < convolutedArray.length; i++){
            dec += !isNaN(convolutedArray[i]) * base;
            base = base >> 1;
        }
        return dec;
    }

    dec = -Math.pow(2, convolutedArray.length - 1);
    for(let i = 1; i < convolutedArray.length; i++){
        dec += !isNaN(convolutedArray[i]) * base;
        base = base >> 1;
    }

    return dec;
}
function TwosComplement(convolutedArray){
    for(let i = 0; i < convolutedArray.length; i++){
        convolutedArray[i] = NOT(convolutedArray[i]);
    }

    convolutedArray = addEightBit(convolutedArray, [NaN, NaN, NaN, NaN, NaN, NaN, NaN, Infinity], false);
    return convolutedArray;
}