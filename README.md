
// This idea came to me when I discovered that NaN != NaN.
// and then I started looking at the interesting interactions NaN has. and noticed something particular...
// particularily with *
// x * y returns NaN if either or is NaN. but if both aren't, then it is equal to x^2
// if I substitute x for Infinity and let NaN = false and Infinity = true
// x * y becomes AND.

// now the goal here is to create either a NAND or a NOR gate so that I can make all the other gates
// so first I created the NOT gate and the rest was smooth sailing.

// now that I have the basic tools for building circuits. it's natural to try and build stuff with them.
// Starting with a Half-Adder and Full-Adder. 
// Additional functionality can be further built on top of this if anyone wants to create a really convoluted computer.

// this calculator can handle 8-bit signed numbers

// I consider this small project complete, a nice break from grinding Leetcode
