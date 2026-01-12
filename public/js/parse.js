

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
                return Math.cos(this.parse(40-1))
            case "SIN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.sin(this.parse(40-1))
            case "TAN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.cos(this.parse(40-1))
            case "E":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.exp(this.parse(40-1))
            case "COS":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.cos(left ,this.parse(40-1))
            case "SIN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.sin(left ,this.parse(40-1))
            case "TAN":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.cos(left ,this.parse(40-1))
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
            case "^":
                this.tokin = this.tokenize.getNextTokene(spec)
                return Math.pow(left ,this.parse(40-1))
            
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

    // STRING
    [/^\S+/, "STRING"]
]

let modes = [
    ["NUMBERS", 0, "NumberLiteral"],
    ["LP", 0, "LeftP"],
    ["RP", 0, "RightP"],
    ["PLUS", 10, "op"],
    ["MINUS", 10, "op"],
    ["ASTRICS", 20, "op"],
    ["SLASH", 20, "op"],
    ["MOD", 20, "op"],
    ["MOD", 20, "op"],
]

let code = new Parser(spec)

let p = "sin1+2+cos2"

code.init(p)

if(code.error)
{
    console.log("Error");
    
}

console.log(Math.sin(1))

console.log(code.parse(0));

