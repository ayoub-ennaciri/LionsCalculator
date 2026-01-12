import {tokinizer} from "./tokenizer.js"

export class Parser 
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
        this.tokin = this.tokenize.getNextTokene(this.spec)
    }
    

    nud()
    {
        let acmltor = 0
        // this.tokin = this.tokenize.getNextTokene(this.spec)
        let v = 0
        
        switch(this.tokin.type)
        {
            case "NUMBER":
                v = Number(this.tokin.value)
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return v
            case "MINUS":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return -this.parse(30)
            case "LP":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                v = this.parse(0)
                if(this.tokin.type != "RP")
                {
                    this.error = true
                    return null
                }
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return v;
            case "COS":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return Math.cos(this.parse(40-1) * Math.PI / 180)
            case "SIN":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return Math.sin(this.parse(40-1))
            case "TAN":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return Math.tan(this.parse(40-1))
            case "E":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return Math.exp(this.parse(40-1))
            case "SQ":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return Math.sqrt(this.parse(40-1))
            case "LOG":
                this.tokin = this.tokenize.getNextTokene(this.spec)
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
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return left + this.parse(10)
            case "MINUS":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return left - this.parse(10)
            case "ASTRICS":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return left * this.parse(20)
            case "SLASH":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return left / this.parse(20)
            case "PERC":
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return ((left * this.parse(40-1)) / 100)
            case "POW":
                this.tokin = this.tokenize.getNextTokene(this.spec)
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