import {Parser} from "./parser.js"
import Decimal from "https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/decimal.mjs";

// regexp for what to delet at a time
let deletSpec = [
    /cos$/ ,
    /sin$/ ,
    /tan$/ ,
    /log$/ ,
    /e$/ ,
    /.$/u 
]


let spec = [

    // Eof
    [/^\0/, "EOF"],

    // NUMBER
    [/^\d+\.\d+/, "NUMBER"],
    [/^\d+/, "NUMBER"],

    // OPERATORS
    [/^\+/, "PLUS"],
    [/^\-/, "MINUS"],
    [/^\//, "SLASH"],
    [/^mod/, "MOD"],
    [/^\*/, "ASTRICS"],
    [/^\=/, "EQUAL"],
    [/^\(/, "LP"],
    [/^\)/, "RP"],

    // SPACE
    [/^\ /, "SP"],

    // SCIENCE OPERAORS
    [/^sin/, "SIN"],
    [/^cos/, "COS"],
    [/^tan/, "TAN"],
    [/^e/, "E"],
    // todo
    [/^\^/, "POW"],
    [/^%/, "PERC"],
    [/^log/, "LOG"],
    [/^√/, "SQ"],

    // STRING
    [/^\S+/, "STRING"]
]


// function to round decimal value to 9
const goodOut = (number) =>
{
    let array = number.split("")
    let i  = array.indexOf(".")
    array.join("")
    if(i == -1)
    {
        return number
    }
    return number.slice(0,i + 9)
}


const node = [
// nude type
["COS", 40-1, (number) => {let n = new Decimal(number);return n.cos(number)}],
["SIN", 40-1, (number) => {let n = new Decimal(number);return n.sin(number)}],
["TAN", 40-1, (number) => {let n = new Decimal(number);return n.tan(number)}],
["E", 40-1, (number) => {let n = new Decimal(number);return n.exp(number)}],
["LOG", 40-1, (number) => {let n = new Decimal(number);return n.log(number)}],
["SQ", 40-1, (number) => {let n = new Decimal(number);return n.sqrt(number)}],
["PERC", 40-1, (number) => {let n = new Decimal(number);return n.div(100)}],

// led type 
["PLUS", 10, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.add(R)}],
["MINUS", 10, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.subtract(R)}],
["SLASH", 20, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.div(R)}],
["ASTRICS", 20, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.times(R)}],
["POW", 20, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.pow(R)}],
// ["MOD", 20, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.m(R)}]
]


// making a parser object and passing tokne specification array 
let code = new Parser(spec, node)

// getting buttons
let e  = document.getElementById("e")
let cos  = document.getElementById("cos")
let sin  = document.getElementById("sin")
let tan  = document.getElementById("tan")
let del  = document.getElementById("del")
let pow  = document.getElementById("pow")
let lp  = document.getElementById("lp")
let rp  = document.getElementById("rp")
let percent  = document.getElementById("percent")
let ac  = document.getElementById("ac")
let seven  = document.getElementById("seven")
let eight  = document.getElementById("eight")
let nine  = document.getElementById("nine")
let history  = document.getElementById("history")
let devide  = document.getElementById("devide")
let foor  = document.getElementById("foor")
let five  = document.getElementById("five")
let six  = document.getElementById("six")
let log  = document.getElementById("log")
let mutiply  = document.getElementById("mutiply")
let one  = document.getElementById("one")
let two  = document.getElementById("two")
let three  = document.getElementById("three")
let sq  = document.getElementById("sq")
let minus  = document.getElementById("minus")
let zero  = document.getElementById("zero")
let dot  = document.getElementById("dot")
let ans  = document.getElementById("ans")
let equal  = document.getElementById("equal")
let plus  = document.getElementById("plus")
let topS  = document.getElementById("topS")
let bottomS  = document.getElementById("bottomS")


// main screen buffer
bottomS.value = ""

// if the button is pressed write to the buffer 
e.onclick = ()=>
{
    bottomS.value = bottomS.value + "e"
    console.log(bottomS.value)
    
}

cos.onclick = ()=>
{
    bottomS.value = bottomS.value + "cos"
    console.log(bottomS.value)
}

sin.onclick = ()=>
{
    bottomS.value = bottomS.value + "sin"
    console.log(bottomS.value)
}

tan.onclick = ()=>
{
    bottomS.value = bottomS.value + "tan"
    console.log(bottomS.value)
}

del.onclick = ()=>
{
    let dell 
    for(dell of deletSpec)
    {
        if(dell.test(bottomS.value))
        {
            bottomS.value = bottomS.value.replace(dell,"")
            return
        }
    }

    console.log(bottomS.value)
}

pow.onclick = ()=>
{
    bottomS.value = bottomS.value + "^"
    console.log(bottomS.value)
}

lp.onclick = ()=>
{
    bottomS.value = bottomS.value + "("
    console.log(bottomS.value)
}

rp.onclick = ()=>
{
    bottomS.value = bottomS.value + ")"
    console.log(bottomS.value)
}

percent.onclick = ()=>
{
    bottomS.value = bottomS.value + "%"
    console.log(bottomS.value)
}

ac.onclick = ()=>
{
    bottomS.value = ""
    console.log(bottomS.value)
}

seven.onclick = ()=>
{
    bottomS.value = bottomS.value + "7"
    console.log(bottomS.value)
}

eight.onclick = ()=>
{
    bottomS.value = bottomS.value + "8"
    console.log(bottomS.value)
}

nine.onclick = ()=>
{
    bottomS.value = bottomS.value + "9"
    console.log(bottomS.value)
}
// todo
history.onclick = ()=>
{
    bottomS.value = bottomS.value + ""
    console.log(bottomS.value)
}

devide.onclick = ()=>
{
    bottomS.value = bottomS.value + "/"
    console.log(bottomS.value)
}

foor.onclick = ()=>
{
    bottomS.value = bottomS.value + "4"
    console.log(bottomS.value)
}

five.onclick = ()=>
{
    bottomS.value = bottomS.value + "5"
    console.log(bottomS.value)
}

six.onclick = ()=>
{
    bottomS.value = bottomS.value + "6"
    console.log(bottomS.value)
}

log.onclick = ()=>
{
    bottomS.value = bottomS.value + "log"
    console.log(bottomS.value)
}

mutiply.onclick = ()=>
{
    bottomS.value = bottomS.value + "*"
    console.log(bottomS.value)
}

one.onclick = ()=>
{
    bottomS.value = bottomS.value + "1"
    console.log(bottomS.value)
}

two.onclick = ()=>
{
    bottomS.value = bottomS.value + "2"
    console.log(bottomS.value)
}

three.onclick = ()=>
{
    bottomS.value = bottomS.value + "3"
    console.log(bottomS.value)
}

sq.onclick = ()=>
{
    bottomS.value = bottomS.value + "√"
    console.log(bottomS.value)
}

minus.onclick = ()=>
{
    bottomS.value = bottomS.value + "-"
    console.log(bottomS.value)
}

zero.onclick = ()=>
{
    bottomS.value = bottomS.value + "0"
    console.log(bottomS.value)
}

dot.onclick = ()=>
{
    bottomS.value = bottomS.value + "."
    console.log(bottomS.value)
}
// todo
ans.onclick = ()=>
{
    bottomS.value = bottomS.value + ""
    console.log(bottomS.value)
}
// todo

(equal.onclick ) = ()=>
{
    let tmp = ""
    code.init(bottomS.value)
    tmp = String(code.parse(0));
    bottomS.value = goodOut(tmp)
    console.log(goodOut(bottomS.value))
}

plus.onclick = ()=>
{
    bottomS.value = bottomS.value + "+"
    console.log(bottomS.value)
}


































