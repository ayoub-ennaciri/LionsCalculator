export class tokinizer {
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
