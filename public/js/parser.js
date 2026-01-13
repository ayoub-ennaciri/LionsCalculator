import {tokinizer} from "./tokenizer.js"

export class Parser 
{
    constructor(spec, node)
    {
        this.tokenize = new tokinizer
        this.spec = spec
        this.node = node
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
        for(const [type, BP, func] of this.node )
        {
            if(this.tokin.type == type)
            {
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return func(this.parse(BP))
            }
        }
        
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

            default:
                this.error = true
                return null;
        }
    }

    led(left)
    {

        for(const [type, BP, func] of this.node )
        {
            if(this.tokin.type == type)
            {
                this.tokin = this.tokenize.getNextTokene(this.spec)
                return func(left, this.parse(BP))
            }
        }
                return null;        
    }

    bp()
    {
        if (this.tokin== null)
            return null

        for(const [type, BP, func] of this.node )
        {
            if(this.tokin.type == type)
            {
                return BP
            }
        }
        return null
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