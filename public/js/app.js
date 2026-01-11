const isItOneOf = (list,char) =>
{
    let j = 0 ;
    while(list[j])
    {
        if(list[j] == char)
        {
            return true
        }    
        j++;
    }   
    return false
}

let tmp = ""
let input = ""
let output = ""
let error = false

let good_operators = ["+","-"]
let trouble_operatores = ["/","**","*","%"]
let operators = ["/","**","*","%","+","-"]
let noMinOperators = ["/","**","*","%","+"]

console.log(Number("12+12"))

while(true)
{
    tmp = prompt("enter :")
    // console.log(tmp)
    console.log("current input : "+ input)
    // first char should be either a number or a "good_operator"
    if(input.length == 0 && !(!isNaN(tmp[0][0]) || isItOneOf(good_operators,tmp[0])))
    {
        tmp[0] = ""
    }

    // append tmp[0] operator to the input string if the last char is not minus
    else if(isItOneOf(noMinOperators, input[input.length - 1]) && tmp[0] == "-" )
    {
        input + tmp[0]
        tmp[0] = ""
    }

    // if last char of the input string is an operator and tmp[0] is an operator(not including minus) 
    // replace the last operator with tmp[0] 
    else if(isItOneOf(operators,input[input.length - 1]) && isItOneOf(noMinOperators, tmp[0]))
    {
        input[input.length - 1] = tmp[0]
    }

    else if(!isNaN(tmp[0]))
    {
        input + tmp[0]
        tmp[0] = ""
    }

    if(tmp[0] == "=")
    {
        console.log(Number(12+1))
        break
    }
}

// let j = 0 ;


// // if(!isNaN(input[0]))
// // {
// //     console.log("is a number ");
    
// // }

// if((isItOneOf(good_operators, input[0])  || !isNaN(input[0])) &&  && !isNaN(input[input.length - 1]))
// {
//     console.log("code ok");
// }
// else 
// {
//     console.log("SyntaxError")
// }   

// // let i = 1
// // while(input[i])
// // {
// //     if(input == )
// //     {

// //     }
// //     i++
// // }