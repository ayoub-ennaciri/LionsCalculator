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
["MINUS", 10, (left,right) => {let L = new Decimal(left); let R = new Decimal(right); return L.minus(R)}],
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

const mergeString = (substr) =>{
    return bottomS.value + substr
}

// main screen buffer
bottomS.value = ""

// if the button is pressed write to the buffer 
e.onclick = ()=>{bottomS.value = mergeString("e")}
cos.onclick = ()=>{bottomS.value = mergeString("cos")}
sin.onclick = ()=>{bottomS.value = mergeString("sin")}
tan.onclick = ()=>{bottomS.value = mergeString("tan")}
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
pow.onclick = ()=>{bottomS.value = mergeString("^")}
lp.onclick = ()=>{bottomS.value = mergeString("(")}
rp.onclick = ()=>{bottomS.value = mergeString(")")}
percent.onclick = ()=>{bottomS.value = mergeString("%")}
ac.onclick = ()=>{bottomS.value = ""}
seven.onclick = ()=>{bottomS.value = mergeString("7")}
eight.onclick = ()=>{bottomS.value = mergeString("8")}
nine.onclick = ()=>{bottomS.value = mergeString("9")}
// todo
history.onclick = ()=>
{
    bottomS.value = bottomS.value + ""
    console.log(bottomS.value)
}
devide.onclick = ()=>{bottomS.value = mergeString("/")}
foor.onclick =  ()=>{bottomS.value = mergeString("4")}
five.onclick = ()=>{bottomS.value = mergeString("5")}
six.onclick = ()=>{bottomS.value = mergeString("6")}
log.onclick = ()=>{bottomS.value = mergeString("log")}
mutiply.onclick = ()=>{bottomS.value = mergeString("*")}
one.onclick = ()=>{bottomS.value = mergeString("1")}
two.onclick = ()=>{bottomS.value = mergeString("2")}
three.onclick = ()=>{bottomS.value = mergeString("3")}
sq.onclick = ()=>{bottomS.value = mergeString("√")}
minus.onclick = ()=>{bottomS.value = mergeString("-")}
zero.onclick = ()=>{bottomS.value = mergeString("0")}
dot.onclick = ()=>{bottomS.value = mergeString(".")}
// todo
ans.onclick = ()=>
{
    bottomS.value = bottomS.value + ""
    console.log(bottomS.value)
}
const Equal = ()=>
{
    let tmp = ""
    code.init(bottomS.value)
    tmp = String(code.parse(0));
    bottomS.value = goodOut(tmp)
    console.log(goodOut(bottomS.value))
}
equal.onclick = ()=> { Equal()}
document.addEventListener("keydown", (event)=>
    { 
        if(event.key ==="Enter"){
            event.preventDefault()
            Equal()
        }
    }
);
plus.onclick = ()=>{bottomS.value = mergeString("+")}

































