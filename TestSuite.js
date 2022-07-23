// test suite
var fs = require('fs');

// file is included here:
eval(fs.readFileSync('convoluted.js')+'');


// This contains all the tests that will be run, with all its sub groupings
function RunTests(){
    console.log("Starting Convertion Tests");
    ConvertionTests();
    console.log("Starting Truth Table Tests");
    TruthTableTests();
    console.log("Starting Adding Tests");
    //AddingTests();
    console.log("Starting Subtracting Tests");
    //SubtractingTests();
    console.log("Starting Multiplying Tests");
    MultiplyingTests();
    console.log("Starting Dividing Tests");
    DividingTests()
}

// Conversion tests
function ConvertionTests(){
    ConvertTo();
    ConvertFrom();
    ConvertToNeg();
    ConvertFromNeg();
}

function TruthTableTests(){
    NOTTest();
    ORTest();
    ANDTest();
    NANDTest();
    NORTest();
    NANDTest();
    NORTest();
    XORTest();
    XNORTest();
}

function AddingTests(){
    RegularAddition();
    NegZeroAndZero();
    ChainedAddition();
}

function SubtractingTests(){
    RegularSubtraction();
    NegZeroMinusZero()
}

function MultiplyingTests(){
    RegularMultiplication();
}

function DividingTests(){
    RegularDivision();
}

function ConvertTo(){
    let num = 5;
    let convoluted = DecToConvolutedEightBit(num);
    let ans = [NaN, NaN, NaN, NaN, NaN, Infinity, NaN, Infinity];
    for(let i = 0; i < 8; i++){
        console.assert(isNaN(convoluted[i]) === isNaN(ans[i]), 'ConvertTo(), bit %n is wrong', i)
    }
}

function ConvertFrom(){
    let convoluted = [NaN, NaN, NaN, NaN, NaN, Infinity, NaN, Infinity];
    let num = ConvolutedToDec(convoluted);
    let ans = 5

    console.assert(num === ans, "ConvertFrom didn't work");
}

function ConvertToNeg(){
    let num = -5;
    let convoluted = DecToConvolutedEightBit(num);
    let ans = [Infinity, Infinity, Infinity, Infinity, Infinity, NaN, Infinity, Infinity];

    for(let i = 0; i < 8; i++){
        console.assert(isNaN(convoluted[i]) === isNaN(ans[i]), 'ConvertToNeg(), a bit is wrong: ', i)
    }
}

function ConvertFromNeg(){
    let convoluted = [Infinity, Infinity, Infinity, Infinity, Infinity, NaN, Infinity, NaN];
    let num = ConvolutedToDec(convoluted);
    let ans = -6;

    console.assert(num === ans, "ConvertFromNeg didn't work, got: ", num, " not ", ans);
}

function NOTTest(){
    let x = NaN;
    console.assert(NOT(x) === Infinity);
    console.assert(isNaN(NOT(NOT(x))));
}

function ORTest(){
    let a = [NaN, Infinity];
    let ans = [NaN, Infinity, Infinity, Infinity];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(OR(a[x], a[y])) === isNaN(ans[x*2 + y]), "OR Table is wrong");
        }
    }
}
function ANDTest(){
    let a = [NaN, Infinity];
    let ans = [NaN, NaN, NaN, Infinity];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(AND(a[x], a[y])) === isNaN(ans[x*2 + y]), "AND Table is wrong");
        }
    }
}
function NANDTest(){
    let a = [NaN, Infinity];
    let ans = [Infinity, Infinity, Infinity, NaN];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(NAND(a[x], a[y])) === isNaN(ans[x*2 + y]), "NAND Table is wrong");
        }
    }
}
function NORTest(){
    let a = [NaN, Infinity];
    let ans = [Infinity, NaN, NaN, NaN];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(NOR(a[x], a[y])) === isNaN(ans[x*2 + y]), "NOR Table is wrong");
        }
    }
}
function XORTest(){
    let a = [NaN, Infinity];
    let ans = [NaN, Infinity, Infinity, NaN];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(XOR(a[x], a[y])) === isNaN(ans[x*2 + y]), "XOR Table is wrong");
        }
    }
}
function XNORTest(){
    let a = [NaN, Infinity];
    let ans = [Infinity, NaN, NaN, Infinity];
    for(let x = 0; x < 2; x++){
        for(let y = 0; y < 2; y++){
            console.assert(isNaN(XNOR(a[x], a[y])) === isNaN(ans[x*2 + y]), "XNOR Table is wrong");
        }
    }
}
function RegularAddition(){
    for(let x = -63; x < 64; x++){
        for(let y = -63; y < 64; y++){
            console.assert(
                ConvolutedToDec(addEightBit(x, y)) === x + y, 
                "failed to add ", x, " and ", y, 
                "\n got ", ConvolutedToDec(addEightBit(x, y)), " instead of ", (x + y));
        }
    }
}
function NegZeroAndZero(){
    console.assert(ConvolutedToDec(addEightBit(-0, 0)) === -0 + 0, "failed to add -0 and 0");
}
function ChainedAddition(){
    let x = 1, y = 2, z = 3;
    console.assert(
        ConvolutedToDec(addEightBit(ConvolutedToDec(addEightBit(x, y)), z)),
        "failed to chain add"
        )
}
function RegularSubtraction(){
    for(let x = -63; x < 64; x++){
        for(let y = -63; y < 64; y++){
            console.assert(
                ConvolutedToDec(subtractEightBit(x, y)) === x - y, 
                "failed to subtract ", x, " and ", y, 
                "\n got ", ConvolutedToDec(subtractEightBit(x, y)), " instead of ", (x - y));
        }
    }
}
function NegZeroMinusZero(){
    console.assert(ConvolutedToDec(addEightBit(-0, 0)) === -0 - 0, "failed to subtract -0 and 0");
}
function RegularMultiplication(){
    for(let x = -11; x < 11; x++){
        for(let y = -11; y < 11; y++){
            console.assert(
                ConvolutedToDec(multiplyEightBit(x, y)) === x * y, 
                "failed to Multiply ", x, " and ", y, 
                "\n got ", ConvolutedToDec(multiplyEightBit(x, y)), " instead of ", (x * y));
        }
    }
}
function RegularDivision(){
    for(let x = -11; x < 11; x++){
        for(let y = -11; y < 11; y++){
            if(x && y){
                console.assert(
                    ConvolutedToDec(divideEightBit(x, y)) === parseInt(x / y), 
                    "failed to Divide ", x, " and ", y, 
                    "\n got ", ConvolutedToDec(divideEightBit(x, y)), " instead of ", parseInt(x / y));
            }
        }
    }

    let x=6;
    let y=2;

    console.assert(
        ConvolutedToDec(divideEightBit(x, y)) === parseInt(x / y), 
        "failed to Divide ", x, " and ", y, 
        "\n got ", ConvolutedToDec(divideEightBit(x, y)), " instead of ", parseInt(x / y));
}

RunTests();