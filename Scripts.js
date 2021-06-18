// DEFINING VARIABLES

// Display value which is shown on the calculator screen, initalized as 0.
let screenDisplay = '0';

// First value input from the user, initalized as null;
let firstValue = null;

// Operator input from the user, initalized as null, occurs after a value is entered
let operator = null;

//Checks whether the firstValue and operators have been entered and returns a boolean, initalized as false
let expectingSecondValue = false;





// GETTING ELEMENTS, DIFFERENT BUTTON CLASSES

// Gets array of buttons with the class of number (these are numbers 0 through 9)
const calculatorNumber = document.getElementsByClassName("number");

// Gets array of buttons with the class of operation (these are +, -, x and /)
const calculatorOperator = document.getElementsByClassName("operation");

// Gets button with the ID of equals (this is the = button)
const calculatorEquals = document.getElementsByClassName("equals");

// Get button with the ID of clear (this is the clear button)
const calculatorClear = document.getElementsByClassName("clear");

// Get button with the ID of decimal (this is the . button)
const calculatorDecimal = document.getElementsByClassName("decimal")


//FUNCTIONS


// Get the calculator display class and set the value of the display to the displayValue variable 

function updateDisplay(){
    const display = document.querySelector(".calculator__display");
    display.value = parseFloat(screenDisplay);
}

//If the value being entered the second value (after a firstValue and operator have been entered), overwrite the display to the clicked number and set the second value back to false

//If the value is '0' (when we first start up or clear the calculator), we will overwrite the '0' with the clicked number. If the displayValue variable is NOT 0, we will append the number to it.

//This fires when a number is clicked

function inputNumber(number){

  if(expectingSecondValue === true){
    screenDisplay = number;
    expectingSecondValue = false;
  } else {
    screenDisplay === '0' ? screenDisplay = number : screenDisplay = screenDisplay + number
  }
}

//If our current display value doesn't have a decimal, add one to the current display. If it does, don't do anything. 

//This fires when the decimal point is clicked

function inputDecimal(decimal){
    !screenDisplay.includes(decimal) ? screenDisplay = screenDisplay + decimal : screenDisplay = screenDisplay;
}

//This function runs when any operator is clicked.

//First, we convert our displayValue to a floating point number and store it in a new variable.

//If the first input from the user is currently null and inputValue IS a number, set the current number as our first input value.
//Then the function will change isSecondValue to true and SET the operator as the operator that was clicked on (+, -, *, % or =)

//When a second input has been entered and another operator has been clicked (it can be any, not just the equals), the statement will reach the second condition. From here, it will perform a calculation based on the first value, the current display value (known as CurrentDisplay) and the operator. This is stored in a variable called result.

//After calculation, the displayValue is changed to the result. The result is also stored as the new first value by, in case we need to perform further operations.

function operatorCheck (chosenOperator){

let currentDisplay = parseFloat(screenDisplay);

  if (expectingSecondValue === true){
    operator = chosenOperator
    console.log(operator);
    return;
  }

  if(firstValue === null) {
    firstValue = currentDisplay;
  } 
  
  else if (operator) {
    const result = calculateOperation(firstValue, currentDisplay, operator);
    screenDisplay = result;
    firstValue = result;
  }
  
  operator = chosenOperator;
  expectingSecondValue = true;
}

//This function calculates the operations based on which operator was clicked. These can be addition, subtraction, multiplication or division. If we click equals, we assume an 

function calculateOperation (firstNumber, secondNumber, operator){
  if (operator === '+'){
    return firstNumber + secondNumber;
  } else if (operator === '-'){
    return firstNumber - secondNumber;
  } else if (operator ==='*') {
    return firstNumber * secondNumber;
  } else if (operator === '/') {
    return firstNumber / secondNumber;
  }
   return secondNumber;
}

function resetCalculator() {
//Reset all variables being stored back to their original values

screenDisplay = '0';
firstValue = null;
operator = null;
expectingSecondValue = false;

}



const keys = document.querySelector('.calculator__buttons');

keys.addEventListener('click', (event) => {
    const { target } = event;
    
    if (!target.matches("button")){
        return;
      }

    if (target.classList.contains('operation')) {
        console.log('operation', target.value);
        operatorCheck(target.value);
        updateDisplay();
        console.log(expectingSecondValue);
        return;
      }   
      else if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        inputDecimal(target.value);
        updateDisplay();
        return;
      }    
      else if (target.classList.contains('clear')) {
        console.log('clear', target.value);
        resetCalculator()
        updateDisplay();
        return;
      } 
      else if (target.classList.contains('equals')) {
        console.log('equals', target.value);
        operatorCheck(target.value);
        updateDisplay();
        return;
      } else
        console.log('number', target.value);
        inputNumber(target.value);
        updateDisplay();
    });
updateDisplay();
