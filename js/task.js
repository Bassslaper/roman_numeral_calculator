'use strict';

// jQuery(document).ready(function() {
//   $('.btn-order').click(() => {
//     $('h1').toggleClass('active');
//   });

// });

const input = document.querySelector('input'),
      output = document.querySelector('output'),
  btnCaclc = document.querySelector('.btn-order');

/* Калькулятор */

function calculator(string) {

  string = string.toUpperCase();

  const reg = /[\+\*\/-]/gi,
    operator = string.match(reg);
    
  if(string === '') {
    return 'Введите значения';

  } else {
    let convertArr = convertToNumbers(string, operator),
        result = calcResult(convertArr, operator);

    return result;
  } 
} 



const convertToNumbers = (str, operator) => {

  let arr = str.trim().split(operator);

  let numArr = arr.map((item, index) => {
    item = convertToArabic(item);
    return checkRangeOfArabicNumbers(item, index);
  });

  return numArr;
};


function convertToArabic(roman) {

  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const digits = Object.keys(values);
  const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  roman = roman.toUpperCase();

  let res = 0;
  
  if(roman.match(/^[0-9]+$/)) { 
    res = +roman;  
    return res;   

  } else if (roman.length > 4 || !romanNumbers.find(item => item === roman)) {
    throw new Error('Ошибка. Римские числа должны быть корректными');

  } else {

    for (let i = 0; i < roman.length; i++) {
      if (digits.indexOf(roman[i]) < digits.indexOf(roman[i + 1])) {
        res -= values[roman[i]];
      } else {
        res += values[roman[i]];
      }
    }

    return res;
  }
  
}

/* Проверка диапазона арабских числ */
const checkRangeOfArabicNumbers = (item, index) => {

  if (item > 0 && item < 11) {  
    return item;
  } else {

    console.log(`Число с порядковым номером ${index + 1}`, 'должно быть от 1 до 10');
    throw new Error('Ошибка. Числа должны быть в диапазоне от 1 до 10');
  }
};



const calcResult = (elem, operator) => {

    let result = 0;  
    switch(operator.join()) {
      
      case '+':
        result = Math.round(elem[0] + elem[1]);
        break;

      case '-':
        result = Math.round(elem[0] - elem[1]);   
        break;
      case '/':

        result = Math.round(elem[0] / elem[1]);   
        break;
      case '*':
        result = Math.round(elem[0] * elem[1]);   
        break;
      default:
        throw new Error('Такой операции не существует');
    }

    return result;
  
};


btnCaclc.addEventListener('click', () => {

   output.textContent = `Ответ: ${calculator(input.value)}`;
   input.value = '';
  input.removeEventListener('input', () => {
    output.textContent = '';
  });
});

input.addEventListener('input', () => {
  output.textContent = '';
});




