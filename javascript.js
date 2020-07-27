const container = document.querySelector('#container');
let input = document.querySelector('#display');
const calc = document.querySelector('#calc');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const dot = document.querySelector('#dot');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operations');
const percentage = document.querySelector('#percentage');
let result = 0;

document.addEventListener('keydown' , (event) => {
    let keypressed = event.key;
    if (keypressed == '-' || keypressed == '+' || keypressed == '*' || keypressed == '/') {
        let txt = input.textContent.trim();
        if (txt.slice(-1) == keypressed || 
          txt.slice(-1) == '*' || 
          txt.slice(-1) == '/' || 
          txt.slice(-1) == '-' || 
          txt.slice(-1) == '+') input.textContent = txt.slice(0,-1) + keypressed;
          else input.textContent = txt + keypressed;
    }
    else if (keypressed == 'c' || keypressed == 'C') input.textContent = '';
    else if (keypressed == '%') calcPercentage();
    else if (keypressed >= 0 && keypressed <= 9) input.textContent += keypressed;
    else if (keypressed == 'Backspace') input.textContent = input.textContent.slice(0,-1);
    else if (keypressed == '=') solve();

});
clear.addEventListener('click', () => input.textContent = '');

backspace.addEventListener('click', () => input.textContent = input.textContent.slice(0,-1));

percentage.addEventListener('click', () =>{
    calcPercentage();
});
function calcPercentage(){
    let args = input.textContent.trim().split(/(\+|\*|\\|\-)/g);
    result = +args[0];
    for (let i=1; i<args.length;i++){
        if((args[i]) == '+' || args[i] == '-' || args[i] == '*' || args[i] == '/'){
             operate(args[i+1], args[i]);}
    }
    result = +result / 100;
    input.textContent = +result.toPrecision(15);
}

dot.addEventListener('click', () => {
    let txt = input.textContent.trim(); 
    let addDOt = true;
    [...txt].forEach(char => {
        if(char === '.') addDOt = false;
        else if(char === '+' || char ==='-' || char === '*' || char === '/') addDOt = true;
    })
    if(addDOt) input.textContent = txt + '.';
})

operations.forEach(operation => operation.addEventListener('click', () => {
        let txt = input.textContent.trim();
          if (txt.slice(-1) == operation.textContent || 
          txt.slice(-1) == '*' || 
          txt.slice(-1) == '/' || 
          txt.slice(-1) == '-' || 
          txt.slice(-1) == '+') {
          input.textContent = txt.slice(0,-1) + operation.textContent;
    }
        else input.textContent = txt + operation.textContent;
}));

numbers.forEach(number => number.addEventListener('click', () => {
    input.textContent += number.textContent;
}));

calc.addEventListener('click', () => {
    solve();  
});
function solve (){
    let args = input.textContent.trim().split(/(\+|\*|\/|\-)/g);
        result = +args[0];
        for (let i=1; i<args.length;i++){
            if((args[i]) == '+' || args[i] == '-' || args[i] == '*' || args[i] == '/'){
                operate(args[i+1], args[i]);}
        }
        if (result == 'ERROR') input.textContent = result;
        else input.textContent = result.toPrecision(15);
}


function operate(a,operator){
    switch (operator){
        case '+' : 
            result += +a;
            break;
        case '-':
            result -= +a;
            break;
        case '*':
            result *= +a;
            break;
        case '/':
            if (+a != 0) result /= +a;
            else result ='ERROR';
            break;
        default:
            result = 'ERROR';
            console.log('Divide by zero');
            break;
        
    }
}

/*functions that can added but removed for now bcz of bugs
    change.addEventListener('click', () => {
    let args = input.textContent.trim().split(/(\+|\*|\\|\-)/g);
    console.log(args);
    number = args[args.length - 1];
    let sign = args[args.length -2];
    if(sign === undefined || ) number = number.slice(0,1) === '-' ? number.slice(1) : '-' + number;
    console.log(number);
    args[args.length -2] = sign;
    input.textContent = args.join('');
    //let txt = input.textContent.trim();
    //input.textContent = (txt.slice(0,1) === '-' ? txt.slice(1) : '-' + txt) ;
});*/

