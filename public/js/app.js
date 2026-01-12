// import { create, all } from './../../node_modules/mathjs/lib/browser/math'
// import * as numbers from './../../node_modules/mathjs/numbers'



// console.log(math.cos(1));



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



class tokinizer {
    constructor( )
    {
        this.string = "";
        this.cursor = 0;
    }

    init(string)
    {
        this.string = string;
    }
    
    hasMoreTokens()
    {
        return this.cursor < this.string.length
    }

    getNextTokene(specifications)
    {

        // slice the string at cursor position
        this.string = this.string.slice(this.cursor)
        this.cursor = 0
        // get next token
        if(!this.hasMoreTokens())
        {
            return null
        }

        for(const [regexp, tokenType] of specifications)
        {
            const tokenValue = this.match(regexp,this.string)

            // if we didnt't get a match we skip to the next token 
            if(tokenValue == null)
            {
                continue;
            }

            return{
                type : tokenType,
                value : tokenValue
            }
            
        }
        return null;

    }

    // match a token for a regulare expression
    match(regexp, string)
    {
        const matched = regexp.exec(string);
        if(matched == null)
        {
            return null;
        }
        this.cursor += matched[0].length

        return matched[0]
    }
}

class Parser 
{
    constructor(spec)
    {
        this.tokenize = new tokinizer
        this.spec = spec
        this.tokin
        this.error = false
    }

    // init tokinizer
    init(string)
    {
        this.tokenize.init(string)
        this.tokin = this.tokenize.getNextTokene(spec)
    }
    

    nud()
    {
        let acmltor = 0
        // this.tokin = this.tokenize.getNextTokene(spec)
        let v = 0
        
        switch(this.tokin.type)
        {
            case "NUMBER":
                v = Number(this.tokin.value)
                this.tokin = this.tokenize.getNextTokene(spec)
                return v
            case "MINUS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return -this.parse(30)
            case "LP":
                this.tokin = this.tokenize.getNextTokene(spec)
                v = this.parse(0)
                if(this.tokin.type != "RP")
                {
                    this.error = true
                    return null
                }
                this.tokin = this.tokenize.getNextTokene(spec)
                return v;
            case "COS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.cos(this.parse(40-1) * Math.PI / 180)
            case "SIN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.sin(this.parse(40-1))
            case "TAN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.tan(this.parse(40-1))
            case "E":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.exp(this.parse(40-1))
            case "SQ":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.sqrt(this.parse(40-1))
            case "LOG":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.log(this.parse(40-1))
            default:
                this.error = true
                return null;


        }
    }

    led(left)
    {
        switch(this.tokin.type)
        {
            case "PLUS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return left + this.parse(10)
            case "MINUS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return left - this.parse(10)
            case "ASTRICS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return left * this.parse(20)
            case "SLASH":
                this.tokin = this.tokenize.getNextTokene(spec)
                return left / this.parse(20)
            case "PERC":
                this.tokin = this.tokenize.getNextTokene(spec)
                return ((left * this.parse(40-1)) / 100)
            case "POW":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.pow(left ,this.parse(20))
            
            default:
                this.error = true;
                return null;
        }
        
    }

    bp()
    {
        if (this.tokin== null)
            return null

        switch(this.tokin.type)
        {
            case "PLUS":
            case "MINUS":
                return 10;

            case "ASTRICS":
            case "SLASH":
            case "MOD":
            case "POW":
                return 20;

            case null:
                return 0;

            case "NUMBER":
                console.log("NUMBER")
                break;
                
            default:
                this.error = true;
                return null
        }
    }


    

    // parse
    parse(rbp)
    {
        // if no specification array is provided throw error
        if(this.spec == undefined)
            throw new SyntaxError("undifinded specifications array")


        let left = this.nud()
        while(rbp < this.bp())
        {
            left = this.led(left)
        }
        return left
    }


    
}


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
let code = new Parser(spec)

let deletSpec = [
    /cos$/ ,
    /sin$/ ,
    /tan$/ ,
    /log$/ ,
    /e$/ ,
    /.$/u 
]


console.log(/^\^/.test("^"))

if(code.error)
{
    console.log("Error");
    
}



function addText(newText) {
    // Save the current cursor position
    const start = bottomS.selectionStart;
    const end = bottomS.selectionEnd;

    // Add the new text at the current cursor position
    const value = bottomS.value;
    bottomS.value = value.slice(0, start) + newText + value.slice(end);

    // Move cursor to the end of the inserted text
    const newCursorPos = start + newText.length;
    bottomS.setSelectionRange(newCursorPos, newCursorPos);

    // Refocus the bottomS
    bottomS.focus();
}






bottomS.value = ""

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
    code.init(bottomS.value)
    bottomS.value = code.parse(0);
    console.log(bottomS.value)
}

plus.onclick = ()=>
{
    bottomS.value = bottomS.value + "+"
    console.log(bottomS.value)
}



























































